"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmModal = void 0;
const alert_dialog_1 = require("@/components/ui/alert-dialog");
;
const ConfirmModal = ({ children, onConfirm }) => {
    return (<alert_dialog_1.AlertDialog>
      <alert_dialog_1.AlertDialogTrigger asChild>
        {children}
      </alert_dialog_1.AlertDialogTrigger>
      <alert_dialog_1.AlertDialogContent>
        <alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogTitle>هل أنت متأكد؟</alert_dialog_1.AlertDialogTitle>
          <alert_dialog_1.AlertDialogDescription>
          لا يمكن التراجع عن هذا الإجراء.
          </alert_dialog_1.AlertDialogDescription>
        </alert_dialog_1.AlertDialogHeader>
        <alert_dialog_1.AlertDialogFooter>
          <alert_dialog_1.AlertDialogCancel>إلغاء</alert_dialog_1.AlertDialogCancel>
          <alert_dialog_1.AlertDialogAction onClick={onConfirm}>
          يكمل
          </alert_dialog_1.AlertDialogAction>
        </alert_dialog_1.AlertDialogFooter>
      </alert_dialog_1.AlertDialogContent>
    </alert_dialog_1.AlertDialog>);
};
exports.ConfirmModal = ConfirmModal;
