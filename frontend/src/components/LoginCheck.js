"use client";
import { getLoginUserData } from "@/utils/selector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function LoginCheck() {
  const router = useRouter();
  const isLogin = useSelector(getLoginUserData);

  useEffect(() => {
    if (!isLogin?.token) {
      router.push("/my-admin/login");
    }
  }, [isLogin]);

  return null;
}
