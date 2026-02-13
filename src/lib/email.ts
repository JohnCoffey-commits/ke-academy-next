import nodemailer from "nodemailer";

// Email configuration from environment variables
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || "587", 10);
const EMAIL_SECURE = process.env.EMAIL_SECURE === "true";
const EMAIL_USER = "johnzpx@gmail.com" //process.env.EMAIL_USER;
const EMAIL_PASS = "xkwv qvwc awze wfsn" //process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;

// Recipient email - easily configurable
export const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || "johnzpx@gmail.com";

// Create reusable transporter
function createTransporter() {
    if (!EMAIL_USER || !EMAIL_PASS) {
        throw new Error("Email credentials not configured. Set EMAIL_USER and EMAIL_PASS environment variables.");
    }

    return nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_SECURE,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });
}

export type ContactFormData = {
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
    dialCode: string;
    campus?: string;
    course?: string;
    message?: string;
    timestamp: string;
};

function formatEmailBody(data: ContactFormData): string {
    const lines = [
        `New Get in Touch Form Submission`,
        `================================`,
        ``,
        `Submission Time: ${data.timestamp}`,
        ``,
        `CONTACT INFORMATION`,
        `--------------------`,
        `Full Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Phone: ${data.dialCode} ${data.phone}`,
        ``,
    ];

    if (data.campus || data.course) {
        lines.push(`INTEREST DETAILS`);
        lines.push(`----------------`);
        if (data.campus) lines.push(`Campus: ${data.campus}`);
        if (data.course) lines.push(`Course: ${data.course}`);
        lines.push(``);
    }

    if (data.message) {
        lines.push(`MESSAGE`);
        lines.push(`-------`);
        lines.push(data.message);
        lines.push(``);
    }

    lines.push(`================================`);
    lines.push(`This email was sent from the KE Academy website contact form.`);

    return lines.join("\n");
}

function formatEmailHtml(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a5f, #C92F6B); color: white; padding: 24px; border-radius: 12px 12px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
        .content { background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px; }
        .section { margin-bottom: 24px; }
        .section-title { font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .field { margin-bottom: 12px; }
        .field-label { font-weight: 600; color: #374151; display: inline; }
        .field-value { color: #111827; display: inline; }
        .message-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 8px; }
        .footer { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; }
        .timestamp { background: #f3f4f6; padding: 8px 12px; border-radius: 6px; font-size: 13px; color: #6b7280; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Someone has reached out through the KE Academy website</p>
        </div>
        <div class="content">
            <div class="timestamp">
                📅 Submitted on: <strong>${data.timestamp}</strong>
            </div>
            
            <div class="section">
                <div class="section-title">👤 Contact Information</div>
                <div class="field">
                    <span class="field-label">Full Name:</span>
                    <span class="field-value">${escapeHtml(data.fullName)}</span>
                </div>
                <div class="field">
                    <span class="field-label">Email:</span>
                    <span class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
                </div>
                <div class="field">
                    <span class="field-label">Phone:</span>
                    <span class="field-value">${escapeHtml(data.dialCode)} ${escapeHtml(data.phone)}</span>
                </div>
            </div>
            
            ${(data.campus || data.course) ? `
            <div class="section">
                <div class="section-title">🎓 Interest Details</div>
                ${data.campus ? `
                <div class="field">
                    <span class="field-label">Campus:</span>
                    <span class="field-value">${escapeHtml(data.campus)}</span>
                </div>
                ` : ""}
                ${data.course ? `
                <div class="field">
                    <span class="field-label">Course:</span>
                    <span class="field-value">${escapeHtml(data.course)}</span>
                </div>
                ` : ""}
            </div>
            ` : ""}
            
            ${data.message ? `
            <div class="section">
                <div class="section-title">💬 Message</div>
                <div class="message-box">${escapeHtml(data.message)}</div>
            </div>
            ` : ""}
            
            <div class="footer">
                This email was sent from the KE Academy website contact form.<br>
                You can reply directly to this email to respond to the sender.
            </div>
        </div>
    </div>
</body>
</html>
    `.trim();
}

function escapeHtml(text: string): string {
    const htmlEntities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    };
    return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"KE Academy Website" <${EMAIL_FROM}>`,
            to: CONTACT_RECIPIENT,
            replyTo: data.email,
            subject: `[KE Academy] New Get in Touch Submission (Test)`,
            text: formatEmailBody(data),
            html: formatEmailHtml(data),
        };

        await transporter.sendMail(mailOptions);

        return { success: true };
    } catch (error) {
        console.error("Failed to send contact email:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to send email",
        };
    }
}
