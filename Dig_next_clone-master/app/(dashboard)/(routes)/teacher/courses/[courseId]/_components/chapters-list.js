"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaptersList = void 0;
const react_1 = require("react");
const dnd_1 = require("@hello-pangea/dnd");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const badge_1 = require("@/components/ui/badge");
const ChaptersList = ({ items, onReorder, onEdit, OnDelete, }) => {
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    const [chapters, setChapters] = (0, react_1.useState)(items);
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
    }, []);
    (0, react_1.useEffect)(() => {
        setChapters(items);
    }, [items]);
    const onDragEnd = (result) => {
        if (!result.destination)
            return;
        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);
        const updatedChapters = items.slice(startIndex, endIndex + 1);
        setChapters(items);
        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id),
        }));
        onReorder(bulkUpdateData);
    };
    if (!isMounted) {
        return null;
    }
    return (<dnd_1.DragDropContext onDragEnd={onDragEnd}>
      <dnd_1.Droppable droppableId="chapters">
        {(provided) => (<div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (<dnd_1.Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                {(provided) => (<div className={(0, utils_1.cn)("flex items-center gap-x-2 bg-sky-200 border-sky-200 border text-sky-700 rounded-md mb-4 text-sm", chapter.isPublished &&
                        "bg-green-100 border-green-200 text-green-700")} ref={provided.innerRef} {...provided.draggableProps}>
                    <div className={(0, utils_1.cn)("px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition", chapter.isPublished &&
                        "border-r-sky-200 hover:bg-sky-200")} {...provided.dragHandleProps}>
                      <lucide_react_1.Grip className="h-5 w-5"/>
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <badge_1.Badge className={(0, utils_1.cn)("bg-slate-500", chapter.isPublished && "bg-sky-700")}>
                        {chapter.isPublished ? "نشرت" : "مسودة"}
                      </badge_1.Badge>
                      <lucide_react_1.Delete onClick={() => { OnDelete(chapter.id); }} className="w-4 h-4 cursor-pointer hover:opacity-75 transition"/>
                      <lucide_react_1.Pencil onClick={() => onEdit(chapter.id)} className="w-4 h-4 cursor-pointer hover:opacity-75 transition"/>
                    </div>
                  </div>)}
              </dnd_1.Draggable>))}
            {provided.placeholder}
          </div>)}
      </dnd_1.Droppable>
    </dnd_1.DragDropContext>);
};
exports.ChaptersList = ChaptersList;
