import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const AuthformSchema = (type: string) =>
  z.object({
    name: type === 'sign-up'
      ? z.string().min(2, { message: "Name is required" })
      : z.string().optional(),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(8, { message: "Password must be 8 characters long" }),
    phone: type === 'sign-up'
      ? z.string().min(10, { message: "Phone number is required" })
      : z.string().optional(),
  });
