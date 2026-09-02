/**
 * Shared Clerk appearance config so the sign-in/sign-up/user-profile UI
 * looks like part of Recurr AI rather than a stock Clerk widget. Reuses the
 * same CSS custom properties defined in app/globals.css — change a token
 * there and this follows automatically.
 */
export const clerkAppearance = {
  variables: {
    colorPrimary: "var(--parrot-600)",
    colorText: "var(--neutral-900)",
    colorTextSecondary: "var(--neutral-600)",
    colorBackground: "var(--neutral-0)",
    colorInputBackground: "var(--neutral-0)",
    colorInputText: "var(--neutral-900)",
    colorDanger: "var(--error-500)",
    colorSuccess: "var(--success-500)",
    colorWarning: "var(--warning-500)",
    borderRadius: "10px",
    fontFamily: "var(--font-sans)",
    fontSize: "13.5px",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none border-none",
    card: "w-full p-0 shadow-none bg-transparent",
    header: "hidden",
    footer: "px-0",
    footerActionLink: "text-primary-600 hover:text-primary-700 font-medium",
    formButtonPrimary:
      "bg-primary-600 hover:bg-primary-700 text-white text-[13.5px] font-medium normal-case shadow-none transition-colors",
    formFieldInput:
      "border-neutral-150 focus:border-primary-600 focus:shadow-[0_0_0_3px_var(--parrot-200)] text-[13.5px]",
    formFieldLabel: "text-[13px] font-medium text-neutral-900",
    dividerLine: "bg-neutral-150",
    dividerText: "text-neutral-400 text-[12px]",
    socialButtonsBlockButton:
      "border-neutral-150 hover:bg-neutral-50 text-[13.5px] font-medium normal-case",
    identityPreview: "border-neutral-150",
    formResendCodeLink: "text-primary-600 hover:text-primary-700",
    otpCodeFieldInput: "border-neutral-150 focus:border-primary-600",
    badge: "bg-primary-50 text-primary-700",
  },
} as const;
