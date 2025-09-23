import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toLocalDateLabel(iso: string, tzOffsetMinutes = 7 * 60) {
  const date = new Date(iso)
  const local = new Date(date.getTime() + tzOffsetMinutes * 60_000)
  return local.toLocaleDateString(undefined, { month: "short", day: "2-digit" })
}

// Optimized number formatting with caching
const numberFormatters = new Map<string, Intl.NumberFormat>()

export function formatNumber(value: number, locale = 'en-US'): string {
  if (!numberFormatters.has(locale)) {
    numberFormatters.set(locale, new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
      useGrouping: true,
    }))
  }

  const formatter = numberFormatters.get(locale)!
  return formatter.format(value)
}

// Memoized date formatting for chart data
const dateFormatters = new Map<string, Intl.DateTimeFormat>()

export function formatDate(date: string | Date, locale = 'en-US'): string {
  const key = `${locale}-short-day`

  if (!dateFormatters.has(key)) {
    dateFormatters.set(key, new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: '2-digit'
    }))
  }

  const formatter = dateFormatters.get(key)!
  return formatter.format(new Date(date))
}

// Debounce function for search inputs
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

