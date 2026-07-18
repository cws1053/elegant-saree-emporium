export const WHATSAPP_NUMBER = "918799279283";
export const WHATSAPP_DISPLAY = "+91 87992 79283";

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
