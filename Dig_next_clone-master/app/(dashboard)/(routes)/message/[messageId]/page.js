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
const axios_1 = __importDefault(require("axios"));
const pusher_1 = require("@/lib/pusher");
const ReplyCard_1 = __importDefault(require("./_components/ReplyCard"));
const ReplyCardOwner_1 = __importDefault(require("./_components/ReplyCardOwner"));
const ReplyInput_1 = __importDefault(require("./_components/ReplyInput"));
const Reply = ({ params }) => {
    const [replies, setReplies] = (0, react_1.useState)([]);
    const [origin, setOrigin] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        console.log("ss");
        pusher_1.pusherClient.subscribe("chat-event");
        pusher_1.pusherClient.bind("update-reply", (e) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log("new msg");
                let { tempMsg } = e;
                setReplies((prevState) => [tempMsg, ...prevState]);
            }
            catch (error) {
                console.log(error);
            }
        }));
        pusher_1.pusherClient.bind("delete-reply", (e) => {
            console.log("delete msg");
            let { messageId } = e;
            setReplies((prevState) => [...prevState.filter(e => e.msg.id != messageId)]);
        });
        setTimeout(() => {
            return () => {
                pusher_1.pusherClient.unsubscribe("chat-event");
            };
        }, 1000);
    }, []);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`/api/messages/${params.messageId}`);
                console.log(data);
                setReplies(data.replies);
                setOrigin(data.orgin);
                console.log(replies);
            }
            catch (error) {
                console.log(error);
            }
        });
        fetchData();
    }, []);
    (0, react_1.useEffect)(() => {
        console.log(origin);
    }, [origin]);
    return (<div className='relative w-full'>
      <div className='px-6 pt-6 block'>
        <ReplyInput_1.default messageId={params.messageId}/>

      </div>
      <div className='mt-6 flex justify-center'>
        {origin && (<ReplyCardOwner_1.default user={origin === null || origin === void 0 ? void 0 : origin.user} msg={origin === null || origin === void 0 ? void 0 : origin.message}/>)}

      </div>
      <hr className='bg-gray-600 text-black h-[2px]'/>
      <div className='mt-6 flex justify-center'>
        <div>
          {replies.map((reply, index) => {
            console.log("s");
            return (reply && <ReplyCard_1.default messageId={params.messageId} msg={reply.msg} user={reply.user}/>);
        })}

        </div>
      </div>
    </div>);
};
exports.default = Reply;
