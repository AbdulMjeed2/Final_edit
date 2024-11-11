"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

import { Preview } from "@/components/preview";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { Prisma, Certificate, Course } from "@prisma/client";
import axios from "axios";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { getProgress } from "@/actions/get-progress";
import { Banner } from "@/components/banner";
import { PrepareCertificateModal } from "@/components/modals/exam-certificate-modal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { escape } from "querystring";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

type ExamWithQuestionsAndOptions = Prisma.ExamGetPayload<{
  include: {
    certificate: true;
    questions: {
      where: {
        isPublished: true;
      };
      include: {
        options: true;
      };
    };
  };
}>;

const ExamIdPage = ({
  params,
}: {
  params: { courseId: string; examId: string };
}) => {
  const { userId } = useAuth();

  const confetti = useConfettiStore();

  const [exam, setExam] = useState<ExamWithQuestionsAndOptions | null>();
  const [course, setCourse] = useState<Course | null>();
  const [certificateId, setCertificateId] = useState("");
  const [progressCount, setProgressCount] = useState<number>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, sethasSubmitted] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [failedInExam, setFailedInExam] = useState<boolean>(false);
  const [isFirstExam, setFirstExam] = useState<boolean>(false);
  const [userSelections, setUserSelections] = useState<{
    [key: string]: number;
  }>({});
  const TIME_PER_QUESTION_MS = 5 * 60 * 1000;
  const router = useRouter();
  const [answeredQuestions, setAnswersQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [disableSelect, setDisableSelect] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);

  useEffect(() => {
    async function get() {
      const { data } = await axios.get(
        `/api/courses/${params.courseId}/exam/${params.examId}/progress`
      );
      if (data) {
        setUserSelections(JSON.parse(data.options));
        setDisableSelect(true);
      }
    }
    get();
  }, []);

  const hasTakenTheExamBefore =
    exam && exam.userId !== "nil" && exam.beforeScore;

  const hasUserSelections = Object.keys(userSelections).length > 0;

  const isPostTest = exam && exam.type === "post-test";

  const handleOptionChange = (questionId: string, optionPosition: number) => {
    setUserSelections((prevSelections) => ({
      ...prevSelections,
      [questionId]: optionPosition,
    }));
  };

  const handleRepeat = () => {
    if (isPostTest) {
      setUserSelections({});
      sethasSubmitted(false);
      setFailedInExam(false);
      setCanSubmit(false);
    } else {
      toast.error("You cannot retake the pre-test.");
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!exam || !hasUserSelections || hasSubmitted) return;

    setIsSubmitting(true);

    try {
      const fieldToUpdate = hasTakenTheExamBefore
        ? "afterScore"
        : "beforeScore";

      sethasSubmitted(true);

      if (isFirstExam) {
        toast.success("يمكنك الان البدء في الدورة التدريبية");
      }

      const response = await axios.patch(
        `/api/courses/${params.courseId}/exam/${params.examId}/progress`,
        {
          percentage: scorePercentage,
          userId: userId,
          userSelections,
        }
      );

      if (!isFirstExam) {
        if (scorePercentage < 50) {
          setFailedInExam(true);
          toast.error(
            `لقد احرزت علامة ${scorePercentage.toFixed(
              1
            )}% يمكنك اعادة الاختبار بعد مراجعة الدورة التدريبية مرة أخرى`
          );
        } else {
          toast.success(
            `احسنت لقد احرزت علامة ${scorePercentage.toFixed(1)}% `
          );
          const certificateResponse = await axios.post(
            `/api/courses/${params.courseId}/exam/${params.examId}/certificate`
          );
          router.refresh();

          if (certificateResponse.status === 200) {
            toast.success("شهادتك جاهزة!");
            setCertificateId(certificateResponse.data.id);
            confetti.onOpen();
          } else {
            toast.error("هناك شئ غير صحيح، حاول مجددًا!");
          }
        }
      }

      if (response && isFirstExam) {
        router.refresh();
      }
    } catch (error) {
      toast.error("هناك شئ غير صحيح، حاول مجددًا!");
    } finally {
      setIsSubmitting(false);
    }
  }, [
    confetti,
    exam,
    hasUserSelections,
    hasSubmitted,
    hasTakenTheExamBefore,
    params.courseId,
    scorePercentage,
    userId,
  ]);

  useEffect(() => {
    if (exam) {
      const totalTime = exam.questions.length * TIME_PER_QUESTION_MS;
      setTimeRemaining(totalTime);
    }
  }, [TIME_PER_QUESTION_MS, exam]);

  const countdown = () => {
    setTimeRemaining((prevTime) => {
      const newTime = Math.max(0, prevTime - 1000);
      return newTime;
    });
  };

  const handleNext = () => {
    router.refresh();
    setTimeout(() => {
      return router.push(`/courses/${course?.id}`);
    }, 1000);
  };

  useEffect(() => {
    const timerId = setInterval(countdown, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (hasSubmitted) return;

    const totalQuestions = exam?.questions.length;
    let correct = 0;
    let answered = 0;
    let wrong = 0;

    if (!totalQuestions) return;

    exam?.questions.forEach((question) => {
      const questionId = question.id;
      const userSelectedPosition = userSelections[questionId];
      const correctAnswerPosition = parseInt(question.answer);

      if (userSelectedPosition !== undefined) {
        answered++;
        if (userSelectedPosition === correctAnswerPosition) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    setAnswersQuestions(answered);
    setCorrectAnswers(correct);
    setWrongAnswers(wrong);
    setScorePercentage((correct / totalQuestions) * 100);
  }, [exam?.questions, userSelections, hasSubmitted]);

  useEffect(() => {
    if (answeredQuestions === exam?.questions.length) {
      setCanSubmit(true);
    }
  }, [answeredQuestions, exam?.questions.length]);

  useEffect(() => {
    if (exam?.starterExam) {
      setFirstExam(true);
    } else {
      setFirstExam(false);
    }
  }, [exam]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/courses/${params.courseId}`);
        setExam(
          response.data.exams.filter((e: any) => e.id == params.examId)[0]
        );

        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="container py-5">
        <div className="w-full space-y-4">
          <h2 className="text-2xl font-bold text-center">الاختبار</h2>

          {exam && (
            <div className="w-full">
              <h3 className="text-lg font-semibold">{exam.title}</h3>
              <div className="space-y-4">
              {exam.questions.map((question) => {
  return (
    <div key={question.id} className="space-y-2">
      <div className="font-medium text-md">{question.title}</div>
      <div className="space-y-2">
        {/* Render options in the order they were stored */}
        {question.options.map((option, idx) => {
                  // Determine if the selected answer is correct or wrong
                  const isSelected = userSelections[question.id] === idx;
                  const isCorrect = parseInt(question.answer) === idx;
                  const isWrong = isSelected && !isCorrect;

                  return (
                    <div key={option.id}>
                      <button
                        className={cn(
                          "w-full px-4 py-2 text-white rounded-lg",
                          disableSelect
                            ? "bg-gray-400 cursor-not-allowed"
                            : isSelected
                            ? isCorrect
                              ? "bg-green-500" // Correct answer
                              : "bg-red-500" // Incorrect answer
                            : "bg-gray-800"
                        )}
                        disabled={disableSelect}
                        onClick={() => handleOptionChange(question.id, idx)}
                      >
                        {option.title}
                      </button>

                      {/* Show explanation if the answer is wrong */}
                      {isWrong && (
                        <div className="mt-2 text-red-400 text-sm">
                          {option.explanation || "الجواب غير صحيح."}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

              </div>
            </div>
          )}

          {hasSubmitted && failedInExam && (
            <div>
              <Button onClick={handleRepeat}>اعادة الاختبار</Button>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <div>
              <h4 className="text-sm font-semibold">الوقت المتبقي:</h4>
              <div>{Math.floor(timeRemaining / 60000)} دقيقة</div>
            </div>

            <div>
              {canSubmit && !hasSubmitted && (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  إرسال
                </Button>
              )}
            </div>
          </div>

          <Banner
            visible={certificateId}
            message="شهادتك جاهزة"
            onClose={() => setCertificateId("")}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamIdPage;
