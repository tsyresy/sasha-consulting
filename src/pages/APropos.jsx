import { Link } from "react-router-dom";
import { ArrowRight, Award, Heart, Sparkles, ShieldCheck, Mail, Phone } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, WordsReveal } from "../components/Motion";
import { COMPANY, CONTACT } from "../site";

const VALUES = [
  {
    icon: Heart,
    title: "Féminin & bienveillant",
    text: "Un accompagnement exigeant mais sans jugement, pensé pour la réalité des entrepreneuses.",
  },
  {
    icon: Sparkles,
    title: "Clarté avant action",
    text: "On avance vite, mais jamais au hasard : chaque décision est comprise et assumée.",
  },
  {
    icon: ShieldCheck,
    title: "Rigueur financière",
    text: "Un business solide se pilote avec des chiffres. C'est le socle de la liberté.",
  },
];

const TIMELINE = [
  {
    year: "2021",
    title: "Création de SASHA",
    text: "Immatriculation de l'entreprise au Registre national des entreprises et début d'activité.",
  },
  {
    year: "Aujourd'hui",
    title: "Business consulting & financement",
    text: "Accompagnement d'entrepreneuses : stratégie, développement digital et pilotage financier.",
  },
  {
    year: "Demain",
    title: "Du salariat à la liberté",
    text: "Aider toujours plus de femmes à faire de leur expertise une activité libre et rentable.",
  },
];

const FORMAL = [
  ["Dénomination", COMPANY.name],
  ["SIREN (siège)", COMPANY.siren],
  ["SIRET", COMPANY.siret],
  ["Forme juridique", COMPANY.formeJuridique],
  ["Capital social", COMPANY.capitalSocial],
  ["Code APE", COMPANY.codeApe],
  ["Date d'immatriculation au RNE", COMPANY.dateImmatriculation],
  ["Début d'activité", COMPANY.debutActivite],
  ["Adresse du siège", COMPANY.adresse],
];

export default function APropos() {
  return (
    <>
      {/* ─────────── HEADER ─────────── */}
      <section className="pt-40 pb-20 md:pt-48">
        <div className="container-x">
          <p className="eyebrow mb-6">À propos</p>
          <h1 className="max-w-4xl text-[clamp(2.4rem,6vw,4.4rem)] text-white">
            <WordsReveal text="Sasha, l'humaine derrière SASHA." />
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            Je m'appelle Sasha Libszia. J'aide les entrepreneuses à faire exploser leur business sur
            les réseaux — et à passer du salariat à la liberté grâce au digital.
          </p>
        </div>
      </section>

      {/* ─────────── PORTRAIT + INTRO ─────────── */}
      <section className="pb-24 md:pb-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-800/30 to-orange-700/15">
              <img
                src="/images/profil.png"
                alt="Portrait de Sasha Libszia, fondatrice de SASHA"
                loading="lazy"
                className="h-[520px] w-full object-cover object-top md:h-[620px]"
              />
            </div>
            <div className="glass absolute -right-4 bottom-8 max-w-[210px] rounded-2xl p-5 md:-right-8">
              <Award size={18} className="text-orange-300" aria-hidden="true" />
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                <strong className="text-white">Business consulting</strong> & financement —
                la base de l'activité SASHA.
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow mb-5">Mon parcours</p>
              <h2 className="text-[clamp(1.9rem,4.2vw,3rem)] text-white">
                De l'envie de liberté à un business structuré.
              </h2>
            </Reveal>
            <div className="mt-8 space-y-5 text-white/65">
              <p>
                J'ai vu trop d'entrepreneuses talentueuses rester bloquées : une offre floue, une
                présence digitale qui ne convertit pas, des finances subies plutôt que pilotées. Ce
                n'est pas un manque de travail — c'est un manque de structure.
              </p>
              <p>
                SASHA, c'est l'envie de rendre cette structure accessible. On clarifie ton
                positionnement, on construit des offres qui se vendent sur les réseaux, et on met en
                place un pilotage financier simple pour décider avec confiance.
              </p>
              <p>
                Mon objectif est simple : que ton activité devienne un véritable levier de liberté,
                pas une source d'épuisement.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Travailler avec moi
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a href={CONTACT.phoneHref} className="btn-ghost">
                <Phone size={16} aria-hidden="true" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── VALEURS ─────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">Mes valeurs</p>
            <h2 className="text-[clamp(1.9rem,4.2vw,3rem)] text-white">
              Ce qui guide chaque accompagnement.
            </h2>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <RevealItem
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-violet-400/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600/30 to-orange-500/20 text-violet-200">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─────────── TIMELINE ─────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">Repères</p>
            <h2 className="text-[clamp(1.9rem,4.2vw,3rem)] text-white">Une histoire qui s'écrit.</h2>
          </Reveal>

          <RevealGroup className="relative mt-16" delay={0.1}>
            <div
              aria-hidden="true"
              className="absolute left-0 top-2 hidden h-px w-full bg-gradient-to-r from-violet-500/60 via-orange-400/40 to-transparent md:block"
            />
            <div className="grid gap-12 md:grid-cols-3">
              {TIMELINE.map((item) => (
                <RevealItem key={item.year} className="relative md:pt-12">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[3px] hidden h-2.5 w-2.5 rounded-full bg-orange-400 md:block"
                  />
                  <p className="font-display text-4xl text-gradient">{item.year}</p>
                  <h3 className="mt-4 text-xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.text}</p>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ─────────── INFORMATIONS LÉGALES PUBLIQUES ─────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">Informations publiques</p>
            <h2 className="text-[clamp(1.9rem,4.2vw,3rem)] text-white">
              Une entreprise en règle, une activité transparente.
            </h2>
            <p className="mt-6 text-white/60">
              Informations d'immatriculation au Registre national des entreprises (source : INPI).
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <dl className="grid md:grid-cols-2">
                {FORMAL.map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex flex-col gap-1 border-white/10 p-6 md:p-7 ${
                      i % 2 === 0 ? "md:border-r" : ""
                    } border-b`}
                  >
                    <dt className="text-xs uppercase tracking-[0.14em] text-white/40">{label}</dt>
                    <dd className="text-white/85">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg text-white">Gérance</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {COMPANY.gerant} — Gérant et associé indéfiniment responsable.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="text-lg text-white">Associée</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {COMPANY.associee} — Associée indéfiniment responsable.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="pb-8 pt-10">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-violet-800/40 via-[#150c22] to-orange-700/25 px-8 py-16 text-center md:px-16">
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-[clamp(1.8rem,4.4vw,3rem)] text-white">
                On construit ton plan d'action ?
              </h2>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/contact" className="btn-primary">
                  Me contacter
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href={CONTACT.emailHref} className="btn-ghost">
                  <Mail size={16} aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
