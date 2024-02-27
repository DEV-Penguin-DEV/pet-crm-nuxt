import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertCurrency(amount: string | number) {
  return Intl.NumberFormat('USA', {
    style: 'currency',
    currency: 'USD'
  }).format(+amount)
}