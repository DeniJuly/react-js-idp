import * as React from "react";
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
          <form onSubmit={onSubmit} method="post">
            {children}
            {!hideFooter && (
              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Batal
                  </Button>
                </DialogClose>
                <Button disabled={loadingSubmit} type="submit">
                  {loadingSubmit ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-spin size-6"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </DialogFooter>
            )}
          </form>
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
        <form onSubmit={onSubmit} method="POST">
          <div className="px-4">{children}</div>
          {!hideFooter && (
            <DrawerFooter className="pt-2 flex-row">
              <DrawerClose asChild>
                <Button variant="outline" type="button" className="flex-1">
                  Batal
                </Button>
              </DrawerClose>
              <Button disabled={loadingSubmit} className="flex-1" type="submit">
                {loadingSubmit ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-spin size-6"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 3a9 9 0 1 0 9 9" />
                  </svg>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DrawerFooter>
          )}
        </form>
      </DrawerContent>
    </Drawer>
  );
}
