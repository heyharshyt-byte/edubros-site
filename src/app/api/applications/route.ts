import { createApplicationHandler } from "@/lib/application-intake";
import { sendApplicationEmail } from "@/lib/application-email";
import { applicationIntake } from "@/lib/application-config";

export const runtime = "nodejs";
export const maxDuration = 30;
export const POST = createApplicationHandler({
  sendEmail: sendApplicationEmail,
  production: process.env.NODE_ENV === "production",
  enabled: applicationIntake.emailVerified,
});
