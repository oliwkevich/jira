import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const generateInviteCode = (length: number) => {
  const characters =
    "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
