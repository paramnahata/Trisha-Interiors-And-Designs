import { useState, type FormEvent } from "react";
import { ArrowRight, MapPin, Phone, Clock, MessageCircle, Instagram } from "lucide-react";
import { BUSINESS, waLink } from "@/lib/business";
import { Reveal } from "./Reveal";

const SPACES = ["Residential – full home", "Living room", "Bedroom", "Kitchen & storage", "Commercial", "Consultation only"];

type Errors = Partial<Record<"name" | "phone" | "email" | "space" | "location" | "message", string>>;

const field =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-gold";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const errs: Errors = {};
    if (v("name").length < 2) errs.name = "Please enter your full name.";
    if (!/^\+?[\d\s-]{10,15}$/.test(v("phone"))) errs.phone = "Please enter a valid phone number.";
    if (v("email") && !/^\S+@\S+\.\S+$/.test(v("email"))) errs.email = "Please enter a valid email address.";
    if (!v("space")) errs.space = "Please choose a type of space.";
    if (!v("location")) errs.location = "Please enter the project location.";
    if (v("message").length < 5) errs.message = "Please tell us a little about your project.";
    setErrors(errs);
    setSent(false);
    if (Object.keys(errs).length) return;
    const msg = [
      "Hello Trisha Interiors And Designs, I would like to discuss an interior design project.",
      `Name: ${v("name")}`,
      `Phone: ${v("phone")}`,
      v("email") && `Email: ${v("email")}`,
      `Space: ${v("space")}`,
      v("budget") && `Approx. budget: ${v("budget")}`,
      `Location: ${v("location")}`,
      `Message: ${v("message")}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
  }

  const Err = ({ k }: { k: keyof Errors }) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1 text-xs text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <section id="contact" className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Contact</p>
          <h2 className="display mt-5 text-5xl lg:text-6xl">Visit or write to the studio.</h2>
          <ul className="mt-12 space-y-7 text-sm">
            <li className="flex gap-4">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <span>
                {BUSINESS.address}
                <br />
                <a href={BUSINESS.maps} target="_blank" rel="noopener noreferrer" className="nav-link mt-2 inline-block text-xs uppercase tracking-[0.2em] text-gold">
                  Get directions
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <Phone size={18} className="shrink-0 text-gold" />
              <a href={`tel:${BUSINESS.phoneTel}`} className="nav-link">{BUSINESS.phoneDisplay}</a>
            </li>
            <li className="flex gap-4">
              <Clock size={18} className="shrink-0 text-gold" />
              <span>{BUSINESS.hours}</span>
            </li>
            <li className="flex gap-4">
              <MessageCircle size={18} className="shrink-0 text-gold" />
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="nav-link">Enquire on WhatsApp</a>
            </li>
            <li className="flex gap-4">
              <Instagram size={18} className="shrink-0 text-gold" />
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="nav-link">Follow on Instagram</a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form noValidate onSubmit={onSubmit} className="grid gap-8 border border-border bg-card p-6 sm:grid-cols-2 sm:p-10">
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Full name *
              <input name="name" autoComplete="name" className={field} {...aria("name")} />
              <Err k="name" />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Phone number *
              <input name="phone" type="tel" autoComplete="tel" className={field} {...aria("phone")} />
              <Err k="phone" />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Email (optional)
              <input name="email" type="email" autoComplete="email" className={field} {...aria("email")} />
              <Err k="email" />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Type of space *
              <select name="space" defaultValue="" className={field} {...aria("space")}>
                <option value="" disabled>Select…</option>
                {SPACES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <Err k="space" />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Approx. budget (optional)
              <input name="budget" className={field} />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Project location *
              <input name="location" className={field} {...aria("location")} />
              <Err k="location" />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground sm:col-span-2">
              Message *
              <textarea name="message" rows={4} className={`${field} resize-none`} {...aria("message")} />
              <Err k="message" />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-lux bg-walnut text-ivory hover:bg-gold hover:border-gold">
                Send via WhatsApp <ArrowRight size={14} />
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Your details are sent through WhatsApp — the form doesn't store anything on this website.
              </p>
              <p role="status" className="mt-2 text-sm text-foreground">
                {sent && "WhatsApp has opened with your message — press send there to reach the studio."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
