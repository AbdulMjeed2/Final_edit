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
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const headers_1 = require("next/headers");
const server_1 = require("next/server");
const stripe_1 = require("@/lib/stripe");
function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const body = yield req.text();
        const signature = (0, headers_1.headers)().get("Stripe-Signature");
        let event;
        try {
            event = stripe_1.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        }
        catch (error) {
            return new server_1.NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
        }
        const session = event.data.object;
        const userId = (_a = session === null || session === void 0 ? void 0 : session.metadata) === null || _a === void 0 ? void 0 : _a.userId;
        const courseId = (_b = session === null || session === void 0 ? void 0 : session.metadata) === null || _b === void 0 ? void 0 : _b.courseId;
        if (event.type === "checkout.session.completed") {
            if (!userId || !courseId) {
                return new server_1.NextResponse(`Webhook Error: Missing metadata`, {
                    status: 400,
                });
            }
            // await db.purchase.create({
            //   data: {
            //     courseId: courseId,
            //     userId: userId,
            //   }
            // });
        }
        else {
            return new server_1.NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 });
        }
        return new server_1.NextResponse(null, { status: 200 });
    });
}
