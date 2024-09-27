import { logout } from "@/data/actions/auth-action";

export function LogoutWrapper({ children }: { children: React.ReactNode }) {
  return <form action={logout}>{children}</form>;
}
