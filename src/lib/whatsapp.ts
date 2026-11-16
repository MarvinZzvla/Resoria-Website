export function whatsappDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function whatsappUrl(phone: string, text?: string): string {
  const base = `https://wa.me/${whatsappDigits(phone)}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
