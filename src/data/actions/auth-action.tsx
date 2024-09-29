"use server";
import { LoginResponse } from "@/types/data-types";
import { setCookie } from "@/utils/cookies";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const signIn = async (data: { email: string; password: string }) => {
  try {
    const res: AxiosResponse<LoginResponse> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}login-user`,
      data
    );
    const status = res.data.status;
    if (status === "200") {
      if (res.data.data?.access_token) {
        setCookie(
          "token",
          res.data.data.access_token,
          res.data.data.expires_in / (60 * 60 * 24)
        );
        return {
          status: 200,
          message: "Success",
        };
      } else {
        throw new Error("Terjadi kesalahan, coba beberapa saat lagi");
      }
    } else if (status === "404") {
      throw new Error("Email atau password salah");
    } else {
      throw new Error("Terjadi kesalahan, coba beberapa saat lagi");
    }
  } catch (error: any) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const logout = async () => {
  cookies().set("token", "", {
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
  redirect("/");
};
