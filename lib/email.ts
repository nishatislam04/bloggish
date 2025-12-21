import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, url: string) {
	try {
		const { data, error } = await resend.emails.send({
			from: "Your App <onboarding@resend.dev>", // Change this to your verified domain
			to: [to],
			subject: "Verify your email address",
			html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #0070f3;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Verify Your Email Address</h1>
            <p>Thanks for signing up! Please verify your email address by clicking the button below:</p>
            <p>
              <a href="${url}" class="button">Verify Email Address</a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p><code>${url}</code></p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
          </div>
        </body>
        </html>
      `,
			text: `Click the link to verify your email: ${url}`,
		});

		if (error) {
			console.error("Error sending verification email:", error);
			throw error;
		}

		console.log("Verification email sent:", data?.id);
		return data;
	} catch (error) {
		console.error("Failed to send verification email:", error);
		throw error;
	}
}
