"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionList = void 0;
const react_1 = require("react");
const dnd_1 = require("@hello-pangea/dnd");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const badge_1 = require("@/components/ui/badge");
const FroalaEditorView_1 = __importDefault(require("react-froala-wysiwyg/FroalaEditorView"));
const QuestionList = ({ items, onReorder, onEdit, }) => {
    const [isMounted, setIsMounted] = (0, react_1.useState)(false);
    const [questions, setQuestions] = (0, react_1.useState)(items);
    (0, react_1.useEffect)(() => {
        setIsMounted(true);
    }, []);
    (0, react_1.useEffect)(() => {
        setQuestions(items);
    }, [items]);
    const onDragEnd = (result) => {
        if (!result.destination)
            return;
        console.log("RESULT", result);
        const items = Array.from(questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);
        const updatedQuestions = items.slice(startIndex, endIndex + 1);
        setQuestions(items);
        const bulkUpdateData = updatedQuestions.map((questions) => ({
            id: questions.id,
            position: items.findIndex((item) => item.id === questions.id),
        }));
        console.log("QUESTIONS_REORDER", bulkUpdateData);
        onReorder(bulkUpdateData);
    };
    if (!isMounted) {
        return null;
    }
    return (<dnd_1.DragDropContext onDragEnd={onDragEnd}>
      <dnd_1.Droppable droppableId="questions">
        {(provided) => (<div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map((question, index) => (<dnd_1.Draggable key={question.id} draggableId={question.id} index={index}>
                {(provided) => (<div className={(0, utils_1.cn)("flex items-center bg-sky-100 border-sky-200 text-sky-700 gap-x-2 border rounded-md mb-4 text-sm", question.isPublished &&
                        "bg-green-100 border-green-200 text-green-700")} ref={provided.innerRef} {...provided.draggableProps}>
                    <div className={(0, utils_1.cn)("px-2 py-3 border-r border-r-sky-200 hover:bg-sky-200 rounded-l-md transition")} {...provided.dragHandleProps}>
                      <lucide_react_1.Grip className="h-5 w-5"/>
                    </div>
                    <FroalaEditorView_1.default model={question.prompt}/>
                    
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <badge_1.Badge className={(0, utils_1.cn)("bg-slate-500", question.isPublished && "bg-sky-700")}>
                        {question.isPublished ? "نشرت" : "مسودة"}
                      </badge_1.Badge>
                      <lucide_react_1.Pencil onClick={() => onEdit(question.id)} className="w-4 h-4 cursor-pointer hover:opacity-75 transition"/>
                    </div>
                  </div>)}
              </dnd_1.Draggable>))}
            {provided.placeholder}
          </div>)}
      </dnd_1.Droppable>
    </dnd_1.DragDropContext>);
};
exports.QuestionList = QuestionList;
