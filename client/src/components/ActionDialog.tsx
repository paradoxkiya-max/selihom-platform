import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function ActionDialog({ open, onOpenChange, title, description, children, footer }: ActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-lg rounded-[1.5rem] border-border bg-white p-0 shadow-2xl">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="font-display text-2xl font-normal text-teal-950">{title}</DialogTitle>
          {description ? <DialogDescription className="text-sm leading-relaxed text-muted-foreground">{description}</DialogDescription> : null}
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer ? <DialogFooter className="border-t border-border px-6 py-4">{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  );
}
