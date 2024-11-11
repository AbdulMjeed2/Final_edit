"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.LessonDescriptionForm = void 0;
const z = __importStar(require("zod"));
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("@hookform/resolvers/zod");
const react_hook_form_1 = require("react-hook-form");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const navigation_1 = require("next/navigation");
const form_1 = require("@/components/ui/form");
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
const FroalaEditorView_1 = __importDefault(require("react-froala-wysiwyg/FroalaEditorView"));
require("froala-editor/js/plugins.pkgd.min.js");
// import "froala-editor/js/froala_editor.pkgd.min.js";
// Require Editor CSS files.
// import "froala-editor/css/froala_style.min.css";
require("froala-editor/css/froala_editor.pkgd.min.css");
const ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
const ckeditor5_1 = require("ckeditor5");
require("ckeditor5/ckeditor5.css");
require("ckeditor5-premium-features/ckeditor5-premium-features.css");
const formSchema = z.object({
    description: z.string().min(1),
});
const LessonDescriptionForm = ({ initialData, courseId, chapterId, lessonId, }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = (0, navigation_1.useRouter)();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: {
            description: (initialData === null || initialData === void 0 ? void 0 : initialData.description) || "",
        },
    });
    const froalaEditorConfig = {
        readonly: true,
        direction: "rtl",
        attribution: false,
        height: 400,
        quickInsertEnabled: false,
        imageDefaultWidth: 0,
        imageResizeWithPercent: true,
        imageMultipleStyles: false,
        imageOutputSize: true,
        imageRoundPercent: true,
        imageMaxSize: 1024 * 1024 * 2.5,
        imageEditButtons: [
            "imageReplace",
            "imageAlign",
            "imageRemove",
            "imageSize",
            "-",
            "imageLink",
            "linkOpen",
            "linkEdit",
            "linkRemove"
        ],
        imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
        imageInsertButtons: ["imageBack", "|", "imageUpload"],
        placeholderText: "Your content goes here!",
        colorsStep: 5,
        colorsText: [
            "#000000",
            "#2C2E2F",
            "#6C7378",
            "#FFFFFF",
            "#009CDE",
            "#003087",
            "#FF9600",
            "#00CF92",
            "#DE0063",
            "#640487",
            "REMOVE"
        ],
        colorsBackground: [
            "#000000",
            "#2C2E2F",
            "#6C7378",
            "#FFFFFF",
            "#009CDE",
            "#003087",
            "#FF9600",
            "#00CF92",
            "#DE0063",
            "#640487",
            "REMOVE"
        ],
        toolbarButtons: {
            moreText: {
                buttons: [
                    "paragraphFormat",
                    "|",
                    "fontSize",
                    "textColor",
                    "backgroundColor",
                    "insertImage",
                    "alignLeft",
                    "alignRight",
                    "alignJustify",
                    "formatOL",
                    "formatUL",
                    "indent",
                    "outdent"
                ],
                buttonsVisible: 6
            },
            moreRich: {
                buttons: [
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "insertHR",
                    "insertLink",
                    "insertTable"
                ],
                name: "additionals",
                buttonsVisible: 3
            },
            dummySection: {
                buttons: ["|"]
            },
            moreMisc: {
                buttons: ["|", "undo", "redo", "help", "|"],
                align: "right",
                buttonsVisible: 2
            }
        },
        tableEditButtons: [
            "tableHeader",
            "tableRemove",
            "tableRows",
            "tableColumns",
            "tableStyle",
            "-",
            "tableCells",
            "tableCellBackground",
            "tableCellVerticalAlign",
            "tableCellHorizontalAlign"
        ],
        tableStyles: {
            grayTableBorder: "Gray Table Border",
            blackTableBorder: "Black Table Border",
            noTableBorder: "No Table Border"
        },
        toolbarSticky: true,
        pluginsEnabled: [
            "align",
            "colors",
            "entities",
            "fontSize",
            "help",
            "image",
            "link",
            "lists",
            "paragraphFormat",
            "paragraphStyle",
            "save",
            "table",
            "wordPaste"
        ],
        events: {
            'image.beforeUpload': function (files) {
                var editor = this;
                if (files.length) {
                    // Create a File Reader.
                    var reader = new FileReader();
                    // Set the reader to insert images when they are loaded.
                    reader.onload = function (e) {
                        var result = e.target.result;
                        editor.image.insert(result, null, null, editor.image.get());
                    };
                    // Read image as base64.
                    reader.readAsDataURL(files[0]);
                }
                editor.popups.hideAll();
                // Stop default upload chain.
                return false;
            }
        },
    };
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`/api/courses/${courseId}/chapters/${chapterId}/lessons/${lessonId}`, values);
            react_hot_toast_1.default.success("تم تحديث الدرس");
            toggleEdit();
            router.refresh();
        }
        catch (_a) {
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
    });
    return (<div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        وصف الدرس
        <button_1.Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (<>إلغاء</>) : (<>
              <lucide_react_1.Pencil className="h-4 w-4 mr-2"/>
              تحرير الوصف
            </>)}
        </button_1.Button>
      </div>
      {!isEditing && (<div className={(0, utils_1.cn)("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>
          {!initialData.description && "بدون وصف"}
          {initialData.description && (<div className="ck ck-reset ck-editor ck-rounded-corners" role="application" dir="rtl" lang="ar" aria-labelledby="ck-editor__label_e5ec4d5affe02b22e9b21b94cdac3388f">
              <div className="ck ck-editor__main" role="presentation">
                <div style={{ border: "none" }} className="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-read-only" lang="ar" dir="rtl" role="textbox" aria-label="Editor editing area: main" contentEditable="false">

                  <FroalaEditorView_1.default model={form.getValues().description}/>

                </div>
              </div>
            </div>)}
        </div>)}
      {isEditing && (<form_1.Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <form_1.FormField control={form.control} name="description" render={({ field }) => (<form_1.FormItem>
                  <form_1.FormControl>
                    <ckeditor5_react_1.CKEditor editor={ckeditor5_1.ClassicEditor} onChange={(e, editor) => {
                    const data = editor.data.get();
                    form.setValue("description", data);
                }} config={{
                    fontColor: {
                        colors: [
                            {
                                color: 'hsl(0, 0%, 0%)',
                                label: 'Black'
                            },
                            {
                                color: 'hsl(0, 0%, 30%)',
                                label: 'Dim grey'
                            },
                            {
                                color: 'hsl(0, 0%, 60%)',
                                label: 'Grey'
                            },
                            {
                                color: 'hsl(0, 0%, 90%)',
                                label: 'Light grey'
                            },
                            {
                                color: 'hsl(0, 0%, 100%)',
                                label: 'White',
                                hasBorder: true
                            },
                            // More colors.
                            // ...
                        ]
                    },
                    fontBackgroundColor: {
                        colors: [
                            {
                                color: 'hsl(0, 75%, 60%)',
                                label: 'Red'
                            },
                            {
                                color: 'hsl(30, 75%, 60%)',
                                label: 'Orange'
                            },
                            {
                                color: 'hsl(60, 75%, 60%)',
                                label: 'Yellow'
                            },
                            {
                                color: 'hsl(90, 75%, 60%)',
                                label: 'Light green'
                            },
                            {
                                color: 'hsl(120, 75%, 60%)',
                                label: 'Green'
                            },
                            // More colors.
                            // ...
                        ]
                    },
                    language: {
                        content: 'ar',
                    },
                    plugins: [ckeditor5_1.Autoformat,
                        ckeditor5_1.BlockQuote,
                        ckeditor5_1.Bold,
                        ckeditor5_1.CKFinder,
                        ckeditor5_1.CKFinderUploadAdapter,
                        ckeditor5_1.CloudServices,
                        ckeditor5_1.Essentials,
                        ckeditor5_1.Heading,
                        ckeditor5_1.Image,
                        ckeditor5_1.ImageCaption,
                        ckeditor5_1.ImageResize,
                        ckeditor5_1.ImageStyle,
                        ckeditor5_1.ImageToolbar,
                        ckeditor5_1.ImageUpload,
                        ckeditor5_1.Base64UploadAdapter,
                        ckeditor5_1.Indent,
                        ckeditor5_1.IndentBlock,
                        ckeditor5_1.Italic,
                        ckeditor5_1.Link,
                        ckeditor5_1.List,
                        ckeditor5_1.MediaEmbed,
                        ckeditor5_1.Mention,
                        ckeditor5_1.Paragraph,
                        ckeditor5_1.PasteFromOffice,
                        ckeditor5_1.PictureEditing,
                        ckeditor5_1.Table,
                        ckeditor5_1.TableColumnResize,
                        ckeditor5_1.TableToolbar,
                        ckeditor5_1.TextTransformation,
                        ckeditor5_1.Underline,
                        ckeditor5_1.Alignment],
                    toolbar: [
                        'undo',
                        'redo',
                        '|',
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'link',
                        'uploadImage',
                        'ckbox',
                        'insertTable',
                        'blockQuote',
                        'mediaEmbed',
                        '|',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        'alignment'
                    ],
                    heading: {
                        options: [
                            {
                                model: 'paragraph',
                                title: 'Paragraph',
                                class: 'ck-heading_paragraph',
                            },
                            {
                                model: 'heading1',
                                view: 'h1',
                                title: 'Heading 1',
                                class: 'ck-heading_heading1',
                            },
                            {
                                model: 'heading2',
                                view: 'h2',
                                title: 'Heading 2',
                                class: 'ck-heading_heading2',
                            },
                            {
                                model: 'heading3',
                                view: 'h3',
                                title: 'Heading 3',
                                class: 'ck-heading_heading3',
                            },
                            {
                                model: 'heading4',
                                view: 'h4',
                                title: 'Heading 4',
                                class: 'ck-heading_heading4',
                            },
                        ],
                    },
                    licenseKey: 'bE0wYlJQa085OGNKM002ZlliYW9WUjVaOWptVXpadWJHaUJ1WThxUmFlZVoyS0JTb2cwNXhQMUw4YSs3TlE9PS1NakF5TkRBNU1Eaz0=',
                    initialData: form.getValues("description"),
                    image: {
                        resizeOptions: [
                            {
                                name: 'resizeImage:original',
                                label: 'Default image width',
                                value: null,
                            },
                            {
                                name: 'resizeImage:50',
                                label: '50% page width',
                                value: '50',
                            },
                            {
                                name: 'resizeImage:75',
                                label: '75% page width',
                                value: '75',
                            },
                        ],
                        toolbar: [
                            'imageTextAlternative',
                            'toggleImageCaption',
                            '|',
                            'imageStyle:inline',
                            'imageStyle:wrapText',
                            'imageStyle:breakText',
                            '|',
                            'resizeImage',
                        ],
                    },
                }}/>
                  </form_1.FormControl>
                  <form_1.FormMessage />
                </form_1.FormItem>)}/>
            <div className="flex items-center gap-x-2">
              <button_1.Button disabled={isSubmitting} type="submit">
                حفظ
              </button_1.Button>
            </div>
          </form>
        </form_1.Form>)}
    </div>);
};
exports.LessonDescriptionForm = LessonDescriptionForm;
