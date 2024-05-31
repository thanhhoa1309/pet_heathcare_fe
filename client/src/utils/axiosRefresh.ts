"use client";
import { http } from "@/utils/config";
import { getSession, signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  let isRefreshing = false;

  const refreshToken = async () => {
    const sessionUse = await getSession();
    const refreshPromise = http
      .post("/auth/refresh-token", {
        refreshToken: sessionUse?.user.refresh,
      })
      .then((res) => {
        if (sessionUse) sessionUse.user.access = res.data.tokens.refresh;
        else signIn();
      })
      .finally(() => {});

    return refreshPromise;
  };

  return refreshToken;
};
