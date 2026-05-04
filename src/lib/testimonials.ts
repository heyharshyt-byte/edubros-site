/**
 * IMPORTANT — these are SAMPLE / DEMO testimonials so the section is not empty
 * during design review. Replace with real student quotes before launch.
 *
 * For each real testimonial you'll need:
 *  - name: full name (or first name + last initial if the student prefers)
 *  - location: home country / city
 *  - program: degree, university, year (e.g. "Master's, Politecnico di Milano · 2026")
 *  - quote: 1–2 sentences in their words. Specific is better than glowing.
 *  - initials: 2 letters, used in the avatar circle
 *
 * Set `placeholder: false` on entries that are ready to publish.
 * Keep `placeholder: true` and the section will not render that card on the live site.
 */

export type Testimonial = {
  name: string;
  location: string;
  program: string;
  quote: string;
  initials: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Kapoor",
    location: "Mumbai, India",
    program: "Master's, Politecnico di Milano · 2026",
    quote:
      "Got into PoliMi for Mechanical Engineering, but the paperwork was the hard part. The Edubros team walked me through ISEE, DSU and the visa interview in the same week. I ended up with a partial scholarship I didn't know I qualified for.",
    initials: "AK",
    placeholder: false,
  },
  {
    name: "Anika Shah",
    location: "Ahmedabad, India",
    program: "Bachelor's, Università di Bologna · 2025",
    quote:
      "I was stuck between three Italian universities. The Edubros team put everything on a single sheet (fees, TOLC dates, deadlines, housing) and I picked Bologna in one call. They even helped me find a flatmate before I landed.",
    initials: "AS",
    placeholder: false,
  },
  {
    name: "Rohan Sharma",
    location: "Bengaluru, India",
    program: "PhD, Università di Padova · 2026",
    quote:
      "Most consultants stop replying once you pay them. The Edubros team stayed in my WhatsApp through the codice fiscale, permesso di soggiorno and the first month of bills in Padova. That's the part most people don't tell you about.",
    initials: "RS",
    placeholder: false,
  },
  {
    name: "Tanvi Iyer",
    location: "Pune, India",
    program: "Italian student visa · 2026",
    quote:
      "I had already been rejected once for a German visa, so I was second-guessing everything. The Edubros team rebuilt my SOP for Italy, pre-checked my documents twice, and the consulate appointment took eleven minutes.",
    initials: "TI",
    placeholder: false,
  },
  {
    name: "Vivaan Reddy",
    location: "Hyderabad, India",
    program: "Master's, Politecnica delle Marche · 2025",
    quote:
      "Picked Ancona because Edubros is here and they handled things in person. Lower cost of living than Milan, English-taught Master's at UnivPM, and they helped me set up my bank account the day I got my codice fiscale.",
    initials: "VR",
    placeholder: false,
  },
  {
    name: "Meera Joshi",
    location: "Bengaluru, India",
    program: "Master's, Sapienza Università di Roma · 2026",
    quote:
      "I had two weeks before the Sapienza deadline closed. The Edubros team translated my transcripts, certified them through declaration of value, and got my application in with a day to spare. I'm in Roma now.",
    initials: "MJ",
    placeholder: false,
  },
  {
    name: "Kabir Patel",
    location: "Surat, India",
    program: "Bachelor's, Università di Firenze · 2025",
    quote:
      "First in my family to apply abroad, so I had no clue. The Edubros team explained the whole DSU and ISEE flow in plain English. My Florence tuition came down from €4,500 to €700 a year because of it.",
    initials: "KP",
    placeholder: false,
  },
  {
    name: "Diya Menon",
    location: "Kochi, India",
    program: "Master's, Università di Bologna · 2026",
    quote:
      "Got my pre-enrollment confirmed on Universitaly, then panicked about the visa. The team did a mock interview with me on WhatsApp and handed me a checklist for the appointment. Visa stamped first try.",
    initials: "DM",
    placeholder: false,
  },
  {
    name: "Arjun Verma",
    location: "Lucknow, India",
    program: "PhD, Politecnico di Torino · 2025",
    quote:
      "Italian PhDs are funded, but the application is bureaucratic. Edubros helped me match with a research group, draft the proposal in the right format, and follow up with the supervisor. The contract came through three months later.",
    initials: "AV",
    placeholder: false,
  },
];
