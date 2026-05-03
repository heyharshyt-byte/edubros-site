import { whatsappLink } from "@/lib/site";

export function WhatsAppButton({
  message,
  className = "",
  children,
}: {
  message?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function WhatsAppFloating() {
  return (
    <a
      href={whatsappLink("Hi Edubros, I'd like to know more about studying in Italy.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Talk to Edubros on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0E1A3A] text-white pl-3 pr-5 py-3 rounded-full border border-[#C89A3A]/40 shadow-[0_18px_40px_-12px_rgba(14,26,58,0.55)] hover:bg-[#C89A3A] hover:text-[#0E1A3A] hover:border-[#C89A3A] transition-colors duration-500"
    >
      <span className="w-9 h-9 rounded-full bg-[#25D366] group-hover:bg-[#0E1A3A] transition-colors duration-500 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-white"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.526 2 2.06 6.466 2.06 11.978c0 1.882.522 3.737 1.518 5.382L2 22l4.755-1.55c1.575.86 3.348 1.314 5.16 1.314h.005c5.514 0 9.978-4.466 9.978-9.978 0-2.667-1.038-5.173-2.926-7.06A9.928 9.928 0 0 0 12.04 2z" />
        </svg>
      </span>
      <span className="label-caps-tight">Talk to us</span>
    </a>
  );
}
