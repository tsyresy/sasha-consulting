import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Compass,
  Coins,
  MonitorSmartphone,
  Quote,
  Check,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem, WordsReveal } from "../components/Motion";
import Seo, { SITE_URL } from "../components/Seo";
import { CONTACT } from "../site";

const HOME_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que SASHA accompagne exactement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un accompagnement à 360° : positionnement et structuration d'offre, stratégie de contenu et acquisition sur les réseaux sociaux, puis pilotage financier (prix, marges, trésorerie, financement).",
      },
    },
    {
      "@type": "Question",
      name: "À qui s'adresse l'accompagnement SASHA ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aux entrepreneuses et futures entrepreneuses qui souhaitent structurer leur activité, développer leur visibilité sur les réseaux et passer du salariat à la liberté grâce au digital.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se déroule la méthode ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En quatre temps : diagnostic, stratégie, déploiement puis liberté. Un cadre qui s'adapte à l'activité, au rythme et aux objectifs de chacune.",
      },
    },
    {
      "@type": "Question",
      name: "SASHA a-t-elle une activité immobilière ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. SASHA est une Société civile immobilière (SCI) qui acquiert des terrains, les exploite et les met en valeur, y édifie des bâtiments et loue des biens immobiliers (code APE 6820B).",
      },
    },
  ],
  url: `${SITE_URL}/`,
};

const PILLARS = [
  {
    icon: Compass,
    title: "Clarté stratégique",
    text: "On pose un positionnement net, une offre lisible et un plan d'action qui tient sur une page.",
  },
  {
    icon: TrendingUp,
    title: "Croissance sur les réseaux",
    text: "Contenu, acquisition et tunnel de vente pensés pour convertir, pas juste pour publier.",
  },
  {
    icon: Coins,
    title: "Pilotage financier",
    text: "Prix, marges, trésorerie : je t'aide à financer ton activité et à décider avec des chiffres.",
  },
  {
    icon: MonitorSmartphone,
    title: "Liberté digitale",
    text: "Des systèmes simples et automatisés pour sortir du salariat sans sacrifier ta qualité de vie.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Diagnostic",
    text: "On clarifie où tu en es : offre, audience, chiffres, temps disponible. Sans jugement.",
  },
  {
    n: "02",
    title: "Stratégie",
    text: "On construit ta feuille de route : positionnement, offre irrésistible, plan de contenu.",
  },
  {
    n: "03",
    title: "Déploiement",
    text: "On exécute ensemble : création, acquisition, financement et suivi de tes indicateurs.",
  },
  {
    n: "04",
    title: "Liberté",
    text: "Ton business tourne, tes revenus se stabilisent, tu reprends la main sur ton temps.",
  },
];

const RESULTS = [
  { value: "1:1", label: "Accompagnement personnalisé" },
  { value: "360°", label: "Stratégie, digital & finance" },
  { value: "100%", label: "Pensé pour les entrepreneuses" },
];

