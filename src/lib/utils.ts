import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScroll(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  targetId: string
) {
  e.preventDefault();
  const targetElement = document.getElementById(targetId);

  if (!targetElement) return;

  const offsetTop = targetElement.offsetTop;
  const headerOffset = 80; // Adjust based on navbar height
  const elementPosition = offsetTop;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
