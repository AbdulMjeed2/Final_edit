"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarRoutes = void 0;
const lucide_react_1 = require("lucide-react");
const gi_1 = require("react-icons/gi");
const navigation_1 = require("next/navigation");
const sidebar_item_1 = require("./sidebar-item");
const teacher_1 = require("@/lib/teacher");
const nextjs_1 = require("@clerk/nextjs");
const fc_1 = require("react-icons/fc");
const guestRoutes = [
    {
        icon: lucide_react_1.Globe,
        label: " مقدمة",
        href: `/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}`
    },
    {
        icon: lucide_react_1.Goal,
        label: "الاهداف ",
        href: "/goals",
    },
    {
        icon: lucide_react_1.Layout,
        label: "الدورات التدريبية",
        href: "/",
    },
    {
        icon: lucide_react_1.MessageCircle,
        label: "منتدى النقاش",
        href: "/message",
    },
    {
        icon: gi_1.GiPodiumWinner,
        label: "المتصدرين",
        href: "/leaderboard",
    },
    {
        icon: lucide_react_1.LibraryIcon,
        label: "المكتبة",
        href: "/library",
    },
    {
        icon: lucide_react_1.Contact,
        label: "تواصل معنا",
        href: "/contact",
    },
    {
        icon: lucide_react_1.ShieldMinus,
        label: "سياسة الخصوصية",
        href: "/privacy",
    },
];
const teacherRoutes = [
    {
        icon: lucide_react_1.List,
        label: "لوحة القيادة",
        href: "/teacher/courses",
    },
    {
        icon: fc_1.FcStatistics,
        label: "الاحصائيات",
        href: "/teacher/analytics",
    },
    {
        icon: lucide_react_1.Globe,
        label: " مقدمة",
        href: `/courses/${process.env.NEXT_PUBLIC_INTRODUTION_COURSE_ID}`
    },
    {
        icon: lucide_react_1.Goal,
        label: "الاهداف ",
        href: "/goals",
    },
    {
        icon: lucide_react_1.Layout,
        label: "الدورات التدريبية",
        href: "/",
    },
    {
        icon: lucide_react_1.MessageCircle,
        label: "منتدى النقاش",
        href: "/message",
    },
    {
        icon: gi_1.GiPodiumWinner,
        label: "المتصدرين",
        href: "/leaderboard",
    },
    {
        icon: lucide_react_1.LibraryIcon,
        label: "المكتبة",
        href: "/library",
    },
    {
        icon: lucide_react_1.Contact,
        label: "تواصل معنا",
        href: "/contact",
    },
    {
        icon: lucide_react_1.ShieldMinus,
        label: "سياسة الخصوصية",
        href: "/privacy",
    },
    // {
    //   icon: BarChart,
    //   label: "Analytics",
    //   href: "/teacher/analytics",
    // },
];
const SidebarRoutes = () => {
    const { userId } = (0, nextjs_1.useAuth)();
    const pathname = (0, navigation_1.usePathname)();
    const isTeacherPage = pathname === null || pathname === void 0 ? void 0 : pathname.includes("/teacher");
    const routes = (0, teacher_1.isTeacher)(userId) ? teacherRoutes : guestRoutes;
    return (<div className="flex flex-col w-full text-right">
      {routes.map((route) => (<sidebar_item_1.SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href}/>))}
    </div>);
};
exports.SidebarRoutes = SidebarRoutes;
