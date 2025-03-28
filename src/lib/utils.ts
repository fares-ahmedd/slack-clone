import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(email: string): boolean {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(
  password: string,
  minLength: number = 6
): boolean {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasMinLength = password.length >= minLength;

  return hasUppercase && hasLowercase && hasDigit && hasMinLength;
}

export const generateCode = () => {
  const code = Array.from({ length: 6 }, () =>
    "0123456789abcdefjklmnopqrstuvwxyz".charAt(
      Math.floor(Math.random() * "0123456789abcdefjklmnopqrstuvwxyz".length)
    )
  ).join("");

  return code;
};
