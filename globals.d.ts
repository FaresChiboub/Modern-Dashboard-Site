// globals.d.ts or in a custom types file (e.g., types/recaptcha.d.ts)
interface Window {
  grecaptcha: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
}
