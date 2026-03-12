
"use client";

/**
 * Hook limpo para sua implementação futura de tagueamento.
 * Aqui você poderá definir sua lógica de GA4, GTM, etc.
 */
export function useTagging() {
  const trackEvent = (eventName: string, data?: any) => {
    // Implemente seu estudo aqui
    console.log(`Evento: ${eventName}`, data);
  };

  return { trackEvent };
}
