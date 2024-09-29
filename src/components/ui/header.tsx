"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LogoutWrapper } from "../custome/logout-wrapper";
import useSWR from "swr";
import axios from "axios";
import { getCookie } from "@/utils/cookies";

const fetcher = async (url: string) => {
  const authToken = await getCookie("token");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
const Header = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}user/detail-profile`,
    fetcher
  );
  const pathname = usePathname();
  const isMobil = useMediaQuery("(max-width: 768px)");
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full container px-4 mx-auto py-3 md:py-2 justify-between items-center">
        <div className="flex gap-2 md:gap-10 items-center">
          {isMobil ? (
            <Drawer direction="left">
              <DrawerTrigger asChild className="md:hidden">
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
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l16 0" />
                  <path d="M4 12l16 0" />
                  <path d="M4 18l16 0" />
                </svg>
              </DrawerTrigger>
              <DrawerContent className="w-2/3 h-full rounded-none">
                <DrawerHeader>
                  <DrawerTitle className="text-left font-bold text-lg">
                    Staff Man
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-2 px-4">
                  <Link href="/dashboard" legacyBehavior passHref>
                    <a
                      className={cn(
                        "py-1 text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300",
                        pathname === "/dashboard"
                          ? "text-black font-medium"
                          : ""
                      )}
                    >
                      Pegawai
                    </a>
                  </Link>
                  <Link href="/dashboard/pelatihan" legacyBehavior passHref>
                    <a
                      className={cn(
                        "py-1 text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300",
                        pathname === "/dashboard/pelatihan"
                          ? "text-black font-medium"
                          : ""
                      )}
                    >
                      Pelatihan
                    </a>
                  </Link>
                  <Link
                    href="/dashboard/pelatihan-karyawan"
                    legacyBehavior
                    passHref
                  >
                    <a
                      className={cn(
                        "py-1 text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300",
                        pathname === "/dashboard/pelatihan-karyawan"
                          ? "text-black font-medium"
                          : ""
                      )}
                    >
                      Pelatihan Karyawan
                    </a>
                  </Link>
                  <Link href="/dashboard/rekening" legacyBehavior passHref>
                    <a
                      className={cn(
                        "py-1 text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300",
                        pathname === "/dashboard/rekening"
                          ? "text-black font-medium"
                          : ""
                      )}
                    >
                      Rekening
                    </a>
                  </Link>
                </div>
                <DrawerFooter className="flex items-center justify-between flex-row">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">
                        {data?.data?.username || "..."}
                      </p>
                      <p className="text-xs text-gray-400">Admin</p>
                    </div>
                  </div>
                  <LogoutWrapper>
                    <button type="submit" className="text-red-400 size-6 p-1">
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
                        className="size-5"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M9 12h12l-3 -3" />
                        <path d="M18 15l3 -3" />
                      </svg>
                    </button>
                  </LogoutWrapper>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : null}

          <h1 className="font-bold text-lg">Staff Man</h1>
          <div className="gap-7 items-center hidden md:flex">
            <Link href="/dashboard" legacyBehavior passHref>
              <a
                className={cn(
                  "text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300",
                  pathname === "/dashboard" ? "text-black font-medium" : ""
                )}
              >
                Pegawai
              </a>
            </Link>
            <Link href="/dashboard/pelatihan" legacyBehavior passHref>
              <a
                className={cn(
                  "text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300",
                  pathname === "/dashboard/pelatihan"
                    ? "text-black font-medium"
                    : ""
                )}
              >
                Pelatihan
              </a>
            </Link>
            <Link href="/dashboard/pelatihan-karyawan" legacyBehavior passHref>
              <a
                className={cn(
                  "text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300",
                  pathname === "/dashboard/pelatihan-karyawan"
                    ? "text-black font-medium"
                    : ""
                )}
              >
                Pelatihan Karyawan
              </a>
            </Link>
            <Link href="/dashboard/rekening" legacyBehavior passHref>
              <a
                className={cn(
                  "text-sm text-slate-600 hover:text-slate-400 transition-colors duration-300",
                  pathname === "/dashboard/rekening"
                    ? "text-black font-medium"
                    : ""
                )}
              >
                Rekening
              </a>
            </Link>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <div className="text-right hidden md:inline-block">
              <p className="text-sm font-semibold">
                {data?.data?.username || "..."}
              </p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
              className="size-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 9l6 6l6 -6" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <LogoutWrapper>
              <DropdownMenuItem asChild>
                <button className="w-full cursor-pointer" type="submit">
                  Keluar
                </button>
              </DropdownMenuItem>
            </LogoutWrapper>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
