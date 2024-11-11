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
const react_1 = __importStar(require("react"));
const MessageInput_1 = __importDefault(require("./_components/MessageInput"));
const MessageCard_1 = __importDefault(require("./_components/MessageCard"));
const axios_1 = __importDefault(require("axios"));
const pusher_1 = require("@/lib/pusher");
const dialogueBox_1 = require("../../_components/dialogueBox");
const lucide_react_1 = require("lucide-react");
const Message = () => {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [doubleMessage, setDoubleMessages] = (0, react_1.useState)([]);
    const [replyIs, setReplyIs] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get("/api/messages");
                setMessages(data);
                setDoubleMessages(data);
            }
            catch (error) {
                console.log(error);
            }
        });
        fetchData();
    }, []);
    (0, react_1.useEffect)(() => {
        console.log("ss");
        pusher_1.pusherClient.subscribe("chat-event");
        pusher_1.pusherClient.bind("update-message", (e) => {
            console.log(messages);
            console.log("new msg");
            let { tempMsg } = e;
            setMessages((prevState) => [tempMsg, ...prevState]);
        });
        pusher_1.pusherClient.bind("delete-message", (e) => {
            console.log("delete msg");
            let { messageId } = e;
            const tempMsg = messages;
            setMessages((prevState) => [...prevState.filter(e => e.msg.id != messageId)]);
        });
        pusher_1.pusherClient.bind("update-reply", (e) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get("/api/messages");
                setMessages(data);
                setDoubleMessages(data);
            }
            catch (error) {
                console.log(error);
            }
        }));
        pusher_1.pusherClient.bind("delete-reply", (e) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get("/api/messages");
                setMessages(data);
                setDoubleMessages(data);
            }
            catch (error) {
                console.log(error);
            }
        }));
        setTimeout(() => {
            return () => {
                pusher_1.pusherClient.unsubscribe("chat-event");
            };
        }, 1000);
    }, []);
    (0, react_1.useEffect)(() => {
        console.log(doubleMessage);
    }, [doubleMessage]);
    return (<div>
        <dialogueBox_1.DialogBox page="messagesPage"/>
      
      <div className='px-6 pt-6 block'>
        {replyIs ? (<div className='flex justify-between' dir='rtl'>
              <a onClick={(e) => __awaiter(void 0, void 0, void 0, function* () {
                const element = document.getElementById(replyIs);
                element === null || element === void 0 ? void 0 : element.scrollIntoView({
                    behavior: 'instant'
                });
                window.scrollBy({ top: -250 });
            })} className='text-sm text-gray-400 flex justify-start py-5 px-5' dir='rtl'>   تقوم حاليا بالرد على رسالة</a>
              <button onClick={e => { setReplyIs(null); }} className='text-gray-400'><lucide_react_1.X /></button>
            </div>) : ''}
        <MessageInput_1.default messageId={replyIs} setMessages={setMessages}/>
      </div>
      <div className='mt-6 flex justify-center'>
        <div>
          {messages.map(({ msg, user }, index) => {
            return (<MessageCard_1.default replyIs={replyIs} setReplyIs={setReplyIs} key={index} msg={msg} user={user}/>);
        })}

        </div>
      </div>
    </div>);
};
exports.default = Message;
