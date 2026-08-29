export function chosoSourceUrl(imageSrc: string): string {
  return `/_next/image?url=${encodeURIComponent(imageSrc)}&w=750&q=75`;
}