const TESTIMONIALS = [
  {
    quote:
      "J'ai enfin structuré mon offre et mes prix. En trois mois, mon chiffre a doublé et je sais exactement quoi publier.",
    name: "Camille",
    role: "Coach bien-être, Paris",
  },
  {
    quote:
      "Le volet financier a tout changé : je sais ce que je gagne, ce que je peux me verser et où je vais.",
    name: "Inès",
    role: "Fondatrice e-commerce",
  },
  {
    quote:
      "Je suis passée du salariat à mon activité à plein temps. La méthode est claire et bienveillante.",
    name: "Sarah",
    role: "Graphiste indépendante",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduce ? 1 : 1.14]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, reduce ? 1 : 0.05]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", reduce ? "0%" : "-38%"]);

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const storyImgY = useTransform(storyProgress, [0, 1], ["-8%", reduce ? "-8%" : "8%"]);

  return (
    <>
      <Seo
        title="SASHA — Business consulting, financement & patrimoine immobilier"
        description="Sasha Libszia accompagne les entrepreneuses sur les réseaux : stratégie, digital et pilotage financier. SASHA gère aussi un patrimoine immobilier (SCI, APE 6820B)."
        path="/"
        jsonLd={HOME_LD}
      />

      {/* ─────────── HERO ─────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
      >
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 -z-10">
          <img
            src="/images/hero.png"
            alt="Sasha enregistrant du contenu dans son studio"
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0710]/85 via-[#0b0710]/80 to-[#0b0710]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0710] via-[#0b0710]/60 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, y: heroTextY }} className="container-x">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <Sparkles size={15} aria-hidden="true" />
            Du salariat à la liberté
          </motion.p>

          <h1 className="max-w-4xl text-[clamp(2.7rem,7.2vw,5.6rem)] text-white">
            <WordsReveal text="Fais exploser ton business" delay={0.15} />
            <br />
            <span className="text-gradient">
              <WordsReveal text="sur les réseaux." delay={0.45} />
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/65"
          >
            Je suis Sasha. J'accompagne les entrepreneuses à transformer leur expertise en une
            activité rentable et libre — grâce au digital, à une stratégie claire et à des finances
            maîtrisées.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-11 flex flex-col gap-4 sm:flex-row"
          >
            <Link to="/contact" className="btn-primary">
              Réserver un appel découverte
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/a-propos" className="btn-ghost">
              Découvrir mon parcours
            </Link>
          </motion.div>

          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            className="mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {RESULTS.map((r) => (
              <div key={r.label} className="border-l border-white/15 pl-5">
                <dt className="font-display text-3xl text-white">{r.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">
                  {r.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="text-[0.6rem] uppercase tracking-widest2 text-white/35">
            Faire défiler
          </span>
          <motion.span
            animate={reduce ? {} : { y: [0, 9, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="h-9 w-px bg-gradient-to-b from-violet-400 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─────────── MANIFESTE / PINNED STORY ─────────── */}
      <section ref={storyRef} className="relative py-28 md:py-40">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-6">Le déclic</p>
            <h2 className="text-[clamp(2rem,4.6vw,3.4rem)] text-white">
              Tu n'as pas besoin de travailler plus.
              <span className="block text-white/45">Tu as besoin d'un système qui travaille pour toi.</span>
            </h2>
            <div className="mt-8 space-y-5 text-white/65">
              <p>
                Beaucoup d'entrepreneuses publient tous les jours, s'épuisent, et attendent encore
                le déclic. Le problème n'est presque jamais l'effort : c'est le positionnement,
                l'offre et le pilotage.
              </p>
              <p>
                Mon rôle : remettre de la clarté, structurer ton digital, sécuriser tes chiffres —
                pour que ta croissance devienne prévisible.
              </p>
            </div>
            <ul className="mt-9 space-y-3">
              {[
                "Une stratégie adaptée à ta vie, pas l'inverse",
                "Des offres qui se vendent sur les réseaux",
                "Des finances pilotées pour décider sereinement",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/75">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-600/25 text-violet-200">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="overflow-hidden rounded-[28px] border border-white/10">
              <motion.img
                style={{ y: storyImgY, scale: 1.16 }}
                src="/images/accompagnement.png"
                alt="Sasha animant une masterclass auprès d'un groupe d'entrepreneuses"
                loading="lazy"
                className="h-[440px] w-full object-cover md:h-[560px]"
              />
            </div>
            <div className="glass absolute -bottom-7 -left-4 max-w-[240px] rounded-2xl p-5 md:-left-10">
              <Users size={18} className="text-orange-300" aria-hidden="true" />
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Un accompagnement pensé <strong className="text-white">par une femme</strong>, pour
                des femmes qui entreprennent.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── PILIERS ─────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-5">Ce que je t'apporte</p>
            <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] text-white">
              Quatre piliers pour passer de l'idée aux revenus.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <RevealItem
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-violet-400/40 hover:bg-white/[0.06]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600/30 to-orange-500/20 text-violet-200 transition-colors duration-300 group-hover:text-orange-200">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
                <span className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-600/0 blur-3xl transition-all duration-500 group-hover:bg-violet-600/30" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─────────── MÉTHODE ─────────── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-5">La méthode</p>
            <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] text-white">
              Un chemin balisé, en quatre temps.
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              Pas de recette magique : un cadre qui s'adapte à ton activité, ton rythme et tes
              objectifs.
            </p>
            <Link to="/contact" className="btn-ghost mt-9">
              Planifier mon accompagnement
            </Link>
          </Reveal>

          <RevealGroup className="relative" delay={0.1}>
            <div
              aria-hidden="true"
              className="absolute left-[27px] top-3 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-violet-500/70 via-orange-400/40 to-transparent"
            />
            {STEPS.map((step) => (
              <RevealItem key={step.n} className="relative pb-12 pl-20 last:pb-0">
                <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-[#150c22] font-display text-lg text-orange-200">
                  {step.n}
                </span>
                <h3 className="text-2xl text-white">{step.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-white/60">{step.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─────────── IMMOBILIER ─────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="overflow-hidden rounded-[32px] border border-white/10">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[340px] lg:min-h-full">
                <img
                  src="/images/consulting.png"
                  alt="Sasha présentant un projet immobilier : plan de résidence et maquette du bâtiment"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0710] via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="bg-[#150c22] p-9 md:p-14">
                <p className="eyebrow mb-6">Patrimoine immobilier</p>
                <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)] text-white">
                  De la pierre, un patrimoine, une transmission.
                </h2>
                <p className="mt-6 leading-relaxed text-white/60">
                  SASHA est aussi une société immobilière. Nous acquérons des terrains, les
                  exploitons et les valorisons, puis éditions les bâtiments qui y prennent place.
                  Une activité patrimoniale pensée dans la durée, en complément du conseil aux
                  entrepreneuses.
                </p>
                <div className="mt-9 grid gap-5 sm:grid-cols-2">
                  {[
                    "Acquisition de terrains",
                    "Exploitation & mise en valeur",
                    "Édification de bâtiments",
                    "Location de biens immobiliers",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-white/75">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-8 border-l border-white/15 pl-5 text-sm leading-relaxed text-white/50">
                  Activité immobilière exercée dans le cadre de la SCI SASHA — code APE{" "}
                  <span className="text-white/75">6820B</span> (location de terrains et d'autres
                  biens immobiliers).
                </p>
                <Link to="/a-propos" className="btn-primary mt-11">
                  Voir les informations légales
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── CONSULTING / FINANCE ─────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow mb-6">Business consulting & financement</p>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)] text-white">
              La base de mon activité : remettre de la structure, et des chiffres.
            </h2>
            <p className="mt-6 leading-relaxed text-white/60">
              Conseil en stratégie, structuration d'offre, acquisition digitale et pilotage
              financier. Un accompagnement à 360° pour que ta croissance soit aussi solide qu'elle
              est visible.
            </p>
            <Link to="/contact" className="btn-primary mt-10">
              Réserver un appel découverte
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>

          <RevealGroup className="grid gap-5 sm:grid-cols-2" delay={0.1}>
            {[
              {
                title: "Positionnement & offre",
                text: "Un message clair et une offre que ton audience comprend immédiatement.",
              },
              {
                title: "Stratégie de contenu",
                text: "Un plan de publication qui construit ton autorité et génère des demandes.",
              },
              {
                title: "Modèle économique & prix",
                text: "Des tarifs alignés sur la valeur délivrée et sur tes objectifs de revenus.",
              },
              {
                title: "Financement & trésorerie",
                text: "Un pilotage simple pour décider sereinement et sécuriser ta croissance.",
              },
            ].map((card) => (
              <RevealItem
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-violet-400/40"
              >
                <h3 className="text-lg text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{card.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─────────── TÉMOIGNAGES ─────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5">Elles en parlent</p>
            <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] text-white">
              Des entrepreneuses qui ont repris la main.
            </h2>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3" delay={0.1}>
            {TESTIMONIALS.map((t) => (
              <RevealItem
                key={t.name}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-orange-400/30"
              >
                <Quote size={22} className="text-violet-300" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 font-serif text-lg italic leading-relaxed text-white/80">
                  « {t.quote} »
                </blockquote>
                <footer className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-white">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/40">{t.role}</p>
                </footer>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─────────── CTA FINAL ─────────── */}
      <section className="pb-8 pt-16">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-violet-800/40 via-[#150c22] to-orange-700/25 px-8 py-20 text-center md:px-16">
            <div
              aria-hidden="true"
              className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-orange-500/20 blur-[100px]"
            />
            <div className="relative">
              <p className="eyebrow mb-6">Prête à passer à l'action ?</p>
              <h2 className="mx-auto max-w-3xl text-[clamp(2rem,5vw,3.6rem)] text-white">
                Ton business mérite une stratégie à la hauteur de ton ambition.
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-white/65">
                Réserve un appel découverte gratuit et repartons avec un premier plan d'action
                concret.
              </p>
              <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/contact" className="btn-primary">
                  Réserver mon appel
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href={CONTACT.phoneHref} className="btn-ghost">
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
