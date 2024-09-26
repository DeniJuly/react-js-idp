import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ResponsiveFormDialogProps {
  title: string;
  open: boolean;
  children: React.ReactNode;
  handleClose: (open: boolean) => void;
  onSubmit?: () => void;
  loadingSubmit?: boolean;
  hideFooter?: boolean;
}

export function ResponsiveFormDialog({
  title,
  open,
  children,
  handleClose,
  onSubmit,
  loadingSubmit,
  hideFooter,
}: ResponsiveFormDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
          {!hideFooter && (
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" type="submit">
                  Batal
                </Button>
              </DialogClose>
              <Button disabled={loadingSubmit} onClick={onSubmit} type="submit">
                Simpan
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="gap-3">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">{children}</div>
        {!hideFooter && (
          <DrawerFooter className="pt-2 flex-row">
            <DrawerClose asChild>
              <Button variant="outline" type="submit" className="flex-1">
                Batal
              </Button>
            </DrawerClose>
            <Button
              disabled={loadingSubmit}
              onClick={onSubmit}
              className="flex-1"
              type="submit"
            >
              Simpan
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
