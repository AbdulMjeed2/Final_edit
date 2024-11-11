"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nextjs_1 = require("@clerk/nextjs");
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const use_confetti_store_1 = require("@/hooks/use-confetti-store");
const banner_1 = require("@/components/banner");
const button_1 = require("@/components/ui/button");
const ExamIdPage = ({ params, }) => {
    const { userId } = (0, nextjs_1.useAuth)();
    const confetti = (0, use_confetti_store_1.useConfettiStore)();
    const [exam, setExam] = (0, react_1.useState)();
    const [course, setCourse] = (0, react_1.useState)();
    const [certificateId, setCertificateId] = (0, react_1.useState)("");
    const [progressCount, setProgressCount] = (0, react_1.useState)();
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [hasSubmitted, sethasSubmitted] = (0, react_1.useState)(false);
    const [canSubmit, setCanSubmit] = (0, react_1.useState)(false);
    const [timeRemaining, setTimeRemaining] = (0, react_1.useState)(0);
    const [failedInExam, setFailedInExam] = (0, react_1.useState)(false);
    const [isFirstExam, setFirstExam] = (0, react_1.useState)(false);
    const [userSelections, setUserSelections] = (0, react_1.useState)({});
    const TIME_PER_QUESTION_MS = 5 * 60 * 1000;
    const router = (0, navigation_1.useRouter)();
    const [answeredQuestions, setAnswersQuestions] = (0, react_1.useState)(0);
    const [correctAnswers, setCorrectAnswers] = (0, react_1.useState)(0);
    const [wrongAnswers, setWrongAnswers] = (0, react_1.useState)(0);
    const [disableSelect, setDisableSelect] = (0, react_1.useState)(false);
    const [scorePercentage, setScorePercentage] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        function get() {
            return __awaiter(this, void 0, void 0, function* () {
                const { data } = yield axios_1.default.get(`/api/courses/${params.courseId}/exam/${params.examId}/progress`);
                if (data) {
                    setUserSelections(JSON.parse(data.options));
                    setDisableSelect(true);
                }
            });
        }
        get();
    }, []);
    const hasTakenTheExamBefore = exam && exam.userId !== "nil" && exam.beforeScore;
    const hasUserSelections = Object.keys(userSelections).length > 0;
    const isPostTest = exam && exam.type === "post-test";
    const handleOptionChange = (questionId, optionPosition) => {
        setUserSelections((prevSelections) => (Object.assign(Object.assign({}, prevSelections), { [questionId]: optionPosition })));
    };
    const handleRepeat = () => {
        if (isPostTest) {
            setUserSelections({});
            sethasSubmitted(false);
            setFailedInExam(false);
            setCanSubmit(false);
        }
        else {
            react_hot_toast_1.default.error("You cannot retake the pre-test.");
        }
    };
    const handleSubmit = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!exam || !hasUserSelections || hasSubmitted)
            return;
        setIsSubmitting(true);
        try {
            const fieldToUpdate = hasTakenTheExamBefore
                ? "afterScore"
                : "beforeScore";
            sethasSubmitted(true);
            if (isFirstExam) {
                react_hot_toast_1.default.success("يمكنك الان البدء في الدورة التدريبية");
            }
            const response = yield axios_1.default.patch(`/api/courses/${params.courseId}/exam/${params.examId}/progress`, {
                percentage: scorePercentage,
                userId: userId,
                userSelections,
            });
            if (!isFirstExam) {
                if (scorePercentage < 50) {
                    setFailedInExam(true);
                    react_hot_toast_1.default.error(`لقد احرزت علامة ${scorePercentage.toFixed(1)}% يمكنك اعادة الاختبار بعد مراجعة الدورة التدريبية مرة أخرى`);
                }
                else {
                    react_hot_toast_1.default.success(`احسنت لقد احرزت علامة ${scorePercentage.toFixed(1)}% `);
                    const certificateResponse = yield axios_1.default.post(`/api/courses/${params.courseId}/exam/${params.examId}/certificate`);
                    router.refresh();
                    if (certificateResponse.status === 200) {
                        react_hot_toast_1.default.success("شهادتك جاهزة!");
                        setCertificateId(certificateResponse.data.id);
                        confetti.onOpen();
                    }
                    else {
                        react_hot_toast_1.default.error("هناك شئ غير صحيح، حاول مجددًا!");
                    }
                }
            }
            if (response && isFirstExam) {
                router.refresh();
            }
        }
        catch (error) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح، حاول مجددًا!");
        }
        finally {
            setIsSubmitting(false);
        }
    }), [
        confetti,
        exam,
        hasUserSelections,
        hasSubmitted,
        hasTakenTheExamBefore,
        params.courseId,
        scorePercentage,
        userId,
    ]);
    (0, react_1.useEffect)(() => {
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
            return router.push(`/courses/${course === null || course === void 0 ? void 0 : course.id}`);
        }, 1000);
    };
    (0, react_1.useEffect)(() => {
        const timerId = setInterval(countdown, 1000);
        return () => clearInterval(timerId);
    }, []);
    (0, react_1.useEffect)(() => {
        if (hasSubmitted)
            return;
        const totalQuestions = exam === null || exam === void 0 ? void 0 : exam.questions.length;
        let correct = 0;
        let answered = 0;
        let wrong = 0;
        if (!totalQuestions)
            return;
        exam === null || exam === void 0 ? void 0 : exam.questions.forEach((question) => {
            const questionId = question.id;
            const userSelectedPosition = userSelections[questionId];
            const correctAnswerPosition = parseInt(question.answer);
            if (userSelectedPosition !== undefined) {
                answered++;
                if (userSelectedPosition === correctAnswerPosition) {
                    correct++;
                }
                else {
                    wrong++;
                }
            }
        });
        setAnswersQuestions(answered);
        setCorrectAnswers(correct);
        setWrongAnswers(wrong);
        setScorePercentage((correct / totalQuestions) * 100);
    }, [exam === null || exam === void 0 ? void 0 : exam.questions, userSelections, hasSubmitted]);
    (0, react_1.useEffect)(() => {
        if (answeredQuestions === (exam === null || exam === void 0 ? void 0 : exam.questions.length)) {
            setCanSubmit(true);
        }
    }, [answeredQuestions, exam === null || exam === void 0 ? void 0 : exam.questions.length]);
    (0, react_1.useEffect)(() => {
        if (exam === null || exam === void 0 ? void 0 : exam.starterExam) {
            setFirstExam(true);
        }
        else {
            setFirstExam(false);
        }
    }, [exam]);
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`/api/courses/${params.courseId}`);
                setExam(response.data.exams.filter((e) => e.id == params.examId)[0]);
                setCourse(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }))();
    }, []);
    return (<div>
      <div className="container py-5">
        <div className="w-full space-y-4">
          <h2 className="text-2xl font-bold text-center">الاختبار</h2>

          {exam && (<div className="w-full">
              <h3 className="text-lg font-semibold">{exam.title}</h3>
              <div className="space-y-4">
                {exam.questions.map((question) => {
                return (<div key={question.id} className="space-y-2">
                      <div className="font-medium text-md">{question.title}</div>
                      <div className="space-y-2">
                        {question.options.map((option, idx) => (<div key={option.id}>
                            <button className={(0, utils_1.cn)("w-full px-4 py-2 text-white rounded-lg", disableSelect
                            ? "bg-gray-400 cursor-not-allowed"
                            : userSelections[question.id] === idx
                                ? "bg-blue-500"
                                : "bg-gray-800")} disabled={disableSelect} onClick={() => handleOptionChange(question.id, idx)}>
                              {option.title}
                            </button>
                          </div>))}
                      </div>
                    </div>);
            })}
              </div>
            </div>)}

          {hasSubmitted && failedInExam && (<div>
              <button_1.Button onClick={handleRepeat}>اعادة الاختبار</button_1.Button>
            </div>)}

          <div className="flex justify-between mt-4">
            <div>
              <h4 className="text-sm font-semibold">الوقت المتبقي:</h4>
              <div>{Math.floor(timeRemaining / 60000)} دقيقة</div>
            </div>

            <div>
              {canSubmit && !hasSubmitted && (<button_1.Button onClick={handleSubmit} disabled={isSubmitting}>
                  إرسال
                </button_1.Button>)}
            </div>
          </div>

          <banner_1.Banner visible={certificateId} message="شهادتك جاهزة" onClose={() => setCertificateId("")}/>
        </div>
      </div>
    </div>);
};
exports.default = ExamIdPage;
