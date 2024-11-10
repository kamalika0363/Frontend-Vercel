import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: { split: (arg0: string) => [any, any, any]; }) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};
