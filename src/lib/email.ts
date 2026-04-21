import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendContactNotification({
  name,
  email,
  message,
}: ContactEmailPayload): Promise<void> {
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.RESEND_TO;

  if (!to) {
    console.warn("RESEND_TO not set — skipping email notification");
    return;
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `New contact message from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #22C55E;">New Portfolio Message</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <hr style="border-color: #334155;" />
        <p style="white-space: pre-wrap;">${message}</p>
        <hr style="border-color: #334155;" />
        <p style="color: #94A3B8; font-size: 12px;">
          Sent from your portfolio contact form. Reply directly to ${email}.
        </p>
      </div>
    `,
    replyTo: email,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Failed to send email notification");
  }
}
