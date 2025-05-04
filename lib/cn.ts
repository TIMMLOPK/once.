import { twMerge, twJoin, ClassNameValue } from 'tailwind-merge'

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(twJoin(inputs))
}
