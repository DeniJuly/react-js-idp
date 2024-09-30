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
import { signInSchema } from "@/data/zodSchema/auth";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "@/data/actions/auth-action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
type FormData = z.infer<typeof signInSchema>;
export default function Home() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });
  async function onSubmit(data: FormData) {
    const res = await signIn(data);
    if (res.status === 200) {
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Terjadi kesalahan, coba beberapa saat lagi");
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
          <CardDescription>
            Masukkan email dan password Anda untuk mengakses webisite.
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
            <div className="grid w-full items-center gap-1.5 mt-4">
              <div className="flex justify-between items-center">
                <Label className="text-sm" htmlFor="password">
                  Password
                </Label>
                <Link
                  href="/lupa-password"
                  className="text-sm text-gray-500 font-medium text-right"
                >
                  Lupa Password?
                </Link>
              </div>
              <Input
                {...register("password", { required: true })}
                type="password"
                id="password"
                placeholder="Masukkan password Anda"
                name="password"
              />
              {errors?.password && (
                <p className="text-red-500 text-sm">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-4"
            >
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
                "Masuk"
              )}
            </Button>
          </form>
          <p className="pt-3 text-center text-gray-600 text-sm">
            Belum mempunyai akun?{" "}
            <Link href="/daftar" className="text-black font-medium">
              Daftar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
