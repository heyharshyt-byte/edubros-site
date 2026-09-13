export const BASE_APPLICATION_FEE = 50;
export const ASSISTANCE_FEE = 10;

export const assistanceOptions = [
  {
    id: "cv",
    label: "CV preparation assistance",
    description:
      "Structure and polish a CV using your genuine education and experience.",
  },
  {
    id: "sop",
    label: "SOP preparation assistance",
    description:
      "Develop a statement of purpose from your own story, goals and achievements.",
  },
  {
    id: "english",
    label: "English-language requirement guidance",
    description:
      "Understand accepted evidence, possible waivers and test-booking next steps. No test, certificate or test fee included.",
  },
] as const;

export type AssistanceId = (typeof assistanceOptions)[number]["id"];
export const documentOptions = [
  { id: "cvStatus", label: "Do you have a CV?" },
  { id: "sopStatus", label: "Do you have a statement of purpose (SOP)?" },
  {
    id: "englishStatus",
    label: "Do you have IELTS or other English-language evidence?",
  },
  {
    id: "academicStatus",
    label: "Do you have your academic transcripts and certificates?",
  },
  { id: "passportStatus", label: "Do you have a valid passport?" },
] as const;
export type DocumentField = (typeof documentOptions)[number]["id"];
export const documentStatuses = ["Yes", "No", "Not sure"] as const;
export type DocumentStatus = "" | (typeof documentStatuses)[number];
export const studyLevels = ["Bachelor's", "Master's", "PhD"] as const;

export type ApplicationValues = {
  name: string;
  email: string;
  whatsapp: string;
  nationality: string;
  residence: string;
  qualification: string;
  subject: string;
  grades: string;
  level: string;
  intake: string;
  university: string;
  programme: string;
  programmeUrl: string;
  needsShortlist: boolean;
  assistance: AssistanceId[];
  notes: string;
  consent: boolean;
} & Record<DocumentField, DocumentStatus>;

export const initialApplication: ApplicationValues = {
  name: "",
  email: "",
  whatsapp: "",
  nationality: "",
  residence: "",
  qualification: "",
  subject: "",
  grades: "",
  level: "",
  intake: "",
  university: "",
  programme: "",
  programmeUrl: "",
  needsShortlist: false,
  cvStatus: "",
  sopStatus: "",
  englishStatus: "",
  academicStatus: "",
  passportStatus: "",
  assistance: [],
  notes: "",
  consent: false,
};

export type ApplicationErrors = Partial<
  Record<keyof ApplicationValues, string>
>;

export function applicationEstimate(assistance: readonly AssistanceId[]) {
  const items = assistanceOptions.filter((option) =>
    assistance.includes(option.id),
  );
  return {
    base: BASE_APPLICATION_FEE,
    items,
    assistance: items.length * ASSISTANCE_FEE,
    service: BASE_APPLICATION_FEE + items.length * ASSISTANCE_FEE,
    payableNow: 0,
  };
}

export function validateApplication(
  values: ApplicationValues,
  step?: number,
): ApplicationErrors {
  const errors: ApplicationErrors = {};
  const checkStep = (index: number) => step === undefined || step === index;
  if (checkStep(0)) {
    const required = {
      name: "your full name",
      email: "your email address",
      whatsapp: "your WhatsApp number",
      nationality: "your nationality",
      residence: "your country of residence",
      qualification: "your current or latest qualification",
      subject: "your subject",
      grades: "your grades and grading scale",
    } as const;
    for (const [key, label] of Object.entries(required)) {
      if (!values[key as keyof typeof required].trim())
        errors[key as keyof typeof required] = `Please enter ${label}.`;
    }
    if (values.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(values.email))
      errors.email = "Enter a valid email address.";
    if (
      values.whatsapp &&
      (!/^\+[\d\s().-]+$/.test(values.whatsapp) ||
        values.whatsapp.replace(/\D/g, "").length < 7 ||
        values.whatsapp.replace(/\D/g, "").length > 15)
    )
      errors.whatsapp =
        "Include your country code, for example +39 351 343 8159.";
  }
  if (checkStep(1)) {
    if (!(studyLevels as readonly string[]).includes(values.level))
      errors.level = "Select a study level.";
    if (!values.intake.trim())
      errors.intake = "Enter an intake, or write 'Not sure'.";
    if (!values.needsShortlist) {
      if (!values.university.trim())
        errors.university = "Enter one university, or ask for help choosing.";
      if (!values.programme.trim())
        errors.programme = "Enter the programme you want to apply to.";
    }
    if (!values.needsShortlist && values.programmeUrl) {
      try {
        const url = new URL(values.programmeUrl);
        if (
          !["http:", "https:"].includes(url.protocol) ||
          url.username ||
          url.password
        )
          throw new Error("Invalid URL");
      } catch {
        errors.programmeUrl =
          "Enter a full http:// or https:// programme link.";
      }
    }
  }
  if (checkStep(2)) {
    for (const { id } of documentOptions) {
      if (!(documentStatuses as readonly string[]).includes(values[id]))
        errors[id] = "Choose Yes, No or Not sure.";
    }
  }
  if (checkStep(3) && !values.consent)
    errors.consent =
      "Please agree to the request and privacy notice before sending.";
  return errors;
}

// Explicit allowlists prevent forged price fields or recipient addresses from entering the email.
export function parseApplication(
  input: unknown,
): { values: ApplicationValues; errors: ApplicationErrors } | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;
  const values = { ...initialApplication, assistance: [] as AssistanceId[] };
  const limits: Record<string, number> = {
    name: 100,
    email: 254,
    whatsapp: 40,
    nationality: 100,
    residence: 100,
    qualification: 200,
    subject: 200,
    grades: 120,
    level: 30,
    intake: 100,
    university: 200,
    programme: 250,
    programmeUrl: 1500,
    notes: 2000,
    cvStatus: 20,
    sopStatus: 20,
    englishStatus: 20,
    academicStatus: 20,
    passportStatus: 20,
  };
  for (const [key, max] of Object.entries(limits)) {
    const value = raw[key];
    if (
      typeof value !== "string" ||
      value.length > max ||
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)
    )
      return null;
    if (key !== "notes" && /[\r\n]/.test(value)) return null;
    Object.assign(values, { [key]: value.trim() });
  }
  if (
    typeof raw.needsShortlist !== "boolean" ||
    typeof raw.consent !== "boolean"
  )
    return null;
  if (
    !Array.isArray(raw.assistance) ||
    raw.assistance.length > assistanceOptions.length ||
    new Set(raw.assistance).size !== raw.assistance.length
  )
    return null;
  if (
    raw.assistance.some(
      (id) => !assistanceOptions.some((option) => option.id === id),
    )
  )
    return null;
  values.assistance = assistanceOptions
    .filter((option) => (raw.assistance as unknown[]).includes(option.id))
    .map((option) => option.id);
  values.needsShortlist = raw.needsShortlist;
  values.consent = raw.consent;
  if (values.needsShortlist) {
    values.university = "";
    values.programme = "";
    values.programmeUrl = "";
  }
  return { values, errors: validateApplication(values) };
}

// Keep one identity per normalized payload for this open form's retry history.
// Reverted edits and differently ordered selections must not send duplicate mail.
export function applicationRequestId(
  values: ApplicationValues,
  attempts: Map<string, string>,
  makeId: () => string,
): string {
  const normalized = parseApplication(values);
  const payload = JSON.stringify(normalized?.values ?? values);
  const existing = attempts.get(payload);
  if (existing) return existing;
  const id = makeId();
  attempts.set(payload, id);
  return id;
}
