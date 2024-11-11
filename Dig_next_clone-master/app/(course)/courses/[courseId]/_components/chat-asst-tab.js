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
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const fa_1 = require("react-icons/fa");
const openai_1 = __importDefault(require("openai"));
const ChatAsstTab = () => {
    const [messages, setMessages] = (0, react_1.useState)(() => {
        // Load messages from localStorage on initial render
        const storedMessages = localStorage.getItem("assistantMessages2");
        return storedMessages ? JSON.parse(storedMessages) : [];
    });
    const [inputValue, setInputValue] = (0, react_1.useState)("");
    const [assistant, setAssistant] = (0, react_1.useState)();
    const [thread, setThread] = (0, react_1.useState)();
    const [openai, setOpenAi] = (0, react_1.useState)();
    const messagesEndRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // حفظ messages to localStorage whenever messages change
        localStorage.setItem("assistantMessages2", JSON.stringify(messages));
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleKeyPress = (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            yield handleSubmitMessage(inputValue);
            setInputValue("");
        }
    });
    const handleSubmitMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        // Add the user message to the messages array
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, isUserMessage: true },
            // Add an empty message for the loading dot
            { text: "", isUserMessage: false },
        ]);
        try {
            // Construct queryMessages from the last 10 messages
            const queryMessages = messages
                .slice(-10) // Take the last 10 messages
                .map((msg) => ({
                role: msg.isUserMessage ? "user" : "user",
                parts: [{ "text": msg.text }],
            }));
            // Add the current user message to queryMessages
            queryMessages.push({ role: "user", parts: [{ "text": message }] });
            // Fetch response from ChatGPT
            yield (openai === null || openai === void 0 ? void 0 : openai.beta.threads.messages.create(thread === null || thread === void 0 ? void 0 : thread.id, {
                role: "user",
                content: message,
            }));
            // Run the assistant
            const run = yield (openai === null || openai === void 0 ? void 0 : openai.beta.threads.runs.create(thread === null || thread === void 0 ? void 0 : thread.id, {
                assistant_id: assistant.id,
            }));
            // Create a response
            let response = yield (openai === null || openai === void 0 ? void 0 : openai.beta.threads.runs.retrieve(thread === null || thread === void 0 ? void 0 : thread.id, run.id));
            while ((response === null || response === void 0 ? void 0 : response.status) === "in_progress" || (response === null || response === void 0 ? void 0 : response.status) === "queued") {
                console.log("waiting...");
                yield new Promise((resolve) => setTimeout(resolve, 5000));
                response = yield (openai === null || openai === void 0 ? void 0 : openai.beta.threads.runs.retrieve(thread === null || thread === void 0 ? void 0 : thread.id, run === null || run === void 0 ? void 0 : run.id));
            }
            const messageList = yield (openai === null || openai === void 0 ? void 0 : openai.beta.threads.messages.list(thread.id));
            console.log((_b = (_a = messageList === null || messageList === void 0 ? void 0 : messageList.data[0].content[0]) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.value);
            // Extract the ChatGPT response
            const chatGPTResponse = "";
            // Update messages array with ChatGPT response
            setMessages((prevMessages) => {
                var _a, _b;
                return [
                    ...prevMessages.slice(0, -1), // Remove the empty message
                    {
                        text: (_b = (_a = messageList === null || messageList === void 0 ? void 0 : messageList.data[0].content[0]) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.value,
                        isUserMessage: false,
                    },
                ];
            });
        }
        catch (error) {
            console.error(":حدث خطأ أثناء جلب استجابة ChatGPT", error);
        }
    });
    (0, react_1.useEffect)(() => {
        instChatBot();
    }, []);
    const instChatBot = () => __awaiter(void 0, void 0, void 0, function* () {
        const openai = new openai_1.default({
            apiKey: process.env.NEXT_PUBLIC_CHATGPY_API_KEY,
            dangerouslyAllowBrowser: true
        });
        const assistant = yield openai.beta.assistants.create({
            name: "Hockey Expert",
            instructions: "You are a graphic design expert. You specialize in helping others learn about graphic design.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-4-1106-preview",
        });
        // Create a thread
        const thread = yield openai.beta.threads.create();
        setAssistant(assistant);
        setThread(thread);
        setOpenAi(openai);
    });
    return (<card_1.Card className="shadow-none border-none p-0">
      <card_1.CardContent className="space-y-2 mt-3.5 pt-9 h-[300px] max-h-[300px] overflow-y-auto">
        <div className="space-y-4" dir="rtl">
          {messages.map((msg, index) => (<div key={index} className={`flex text-white text-sm ${msg.isUserMessage ? "justify-start" : "justify-end"}`}>
              {msg.isUserMessage ? (<div className="bg-emerald-500 rounded-xl rounded-br-none w-fit max-w-xs px-3 py-2">
                  {msg.text}
                </div>) : (<div className="bg-sky-500 rounded-xl rounded-bl-none w-fit max-w-xs px-3 py-2 whitespace-pre-wrap">
                  {msg.text === "" ? (<fa_1.FaSpinner className="text-lg animate-spin"/>) : (msg.text)}
                </div>)}
            </div>))}
          <div ref={messagesEndRef}/>
        </div>
      </card_1.CardContent>
      <card_1.CardFooter>
        <input_1.Input type="text" className="w-full border-none focus-visible:ring-0 bg-slate-100 mt-5" placeholder="...اكتب رسالتك" value={inputValue} multiple onChange={handleInputChange} dir="rtl" onKeyDown={handleKeyPress}/>
      </card_1.CardFooter>
    </card_1.Card>);
};
exports.default = ChatAsstTab;
