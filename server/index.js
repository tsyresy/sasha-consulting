import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 3001;
const GOOGLE_USERMAIL = process.env.GOOGLE_USERMAIL;
const GOOGLE_PASSWORD = process.env.GOOGLE_PASSWORD;
const GOOGLE_USER_DESTINATION = process.env.GOOGLE_USER_DESTINATION;

if (!GOOGLE_USERMAIL || !GOOGLE_PASSWORD || !GOOGLE_USER_DESTINATION) {
  console.error(
    "[contact-api] Variables manquantes dans .env : GOOGLE_USERMAIL, GOOGLE_PASSWORD, GOOGLE_USER_DESTINATION"
  );
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: GOOGLE_USERMAIL, pass: GOOGLE_PASSWORD },
});

transporter.verify().then(
  () => console.log("[contact-api] Connexion SMTP Gmail OK"),
  (err) => console.error("[contact-api] Échec SMTP Gmail :", err.message)
);

const app = express();
app.use(cors());
app.use(express.json({ limit: "100kb" }));

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

const clean = (value, max = 2000) => String(value ?? "").trim().slice(0, max);

app.post("/api/contact", async (req, res) => {
  try {
    const name = clean(req.body?.name, 120);
    const email = clean(req.body?.email, 200);
    const subject = clean(req.body?.subject, 160) || "Nouvelle demande";
    const message = clean(req.body?.message, 5000);

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

    await transporter.sendMail({
      from: `"Site SASHA" <${GOOGLE_USERMAIL}>`,
      to: GOOGLE_USER_DESTINATION,
      replyTo: `"${name}" <${email}>`,
      subject: `[SASHA] ${subject} — ${name}`,
      text: `Sujet : ${subject}\nNom : ${name}\nEmail : ${email}\n\n${message}`,
      html,
    });

    console.log(`[contact-api] Email envoyé à ${GOOGLE_USER_DESTINATION} (${email})`);
    res.json({ ok: true });
  } catch (err) {
    console.error("[contact-api] Erreur d'envoi :", err);
    res.status(500).json({
      ok: false,
      error: "L'envoi a échoué. Réessaie ou écris-nous directement par email.",
    });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Sert le site compilé (Vite) en production / Docker — SPA fallback sur index.html
const distDir = path.resolve(__dirname, "../dist");
app.use(express.static(distDir, { index: false }));
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(PORT, () => console.log(`[contact-api] En écoute sur http://localhost:${PORT}`));
