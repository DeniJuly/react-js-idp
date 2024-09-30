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
import { forgotPassSchema } from "@/data/zodSchema/auth";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotPassword } from "@/data/actions/auth-action";
import { toast } from "react-hot-toast";
import Link from "next/link";
type FormData = z.infer<typeof forgotPassSchema>;

export default function ForgotPasswordForm({
  setStep,
}: {
  setStep: (step: number, email: string) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPassSchema),
  });
  async function onSubmit(data: FormData) {
    const res = await forgotPassword(data);
    if (res.status === 200) {
      setStep(2, data.email);
    } else {
      toast.error(res.message || "Terjadi kesalahan, coba beberapa saat lagi");
    }
  }

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Lupa Password?</CardTitle>
        <CardDescription>
          Masukkan email akun Anda untuk mereset password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Masukkan email Anda"
              autoFocus
              name="email"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm">{errors?.email?.message}</p>
            )}
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full mt-4">
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
        <p className="pt-3 text-center text-gray-600 text-sm">
          Ingat password Anda?{" "}
          <Link href="/masuk" className="text-black font-medium">
            Masuk
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
