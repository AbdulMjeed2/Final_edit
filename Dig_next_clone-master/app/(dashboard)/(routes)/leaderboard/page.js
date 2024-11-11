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
const react_1 = __importDefault(require("react"));
const server_1 = require("@clerk/nextjs/server");
const navigation_1 = require("next/navigation");
const db_1 = require("@/lib/db");
const data_table_1 = require("./_components/data-table");
const columns_1 = require("./_components/columns");
const rank_card_1 = __importDefault(require("./_components/rank-card"));
const dialogueBox_1 = require("../../_components/dialogueBox");
const Leaderboard = () => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = (0, server_1.auth)();
    if (!userId) {
        return (0, navigation_1.redirect)("/");
    }
    let pointsWithUserDetails = [];
    const usersQuizCounts = {};
    const points = yield db_1.db.userQuizPoints.findMany({
        orderBy: {
            points: "desc",
        },
    });
    let currentRank = 1;
    for (const point of points) {
        const userEntry = usersQuizCounts[point.userId];
        if (!userEntry) {
            // First time encountering this user
            try {
                const user = yield server_1.clerkClient.users.getUser(point.userId);
            }
            catch (err) {
                if (err) {
                    continue;
                }
            }
            const userStats = yield db_1.db.userStats.findUnique({ where: { id: point.userId } });
            const user = yield server_1.clerkClient.users.getUser(point.userId);
            const fullName = user.firstName && user.lastName // Check if both firstName and lastName are not null
                ? `${user.firstName} ${user.lastName}` // If both are present, concatenate them
                : user.emailAddresses[0].emailAddress; // If any is null,
            usersQuizCounts[point.userId] = {
                quizCount: 1,
                uniqueQuizzes: new Set([point.quizId]),
                totalPoints: point.points,
            };
            pointsWithUserDetails.push(Object.assign(Object.assign({}, point), { fullName, rank: currentRank, imageUrl: user.imageUrl, numberOfTakenQuizzes: 1, completedLessons: userStats === null || userStats === void 0 ? void 0 : userStats.lessonsCompleted, completedExams: userStats === null || userStats === void 0 ? void 0 : userStats.examsCompleted, completedQuizs: userStats === null || userStats === void 0 ? void 0 : userStats.quizsCompleted }));
        }
        else {
            // User already encountered, update quiz count and unique quizzes
            userEntry.quizCount++;
            userEntry.uniqueQuizzes.add(point.quizId);
            userEntry.totalPoints += point.points;
            // Find the corresponding entry in pointsWithUserDetails and update its values
            const existingEntryIndex = pointsWithUserDetails.findIndex((entry) => entry.userId === point.userId);
            if (existingEntryIndex !== -1) {
                pointsWithUserDetails[existingEntryIndex].points += point.points;
                pointsWithUserDetails[existingEntryIndex].numberOfTakenQuizzes =
                    userEntry.quizCount;
            }
        }
        currentRank++;
    }
    for (let i = 0; i < pointsWithUserDetails.length; i++) {
        const points = pointsWithUserDetails[i];
        points.points = points.points + (points.completedLessons * 20);
    }
    // Sort pointsWithUserDetails first by points, then by quiz count, and finally by creation timestamp
    pointsWithUserDetails.sort((a, b) => {
        if (a.points === b.points) {
            if (a.numberOfTakenQuizzes === b.numberOfTakenQuizzes) {
                // Use getTime() to get the numeric value representing the time for comparison
                return a.createdAt.getTime() - b.createdAt.getTime();
            }
            return b.numberOfTakenQuizzes - a.numberOfTakenQuizzes; // Sort by quiz count in descending order
        }
        return b.points - a.points; // Sort by points in descending order
    });
    // Assign final ranks based on the sorted order
    pointsWithUserDetails.forEach((user, index) => {
        // Check for ties and assign the same rank to users with the same points, quiz count, and creation timestamp
        if (index > 0 &&
            user.points === pointsWithUserDetails[index - 1].points &&
            user.numberOfTakenQuizzes ===
                pointsWithUserDetails[index - 1].numberOfTakenQuizzes &&
            user.createdAt.getTime() ===
                pointsWithUserDetails[index - 1].createdAt.getTime()) {
            user.rank = pointsWithUserDetails[index - 1].rank;
        }
        else {
            user.rank = index + 1;
        }
    });
    const firstThreePointsWithUserDetails = pointsWithUserDetails.slice(0, 3);
    const userPoints = pointsWithUserDetails.find((point) => point.userId === userId);
    return (<div>
      <dialogueBox_1.DialogBox page="leaderboardPage"/>
      <div dir="rtl">
        <div className="p-6 flex flex-col">
          <div>
            <h1 className="text-2xl font-medium text-right">المتصدرين</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
            {firstThreePointsWithUserDetails.map((pointWithUser) => (<div key={pointWithUser.id}>
                <rank_card_1.default fullName={pointWithUser.fullName} imageUrl={pointWithUser.imageUrl} points={pointWithUser.points} rank={pointWithUser.rank} lessonsCompleted={pointWithUser.completedLessons}/>
              </div>))}
          </div>
          <div className="rounded-md border bg-slate-100 w-fit px-3 py-2 mt-5 mb-1 self-center">
            <div>
              لديك <span className="font-bold">{userPoints === null || userPoints === void 0 ? void 0 : userPoints.points}</span> اختبار
              النقاط ويتم تصنيفها{" "}
              <span className="font-bold">{userPoints === null || userPoints === void 0 ? void 0 : userPoints.rank}</span> اليوم من{" "}
              <span className="font-bold">{pointsWithUserDetails.length}</span>{" "}
              .مجموع المتعلمين
            </div>
          </div>
          <div className="">
            <data_table_1.DataTable columns={columns_1.columns} data={pointsWithUserDetails.slice(3)}/>
          </div>
        </div>

      </div>

    </div>);
});
exports.default = Leaderboard;
