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
import { signUpSchema } from "@/data/zodSchema/auth";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUp } from "@/data/actions/auth-action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SignUpData } from "@/types/data-types";
type FormData = z.infer<typeof signUpSchema>;
export default function Home() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });
  async function onSubmit(data: FormData) {
    const param: SignUpData = { ...data };
    const res = await signUp(param);
    if (res.status === 200) {
      toast.success("Berhasil mendaftar, silahkan login");
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Terjadi kesalahan, coba beberapa saat lagi");
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Daftar</CardTitle>
          <CardDescription>
            Masukkan data Anda untuk mendaftar akun.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:min-w-[550px]">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-sm" htmlFor="name">
                  Nama
                </Label>
                <Input
                  {...register("name", { required: true })}
                  type="text"
                  id="name"
                  placeholder="Masukkan nama Anda"
                  autoFocus
                  name="name"
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm">
                    {errors?.name?.message}
                  </p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-sm" htmlFor="phone_number">
                  Nomor Telepon
                </Label>
                <Input
                  {...register("phone_number", { required: true })}
                  type="number"
                  id="phone_number"
                  placeholder="Masukkan nomor telepon Anda"
                  autoFocus
                  name="phone_number"
                />
                {errors?.phone_number && (
                  <p className="text-red-500 text-sm">
                    {errors?.phone_number?.message}
                  </p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-sm" htmlFor="domicile">
                  Domisili
                </Label>
                <Input
                  {...register("domicile", { required: true })}
                  type="text"
                  id="domicile"
                  placeholder="Masukkan Domisili Anda"
                  autoFocus
                  name="domicile"
                />
                {errors?.domicile && (
                  <p className="text-red-500 text-sm">
                    {errors?.domicile?.message}
                  </p>
                )}
              </div>
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
                  <p className="text-red-500 text-sm">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-sm" htmlFor="password">
                  Password
                </Label>
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
              <div>
                <Label className="text-sm" htmlFor="Laki-Laki">
                  Jenis Kelamin
                </Label>
                <RadioGroup
                  {...register("gender", { required: true })}
                  defaultValue="Laki-Laki"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Laki-Laki" id="Laki-Laki" />
                    <Label className="text-sm" htmlFor="Laki-Laki">
                      Laki-Laki
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Perempuan" id="Perempuan" />
                    <Label className="text-sm" htmlFor="Perempuan">
                      Perempuan
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full mt-8"
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
                "Daftar"
              )}
            </Button>
          </form>
          <p className="pt-3 text-center text-gray-600 text-sm">
            Sudah mempunyai akun?{" "}
            <Link href="/" className="text-black font-medium">
              Masuk
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
