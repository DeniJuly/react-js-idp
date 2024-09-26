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
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid place-items-center h-screen">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
          <CardDescription>
            Masukkan username dan password Anda untuk mengakses webisite.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" placeholder="Username" autoFocus />
          </div>
          <div className="grid w-full items-center gap-1.5 mt-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <Button
            className="w-full mt-8"
            onClick={() => router.push("/dashboard")}
          >
            Masuk
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
