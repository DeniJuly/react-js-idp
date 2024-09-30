"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { changePassSchema } from "@/data/zodSchema/auth";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { changePassword } from "@/data/actions/auth-action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { ChangePassData } from "@/types/data-types";
type FormData = z.infer<typeof changePassSchema>;

export default function ChangePasswordForm({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(changePassSchema),
  });
  async function onSubmit(data: FormData) {
    const params: ChangePassData = {
      ...data,
      otp: otp,
      email: email,
    };
    console.log("otp.length", otp.length);
    if (otp.length < 4) {
      toast.error("Masukkan OTP terlebih dahulu");
      return;
    }
    const res = await changePassword(params);
    if (res.status === 200) {
      toast.success("Password berhasil diubah, silahkan login kembali");
      router.replace("/");
    } else {
      toast.error(res.message || "Terjadi kesalahan, coba beberapa saat lagi");
    }
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Ubah Password</CardTitle>
        <CardDescription>Masukkan password baru Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-sm" htmlFor="newPassword">
                Password Baru
              </Label>
              <Input
                {...register("newPassword", { required: true })}
                type="password"
                id="newPassword"
                placeholder="Masukkan Password Baru Anda"
                autoFocus
                name="newPassword"
              />
              {errors?.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors?.newPassword?.message}
                </p>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-sm" htmlFor="confirmNewPassword">
                Konfirmasi Password Baru
              </Label>
              <Input
                {...register("confirmNewPassword", { required: true })}
                type="password"
                id="confirmNewPassword"
                placeholder="Masukkan Konfirmasi Password Baru Anda"
                name="confirmNewPassword"
              />
              {errors?.confirmNewPassword && (
                <p className="text-red-500 text-sm">
                  {errors?.confirmNewPassword?.message}
                </p>
              )}
            </div>
            <div>
              <Label className="text-sm" htmlFor="otp">
                OTP
              </Label>
              <InputOTP
                containerClassName="justify-center"
                textAlign="center"
                maxLength={4}
                id="otp"
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full mt-8">
            {isSubmitting ? (
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
              "Kirim"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
