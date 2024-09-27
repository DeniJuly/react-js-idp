"use server";
import { cookies } from "next/headers";

const config = {
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: true,
};

export const setCookie = (name: string, value: string, days: number) => {
  cookies().set(name, value, { ...config, maxAge: 60 * 60 * 24 * days });
};

export async function getCookie(name: string) {
  const data = cookies().get(name)?.value;
  return data;
}

export const deleteCookie = (name: string) => {
  return cookies().delete(name);
};
