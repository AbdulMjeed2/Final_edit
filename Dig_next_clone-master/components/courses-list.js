"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesList = void 0;
const course_card_1 = require("@/components/course-card");
const CoursesList = ({ items }) => {
    return (<div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => {
            var _a;
            return (<course_card_1.CourseCard key={item.id} id={item.id} title={item.title} imageUrl={item.imageUrl} chaptersLength={item.chapters.length} progress={item.progress} category={(_a = item === null || item === void 0 ? void 0 : item.category) === null || _a === void 0 ? void 0 : _a.name}/>);
        })}
      </div>
      {items.length === 0 && (<div className="text-center text-sm text-muted-foreground mt-10">
          لم يتم العثور على دورات
        </div>)}
    </div>);
};
exports.CoursesList = CoursesList;
