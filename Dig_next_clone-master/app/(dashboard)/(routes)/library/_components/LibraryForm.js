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
exports.LibraryForm = LibraryForm;
const React = __importStar(require("react"));
require("froala-editor/js/plugins.pkgd.min.js");
// import "froala-editor/js/froala_editor.pkgd.min.js";
// Require Editor CSS files.
// import "froala-editor/css/froala_style.min.css";
require("froala-editor/css/froala_editor.pkgd.min.css");
const FroalaEditorView_1 = __importDefault(require("react-froala-wysiwyg/FroalaEditorView"));
const button_1 = require("@/components/ui/button");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const axios_1 = __importDefault(require("axios"));
const ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
const ckeditor5_1 = require("ckeditor5");
require("ckeditor5/ckeditor5.css");
require("ckeditor5-premium-features/ckeditor5-premium-features.css");
const defaultContent = `<div>
<section data-element_type="section" data-id="6dad7bdb">
  <div data-element_type="column" data-id="2fdea927">
    <div data-element_type="widget" data-id="1ae5ac6e" data-widget_type="heading.default">
      <h2>Buy Froala Editor</h2>
    </div>
    <div data-element_type="widget" data-id="19f12a3a" data-widget_type="heading.default">
      <h5>Powering web editing for customers ranging from startups to the world's largest companies.</h5>
      <p>
        <br>
        </p>
      </div>
    </div>
  </section>
  <section data-element_type="section" data-id="14f81af">
    <div data-element_type="column" data-id="7cf39a8">
      <div data-element_type="widget" data-id="1875aae" data-widget_type="html.default">
        <img src="https://froala.com/wp-content/uploads/2019/10/samsung.svg" alt="Samsung" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="25">
        <img data-fr-image-pasted="true" src="https://froala.com/wp-content/uploads/2019/10/apple.svg" alt="Apple" height="25" data-lazy-loaded="true" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="62">
        <img data-fr-image-pasted="true" src="https://froala.com/wp-content/uploads/2019/10/ibm.svg" alt="IBM" height="25" data-lazy-loaded="true" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="62">
        <img src="https://froala.com/wp-content/uploads/2019/10/amazon.svg" alt="Amazon" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="124">
        <img src="https://froala.com/wp-content/uploads/2019/10/ebay.svg" alt="Ebay" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="62">
        <img src="https://froala.com/wp-content/uploads/2019/10/intel.svg" alt="Intel" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="38">
        <img data-fr-image-pasted="true" alt="Netflix" src="https://froala.com/wp-content/uploads/2020/04/netflix.png" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" style="width: 10%;" width="10%" height="22">
        <img src="https://froala.com/wp-content/uploads/2019/10/cisco.svg" alt="Cisco" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="107">
        <img src="https://froala.com/wp-content/uploads/2019/10/thomson.png" alt="Thomson Reuters" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="107">
      </div>
      <p><br></p>
      <div data-element_type="widget" data-id="2f69551" data-widget_type="heading.default">We are proud to announce new flexibility with <strong>perpetual</strong> and <strong>annual</strong> plan options - perfect for any project or team!</div>
      </div>
    </section>
  </div>`;
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
function LibraryForm({ defaultContext, isTeacher }) {
    const [context, setContext] = React.useState('');
    const [editing, setEditing] = React.useState(false);
    React.useEffect(() => {
        setContext(defaultContext);
    }, []);
    const onModelChange = (model) => {
        setContext(model);
    };
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`/api/library`, { context: context });
            react_hot_toast_1.default.success("تم تحديث المكتبة");
            setEditing(false);
        }
        catch (e) {
            console.log(e);
            react_hot_toast_1.default.error("هناك شئ غير صحيح");
        }
    });
    return (<div className="App p-12">

      {editing && (<div>
            <div className="mb-6 w-full flex items-center justify-between">
              <h1 className="text-xl">اذا انتهيت</h1>
              <button_1.Button type="button" variant={"success"} className="w-full md:w-auto bg-sky-700 hover:bg-sky-600" onClick={handleSubmit}>
                {" حفظ"}

              </button_1.Button>
            </div>
            <ckeditor5_react_1.CKEditor editor={ckeditor5_1.ClassicEditor} onChange={(e, editor) => {
                const data = editor.data.get();
                onModelChange(data);
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
                initialData: context,
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
          </div>)}

      {!editing && (<div>
            {isTeacher && (<div className="flex w-full justify-between mb-4 items-center">
                  <h1 className="text-xl">    </h1>
                  <button_1.Button type="button" variant={"success"} className="w-full md:w-auto bg-sky-700 hover:bg-sky-600" onClick={e => { setEditing(true); }}>
                    {" تعديل"}

                  </button_1.Button>

                </div>)}
            <div className="ck ck-reset ck-editor ck-rounded-corners" role="application" dir="rtl" lang="ar" aria-labelledby="ck-editor__label_e5ec4d5affe02b22e9b21b94cdac3388f">
              <div className="ck ck-editor__main" role="presentation">
                <div style={{ border: "none" }} className="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-read-only" lang="ar" dir="rtl" role="textbox" aria-label="Editor editing area: main" contentEditable="false">

                  <FroalaEditorView_1.default model={context}/>
                </div>
              </div>
            </div>
          </div>)}
    </div>);
}
