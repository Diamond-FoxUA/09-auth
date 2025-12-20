import { ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthProps) {
  return children;
}