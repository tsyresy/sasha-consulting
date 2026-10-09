import nodemailer from "nodemailer";

const GOOGLE_USERMAIL = process.env.GOOGLE_USERMAIL;
const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;
const GOOGLE_USER_DESTINATION = process.env.GOOGLE_USER_DESTINATION;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
const clean = (value, max = 2000) => String(value ?? "").trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Méthode non autorisée." });
  }

  if (!GOOGLE_USERMAIL || !GOOGLE_PASSWORD || !GOOGLE_USER_DESTINATION) {
    console.error("[contact-api] Variables d'environnement manquantes.");
    return res.status(500).json({ ok: false, error: "Configuration du serveur incomplète." });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 160) || "Nouvelle demande";
  const message = clean(body.message, 5000);

  const errors = {};
  if (!name) errors.name = "Merci d'indiquer ton nom.";
  if (!isEmail(email)) errors.email = "Merci d'indiquer un email valide.";
  if (message.length < 10) errors.message = "Décris ton projet en quelques mots.";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const html = `
    <div style="font-family:Georgia,serif;color:#1a1226;line-height:1.6">
      <h2 style="margin:0 0 18px">Nouvelle demande depuis le site SASHA</h2>
      <p style="margin:0 0 8px"><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
      <p style="margin:0 0 8px"><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px"><strong>Email :</strong> ${escapeHtml(email)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:18px 0" />
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GOOGLE_USERMAIL, pass: GOOGLE_PASSWORD },
    });

    await transporter.sendMail({
      from: `"Site SASHA" <${GOOGLE_USERMAIL}>`,
      to: GOOGLE_USER_DESTINATION,
      replyTo: `"${name}" <${email}>`,
      subject: `[SASHA] ${subject} — ${name}`,
      text: `Sujet : ${subject}\nNom : ${name}\nEmail : ${email}\n\n${message}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact-api] Erreur d'envoi :", err);
    return res.status(500).json({
      ok: false,
      error: "L'envoi a échoué. Réessaie ou écris-nous directement par email.",
    });
  }
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
