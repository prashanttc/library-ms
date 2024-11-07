import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const AuthformSchema = z.object({
  name: z.string().min(2, {
      message: "name is required"
  }),
  email: z.string().email({
      message: "email is required"
  }),
  password: z.string().min(8, {
      message: "password must be 8 characters long"
  }),
  phone: z.string().min(10, {
      message: "number is required"
  })
})