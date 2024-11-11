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
const carousel_1 = require("@/components/ui/carousel");
const utils_1 = require("@/lib/utils");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const use_confetti_store_1 = require("@/hooks/use-confetti-store");
const banner_1 = require("@/components/banner");
const link_1 = __importDefault(require("next/link"));
const FroalaEditorView_1 = __importDefault(require("react-froala-wysiwyg/FroalaEditorView"));
const lucide_react_1 = require("lucide-react");
const ExamIdPage = ({ params, }) => {
    const { userId } = (0, nextjs_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    const confetti = (0, use_confetti_store_1.useConfettiStore)();
    const [course, setCourse] = (0, react_1.useState)();
    const [quiz, setQuiz] = (0, react_1.useState)();
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [hasSubmitted, sethasSubmitted] = (0, react_1.useState)(false);
    const [canSubmit, setCanSubmit] = (0, react_1.useState)(false);
    const [timeRemaining, setTimeRemaining] = (0, react_1.useState)(0);
    // State to store the user's selected options
    const [userSelections, setUserSelections] = (0, react_1.useState)({});
    // Calculate the time per question (5 minutes)
    const TIME_PER_QUESTION_MS = 5 * 60 * 1000;
    const [answeredQuestions, setAnsweredQuestions] = (0, react_1.useState)(0);
    const [correctAnswers, setCorrectAnswers] = (0, react_1.useState)(0);
    const [wrongAnswers, setWrongAnswers] = (0, react_1.useState)(0);
    const [disableSelect, setDisableSelect] = (0, react_1.useState)(false);
    const [points, setPoints] = (0, react_1.useState)(0);
    const [wrongAnswersQuiz, setWrongAnswersQuiz] = (0, react_1.useState)([]);
    const hasTakenQuiz = quiz && quiz.userId !== "nil";
    // Check if userSelections has any members
    const hasUserSelections = Object.keys(userSelections).length > 0;
    (0, react_1.useEffect)(() => {
        function get() {
            return __awaiter(this, void 0, void 0, function* () {
                const { data } = yield axios_1.default.get(`/api/courses/${params.courseId}/chapters/${params.chapterId}/quiz/${params.quizId}/progress`);
                if (data) {
                    setUserSelections(JSON.parse(data.options));
                    setDisableSelect(true);
                }
            });
        }
        get();
    }, []);
    const handleOptionChange = (questionId, optionPosition) => {
        sethasSubmitted(false);
        setUserSelections((prevSelections) => (Object.assign(Object.assign({}, prevSelections), { [questionId]: optionPosition })));
    };
    const handleSubmit = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!quiz || !hasUserSelections)
            return;
        setDisableSelect(true);
        setIsSubmitting(true);
        sethasSubmitted(true);
        try {
            const response = yield axios_1.default.patch(`/api/courses/${params.courseId}/chapters/${params.chapterId}/quiz/${quiz.id}`, {
                userId: userId,
            });
            if (points != undefined) {
                const quizResponse = yield axios_1.default.put(`/api/courses/${params.courseId}/chapters/${params.chapterId}/quiz/${quiz.id}/progress`, {
                    points,
                    userSelections,
                });
                sethasSubmitted(true);
                if (points > 50) {
                    react_hot_toast_1.default.success(`احسنت لقد حصلت على ${points.toFixed(1)}`, {
                        duration: 4000,
                    });
                }
                else {
                    react_hot_toast_1.default.success(` لقد حصلت على ${points.toFixed(1)}`, {
                        duration: 4000,
                    });
                }
            }
            else {
                react_hot_toast_1.default.success(`لقد حصلت على ${points}`, {
                    duration: 4000,
                });
            }
            router.refresh();
        }
        catch (error) {
            react_hot_toast_1.default.error("هناك خطأ ما");
        }
        finally {
            setIsSubmitting(false);
        }
    }), [
        confetti,
        hasUserSelections,
        params.chapterId,
        params.courseId,
        points,
        quiz,
        router,
        userId,
    ]);
    // Fetch the quiz data and update the time remaining
    (0, react_1.useEffect)(() => {
        if (quiz) {
            // Calculate the total time based on the number of questions
            const totalTime = quiz.questions.length * TIME_PER_QUESTION_MS;
        }
    }, [TIME_PER_QUESTION_MS, quiz]);
    // Function to decrement the time remaining every second
    (0, react_1.useEffect)(() => {
        if (hasTakenQuiz && hasSubmitted) {
            sethasSubmitted(true);
        }
    }, [hasSubmitted, hasTakenQuiz]);
    (0, react_1.useEffect)(() => {
        if (hasSubmitted)
            return;
        const totalQuestions = quiz === null || quiz === void 0 ? void 0 : quiz.questions.length;
        let correct = 0;
        let answered = 0;
        let wrong = 0;
        if (!totalQuestions)
            return;
        const wrongAnswersQuizTemp = [];
        quiz === null || quiz === void 0 ? void 0 : quiz.questions.forEach((question) => {
            const questionId = question.id;
            const userSelectedPosition = userSelections[question.id];
            const correctAnswerPosition = parseInt(question.answer) - 1;
            if (userSelectedPosition !== undefined) {
                answered++;
                if (userSelectedPosition === correctAnswerPosition) {
                    correct++;
                }
                else {
                    wrong++;
                    wrongAnswersQuizTemp.push(questionId);
                }
            }
        });
        setWrongAnswersQuiz(wrongAnswersQuizTemp);
        setAnsweredQuestions(answered);
        setCorrectAnswers(correct);
        setWrongAnswers(wrong);
        setPoints((correct / totalQuestions) * 100);
        // Enable submission when all questions are answered
        setCanSubmit(answered === totalQuestions);
    }, [userSelections, hasSubmitted, quiz === null || quiz === void 0 ? void 0 : quiz.questions]);
    (0, react_1.useEffect)(() => {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const [chapterResponse, courseResponse] = yield Promise.all([
                        axios_1.default.get(`/api/courses/${params.courseId}/chapters/${params.chapterId}`),
                        axios_1.default.get(`/api/courses/${params.courseId}`),
                    ]);
                    setQuiz(chapterResponse.data.quiz);
                    setCourse(courseResponse.data);
                }
                catch (error) {
                    react_hot_toast_1.default.error("هناك شئ غير صحيح");
                }
            });
        }
        fetchData();
    }, [params.chapterId, params.courseId, userId]);
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    return (<>
      {quiz ? (<div>
          {hasSubmitted ? (<banner_1.Banner variant={"success"} label={`:الأسئلة التي تمت الإجابة عليها ${answeredQuestions}    |    الإجابات الصحيحة: ${correctAnswers}    |    إجابات خاطئة: ${wrongAnswers} `}/>) : (<div className="w-full flex flex-col justify-center items-end h-12 pt-12 px-6">
              <div className="flex space-x-4 items-center mb-2" dir="rtl">
                <h1 className="text-lg md:text-2xl font-medium capitalize">
                  {course === null || course === void 0 ? void 0 : course.title}
                </h1>
                <span className="mx-4">|</span>

                <h1 className="text-lg md:text-2xl font-medium capitalize">
                  {quiz === null || quiz === void 0 ? void 0 : quiz.title}
                </h1>
                <span className="mx-4">|</span>
                <h1 className="text-lg md:text-2xl font-medium capitalize">
                  مجموع الأسئلة {quiz === null || quiz === void 0 ? void 0 : quiz.questions.length}
                </h1>
              </div>
              <div className="flex space-x-3 ">
                {/* <div className="text-md">
                  {canSubmit} أسئلة تمت الإجابة عليها {answeredQuestions}
                </div> */}
              </div>
            </div>)}

          <div className="flex flex-col px-10 mt-10  items-center relative">
            {quiz === null || quiz === void 0 ? void 0 : quiz.questions.map((question, index) => (<carousel_1.CarouselItem key={index} className="w-full mb-4">
                <div className="bg-sky-100 border border-slate-200 rounded-lg p-4 max-w-full ">
                  <div className="w-full flex h-fit flex-col items-end">
                    <div className="font-medium text-slate-500 mb-4 text-right">
                      سؤال {index + 1}
                    </div>

                    <div className="text-slate-700 font-bold text-lg mb-2" dir="rtl">
                      <FroalaEditorView_1.default model={question.prompt}/>
                    </div>

                    <div className="flex flex-col items-end space-y-2 w-full mb-4 ">
                      {question.options.map((option, index) => (<div key={option.id}>
                          {hasSubmitted ? (<div className={`flex space-x-2 flex-row-reverse justify-between ${index + 1 == parseInt(question.answer) &&
                            "bg-[#0177a9] min-w-[500px] rounded-md"}`}>
                              <div className="flex gap-2">
                                <label className="capitalize text-sm">
                                  {option.text}
                                </label>
                                <input className="mr-2" type="radio" name={question.id} disabled={disableSelect} onChange={() => handleOptionChange(question.id, index)}/>
                              </div>
                              {index + 1 == parseInt(question.answer) && (<lucide_react_1.Check className="text-green-200"/>)}
                            </div>) : (<div className="flex space-x-2">
                              <label className="block capitalize text-sm">
                                {option.text}
                              </label>

                              <input className="mr-2" type="radio" disabled={disableSelect} name={question.id} value={index + 1} checked={userSelections[question.id] == index} onChange={() => handleOptionChange(question.id, index)}/>
                            </div>)}
                        </div>))}
                      {hasSubmitted &&
                    wrongAnswersQuiz.includes(question.id) && (<div className="mb-4" dir="rtl">
                            <p className="text-right">تفسير الاجابة</p>

                            {question.explanation ? (<FroalaEditorView_1.default config={{ direction: "rtl" }} model={question.explanation}/>) : ("لا يوجد تفسير")}
                          </div>)}
                    </div>
                  </div>
                </div>
              </carousel_1.CarouselItem>))}

            <div className="flex flex-col justify-end items-end w-full space-y-3 mr-8 md:mr-20">
              <div className="flex flex-row space-x-4 items-center">
                {hasSubmitted ? (<link_1.default href={`/courses/${params.courseId}`} className={(0, utils_1.cn)("bg-sky-600 mb-6 text-white w-fit font-bold text-sm px-4 py-2 rounded-md")}>
                    اكمال الدورة التدريبية
                  </link_1.default>) : !disableSelect ? (<button type="button" onClick={handleSubmit} className={(0, utils_1.cn)("bg-sky-700 mb-6 text-white w-fit font-bold text-sm px-4 py-2 rounded-md", (!canSubmit || isSubmitting || hasSubmitted) &&
                    "bg-slate-400 cursor-not-allowed pointer-events-none")}>
                    تقدم
                  </button>) : ("")}
                {disableSelect ? (<button type="button" onClick={(e) => setDisableSelect(false)} className={(0, utils_1.cn)("bg-sky-600 mb-6 text-white w-fit font-bold text-sm px-4 py-2 rounded-md")}>
                    إعادة النشاط
                  </button>) : ("")}
              </div>
            </div>
          </div>
        </div>) : (<div className="flex items-center justify-center h-full w-full">
          <div className="font-bold text-2xl text-slate-500 animate-pulse">
            ...جارٍ تحميل الأسئلة
          </div>
        </div>)}
    </>);
};
exports.default = ExamIdPage;
