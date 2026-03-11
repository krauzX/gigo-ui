import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const CHAOS_COLORS = [
  "text-gigo-magenta",
  "text-gigo-lime",
  "text-gigo-yellow",
  "text-gigo-orange",
  "text-gigo-pink",
  "text-gigo-cyan",
  "text-gigo-hotpink",
  "text-gigo-red",
  "text-gigo-blue",
  "text-gigo-tomato",
];

const CHAOS_TRANSFORMS = [
  "rotate-1",
  "-rotate-1",
  "rotate-3",
  "-rotate-3",
  "rotate-6",
  "-rotate-6",
  "rotate-12",
  "-rotate-12",
  "skew-x-3",
  "-skew-x-3",
  "skew-y-3",
  "-skew-y-3",
  "scale-95",
  "scale-105",
  "scale-110",
];

const CHAOS_ANIMATIONS = [
  "animate-gigo-jitter",
  "animate-gigo-wiggle",
  "animate-gigo-shake",
  "animate-gigo-glitch",
];

export function chaosRandom(max: number): number {
  return Math.floor(Math.random() * max);
}

export function chaosPickOne<T>(items: T[]): T {
  return items[chaosRandom(items.length)];
}

export function chaosClasses(level: number): string {
  if (level <= 0) return "";

  const classes: string[] = [];

  if (level >= 2) classes.push(chaosPickOne(CHAOS_COLORS));
  if (level >= 4) classes.push(chaosPickOne(CHAOS_TRANSFORMS));
  if (level >= 6) classes.push(chaosPickOne(CHAOS_ANIMATIONS));
  if (level >= 8) classes.push("font-gigo-chaos");
  if (level >= 10)
    classes.push("animate-gigo-nightmare", "font-gigo-nightmare");

  return classes.join(" ");
}

const GARBAGE_WORDS = [
  "ERROR",
  "undefined",
  "NaN",
  "404",
  "null",
  "???",
  "LOADING...",
  "no.",
  "HELP",
  "bruh",
  ":(",
  "segfault",
  "lol",
  "oops",
  "yeet",
  "💀",
];

export function randomGarbageText(): string {
  return chaosPickOne(GARBAGE_WORDS);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Clamp a number within a range */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
