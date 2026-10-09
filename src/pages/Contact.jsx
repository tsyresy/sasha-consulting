import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Check, Send } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, WordsReveal } from "../components/Motion";
import { COMPANY, CONTACT } from "../site";

const SUBJECTS = [
  "Accompagnement business",
  "Stratégie réseaux sociaux",
  "Conseil financier",
  "Autre demande",
];

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: CONTACT.emailHref,
    cta: "Écrire un message",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    cta: "Appeler maintenant",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: COMPANY.adresse,
    href: null,
    cta: null,
  },
];

const EMPTY = { name: "", email: "", subject: SUBJECTS[0], message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [globalError, setGlobalError] = useState("");
  const sent = status === "sent";
  const sending = status === "sending";

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Merci d'indiquer ton nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Merci d'indiquer un email valide.";
    if (form.message.trim().length < 10)
      next.message = "Décris ton projet en quelques mots (10 caractères minimum).";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    const next = validate();
    setErrors(next);
    setGlobalError("");
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data.errors) setErrors(data.errors);
      setGlobalError(
        data.error || "L'envoi a échoué. Vérifie tes informations et réessaie."
      );
      setStatus("idle");
    } catch {
      setGlobalError(
        "Impossible de joindre le serveur. Réessaie dans un instant ou écris-nous directement par email."
      );
      setStatus("idle");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-2xl border bg-white/[0.03] px-5 py-4 text-white placeholder:text-white/35 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/70 ${
      errors[field] ? "border-red-400/70" : "border-white/12 focus:border-violet-400/60"
    }`;

  return (
    <>
      {/* ─────────── HEADER ─────────── */}
      <section className="pt-40 pb-16 md:pt-48">
        <div className="container-x">
          <p className="eyebrow mb-6">Contact</p>
          <h1 className="max-w-3xl text-[clamp(2.4rem,6vw,4.4rem)] text-white">
            <WordsReveal text="Parlons de ton projet." />
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            Une question, une idée, l'envie de passer à l'action ? Écris-moi ou réserve directement
            un appel découverte gratuit.
          </p>
        </div>
      </section>

      {/* ─────────── CANAUX ─────────── */}
      <section className="pb-20">
        <div className="container-x">
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            {CHANNELS.map(({ icon: Icon, label, value, href, cta }) => {
              const Wrapper = href ? "a" : "div";
              return (
                <RevealItem key={label}>
                  <Wrapper
                    {...(href ? { href } : {})}
                    className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.06]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600/30 to-orange-500/20 text-violet-200">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <p className="mt-6 text-xs uppercase tracking-[0.16em] text-white/40">
                      {label}
                    </p>
                    <p className="mt-2 break-words text-white/85">{value}</p>
                    {cta && (
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-orange-300">
                        {cta}
                        <ArrowRight
                          size={15}
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    )}
                  </Wrapper>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ─────────── FORMULAIRE ─────────── */}
      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-[clamp(1.9rem,4.2vw,2.8rem)] text-white">
              Premier appel découverte offert.
            </h2>
            <p className="mt-6 text-white/60">
              Trente minutes pour faire le point sur ta situation et repartir avec un premier plan
              d'action, que l'on travaille ensemble ou non.
            </p>
            <ul className="mt-8 space-y-3 text-white/70">
              {[
                "Réponse sous 48 h ouvrées",
                "Échange confidentiel et sans engagement",
                "Stratégie, digital et finances",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-600/25 text-violet-200">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[32px] border border-white/10 bg-[#150c22]/80 p-8 md:p-11">
              {sent ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-orange-500 text-white">
                    <Check size={30} aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 text-2xl text-white">Merci {form.name.split(" ")[0]} !</h3>
                  <p className="mt-4 max-w-sm text-white/60">
                    Ton message a bien été envoyé. Je te réponds sous 48 h ouvrées à l'adresse{" "}
                    <span className="text-white/85">{form.email}</span>. Pour toute urgence,
                    écris-moi à{" "}
                    <a href={CONTACT.emailHref} className="text-orange-300 underline">
                      {CONTACT.email}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm text-white/75">
                        Nom complet
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Sasha Libszia"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={inputClass("name")}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-2 text-sm text-red-300">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm text-white/75">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="ton@email.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={inputClass("email")}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-2 text-sm text-red-300">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm text-white/75">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={update("subject")}
                      className={`${inputClass("subject")} appearance-none cursor-pointer`}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-[#150c22] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm text-white/75">
                      Ton message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Parle-moi de ton activité, de tes objectifs et de là où tu bloques…"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`${inputClass("message")} resize-y`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-2 text-sm text-red-300">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {globalError && (
                    <p role="alert" className="rounded-2xl border border-red-400/40 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                      {globalError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {sending ? "Envoi en cours…" : "Envoyer mon message"}
                    <Send size={16} aria-hidden="true" />
                  </button>

                  <p className="text-xs leading-relaxed text-white/40">
                    En envoyant ce formulaire, tu acceptes d'être recontactée par email ou par
                    téléphone au sujet de ta demande.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
