export const site = {
  name: "Edubros",
  tagline: "Education Abroad Consultant",
  positioning: "Study in Italy",
  url: "https://edubros.in",
  foundedYear: 2023,
  whatsappNumber: "393513438159",
  phoneDisplay: "+39 351 343 8159",
  email: "edubros@gmail.com",
  address: {
    street: "Piazza Roma",
    city: "Ancona",
    region: "Marche",
    postalCode: "60127",
    country: "IT",
  },
  city: "Ancona",
  instagram: {
    handle: "@edubros.in",
    url: "https://www.instagram.com/edubros.in/",
  },
  community: {
    name: "Edubros Discussions",
    url: "https://chat.whatsapp.com/Eo1aOMwD1kwGlEE0CeTdmQ",
    blurb:
      "An open WhatsApp group where applicants and current students compare notes — TOLC dates, ISEE confusion, housing tips, visa interviews. We answer too.",
  },
  about: {
    bio: "Edubros is based in Ancona, on the Adriatic coast, close to the universities, the embassies, and the people who actually move the paperwork. We work with international students through every step of the Italian higher-education and visa journey, with a focus on outcomes over promises.",
    short:
      "Education-abroad consultancy that places international students into Italian universities. Bachelor, Master and PhD support, plus full Italian student visa assistance.",
  },
  languages: ["English", "Hindi", "Italian"],
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatAddress() {
  const a = site.address;
  return `${a.street}, ${a.city}, Italy ${a.postalCode}`;
}
