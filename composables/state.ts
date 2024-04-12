export const useCookieConsent = (visible: Boolean) => useState<Boolean>('cookieConsent', () => visible)
