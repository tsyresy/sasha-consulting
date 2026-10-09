import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { COMPANY, CONTACT, NAV_LINKS } from "../site";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#0a0611]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl text-white">Sasha</p>
          <p className="mt-1 text-[0.6rem] uppercase tracking-widest2 text-white/40">
            {COMPANY.tagline}
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
            J'accompagne les entrepreneuses à faire exploser leur business sur les réseaux — du
            salariat à la liberté grâce au digital.
          </p>
        </div>

        <nav aria-label="Plan du site">
          <h2 className="eyebrow mb-5">Navigation</h2>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/60 transition-colors hover:text-orange-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-5">Contact</h2>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href={CONTACT.emailHref}
                className="flex items-start gap-3 text-white/60 transition-colors hover:text-orange-300"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-violet-300" />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.phoneHref}
                className="flex items-start gap-3 text-white/60 transition-colors hover:text-orange-300"
              >
                <Phone size={16} className="mt-0.5 shrink-0 text-violet-300" />
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/60">
              <MapPin size={16} className="mt-0.5 shrink-0 text-violet-300" />
              {COMPANY.adresse}
            </li>
          </ul>
        </div>
      </div>

      <div className="hairline" />

      <div className="container-x flex flex-col gap-4 py-7 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <p>
          © {YEAR} {COMPANY.name} — {COMPANY.formeJuridique} · SIREN {COMPANY.siren}
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 text-white/55 transition-colors hover:text-orange-300"
        >
          Démarrer mon projet
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </footer>
  );
}
