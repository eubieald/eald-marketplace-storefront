import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID based on the timestamp and random number.
 * Best usecase is when you need a unique identifier for elements that may be rendered multiple times,
 * such as in a list.
 *
 * @param {string} id - The ID to be appended to the unique ID.
 * @returns {string} - The unique ID.
 */
export const getUniqueId = (id?: string): string => {
  // Generate the unique ID based on the timestamp and random number
  const uniqueId = String(
    Date.now().toString(32) + Math.random().toString(16)
  ).replace(/\./g, '');

  return id ? uniqueId + id : uniqueId;
};
