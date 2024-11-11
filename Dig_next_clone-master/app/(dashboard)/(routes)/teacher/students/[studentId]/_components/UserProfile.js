"use strict";
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
const get_courses_1 = require("@/actions/get-courses");
const db_1 = require("@/lib/db");
const server_1 = require("@clerk/nextjs/server");
const react_1 = __importDefault(require("react"));
const userStats_1 = __importDefault(require("./userStats"));
const UserProfile = (_a) => __awaiter(void 0, [_a], void 0, function* ({ params }) {
    const userInfo = yield server_1.clerkClient.users.getUser(params === null || params === void 0 ? void 0 : params.studentId);
    const courserWithProgress = yield (0, get_courses_1.getCourses)({
        userId: params === null || params === void 0 ? void 0 : params.studentId,
    });
    const userMessages = yield db_1.db.message.findMany({
        where: {
            userId: params === null || params === void 0 ? void 0 : params.studentId,
        },
    });
    const userMessagesSorted = userMessages.sort((a, b) => b.createdAt - a.createdAt);
    const lastMessage = userMessagesSorted.length > 0 ? userMessagesSorted[0] : null;
    return (<div>
      <div className="flex w-full justify-center">
        <div className="">
          <div className="bg-white shadow-2xl rounded-lg py-3 px-3">
            <div className="photo-wrapper p-2">
              <img className="w-32 h-32 rounded-full mx-auto" src={userInfo.imageUrl} alt="John Doe"/>
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{`${userInfo.firstName} ${userInfo.lastName ? userInfo.lastName : ""}`}</h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>
                  اخر تسجيل دخول:
                  {`${new Date(userInfo.updatedAt).getDate()}/${new Date(userInfo.updatedAt).getMonth() + 1}/${new Date(userInfo.updatedAt).getFullYear()}`}
                </p>
                <p>
                  اخر رسالة :
                  {lastMessage
            ? `${new Date(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.updatedAt).getHours()}:${new Date(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.updatedAt).getMinutes()}:${new Date(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.updatedAt).getSeconds()}` +
                ` - ` +
                `${new Date(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.updatedAt).getDate()}/${new Date(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.updatedAt).getMonth() + 1}/${new Date(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.updatedAt).getFullYear()}`
            : `لم يرسل اي رسالة`}
                </p>
              </div>
              <table className="text-xs my-3" dir="rtl">
                <tbody>
                  <tr className="text-base">
                    <td className="px-2 py-2 text-gray-600  font-semibold">
                      الإيميل
                    </td>
                    <td className="px-2 py-2 text-gray-800">
                      {userInfo.emailAddresses[0].emailAddress}
                    </td>
                  </tr>
                  <tr className="text-base">
                    <td className="px-2 py-2 text-gray-600 font-semibold">
                      اسم الكورس
                    </td>
                    <td className="px-2 py-2 text-gray-600  font-semibold">
                      التقدم
                    </td>
                    <td className="px-2 py-2 text-gray-600  font-semibold">
                      الاختبار القبلي
                    </td>
                    <td className="px-2 py-2 text-gray-600  font-semibold">
                      الاختبار البعدي
                    </td>
                    <td className="px-2 py-2 text-gray-600  font-semibold">
                      الدروس المكتملة
                    </td>
                    <td className="px-2 py-2 text-gray-600  font-semibold">
                      الانشطة المكتملة
                    </td>
                    <td className="px-2 py-2 text-gray-600  font-semibold">
                      {" "}
                      الوقت المستغرق
                    </td>
                    <td className="px-2 py-2 text-gray-600  font-semibold">
                      {" "}
                      المهام
                    </td>
                  </tr>
                  {courserWithProgress.map((course, index) => __awaiter(void 0, void 0, void 0, function* () {
            let time = 0;
            let timeString = ``;
            let lessonsCompleted = 0;
            let quizsCompleted = 0;
            let chapters = yield db_1.db.chapter.findMany({
                where: {
                    courseId: course.id,
                },
            });
            for (let i = 0; i < chapters.length; i++) {
                const chapter = chapters[i];
                const lessons = yield db_1.db.lesson.findMany({
                    where: {
                        chapterId: chapter.id,
                    },
                });
                const quizs = yield db_1.db.quiz.findMany({
                    where: {
                        chapterId: chapter.id,
                    },
                });
                for (let j = 0; j < lessons.length; j++) {
                    const lesson = lessons[j];
                    const isLessonCompleted = yield db_1.db.userProgress.findFirst({
                        where: {
                            lessonId: lesson.id,
                            userId: params.studentId,
                        },
                    });
                    let lessonTime = Math.floor(((Date.parse(`${isLessonCompleted === null || isLessonCompleted === void 0 ? void 0 : isLessonCompleted.updatedAt}`) -
                        (isLessonCompleted === null || isLessonCompleted === void 0 ? void 0 : isLessonCompleted.startedAt)) /
                        1000) %
                        60);
                    time =
                        (time ? time : 0) + (lessonTime ? lessonTime : 0);
                    if (isLessonCompleted === null || isLessonCompleted === void 0 ? void 0 : isLessonCompleted.isCompleted) {
                        lessonsCompleted = lessonsCompleted + 1;
                    }
                }
                for (let k = 0; k < quizs.length; k++) {
                    const quiz = quizs[k];
                    const isQuizCompleted = yield db_1.db.userQuizPoints.findFirst({
                        where: {
                            quizId: quiz.id,
                            userId: params.studentId,
                        },
                    });
                    if (isQuizCompleted) {
                        quizsCompleted = quizsCompleted + 1;
                    }
                }
            }
            console.log("time" + time);
            const hours = Math.floor(time / 3600);
            time = time - hours * 3600;
            const minutes = Math.floor(time / 60);
            const seconds = time - minutes * 60;
            let timeH = (time / (1000 * 60 * 60)) % 24 > 1
                ? `ساعة${Math.round(time / 3600)}`
                : "";
            let timeM = minutes >= 1
                ? ` ${Math.round(time / 60)}  دقيقة  `
                : "";
            let timeS = seconds ? `${seconds} ثانية  ` : "";
            timeString = timeH + " " + timeM + " " + timeS;
            const exams = course === null || course === void 0 ? void 0 : course.exams;
            const startCourse = exams.find((e) => {
                return e.starterExam;
            });
            const finalCourse = exams.find((e) => {
                return !e.starterExam;
            });
            const firstExamsPrgress = startCourse
                ? yield db_1.db.userProgress.findFirst({
                    where: {
                        lessonId: startCourse === null || startCourse === void 0 ? void 0 : startCourse.id,
                        userId: params.studentId,
                    },
                })
                : null;
            const finalExamsPrgress = finalCourse
                ? yield db_1.db.userProgress.findFirst({
                    where: {
                        lessonId: finalCourse === null || finalCourse === void 0 ? void 0 : finalCourse.id,
                        userId: params.studentId,
                    },
                })
                : null;
            if (course.id !=
                process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID) {
                return (<userStats_1.default studentId={params.studentId} course={course} key={index} quizsCompleted={quizsCompleted} lessonsCompleted={lessonsCompleted} timeString={timeString} firstExamsPrgress={firstExamsPrgress === null || firstExamsPrgress === void 0 ? void 0 : firstExamsPrgress.percentage} finalExamsPrgress={finalExamsPrgress === null || finalExamsPrgress === void 0 ? void 0 : finalExamsPrgress.percentage}/>);
            }
        }))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>);
});
exports.default = UserProfile;
