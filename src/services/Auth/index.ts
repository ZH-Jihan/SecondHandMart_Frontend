"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const regesterUser = async (userdata: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userdata: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((res) => res.json());
    if (res?.success) {
      (await cookies()).set("accessToken", res?.data?.accessToken);
    }
    return res;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  let decoded = null;
  if (token) {
    decoded = await jwtDecode(token);
    return decoded;
  }
  return null;
};
