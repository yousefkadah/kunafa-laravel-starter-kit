import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date using the Intl.DateTimeFormat API
 * @param date The date to format
 * @param locale The locale to use for formatting
 * @param options Additional formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string {
  const dateObj = typeof date === 'object' ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format a number as currency
 * @param amount The amount to format
 * @param currency The currency code
 * @param locale The locale to use for formatting
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Truncate a string to a maximum length and append an ellipsis
 * @param str The string to truncate
 * @param maxLength The maximum length of the string
 * @returns Truncated string
 */
export function truncateString(str: string, maxLength: number = 50): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Capitalize the first letter of a string
 * @param str The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Debounce a function to limit how often it can be called
 * @param fn The function to debounce
 * @param delay The delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Generate a random string of specified length
 * @param length The length of the string to generate
 * @returns Random string
 */
export function randomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param value The value to check
 * @returns True if the value is empty, false otherwise
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}

/**
 * Deep clone an object
 * @param obj The object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Format bytes to a human-readable string (KB, MB, GB, etc.)
 * @param bytes The number of bytes
 * @param decimals The number of decimal places
 * @returns Formatted string
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Convert an RGB color to HEX
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns HEX color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

/**
 * Convert a HEX color to RGB
 * @param hex HEX color string
 * @returns RGB color object
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}