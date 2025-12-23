import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

export default function ResetPasswordEmail({ url }: { url: string }) {
	return (
		<Html lang="en" dir="ltr">
			<Head>
				<title>Reset your password</title>
			</Head>
			<Preview>Reset your password</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>Reset your password</Heading>
					<Text style={paragraph}>
						We received a request to reset the password for your account. Click
						the button below to choose a new password.
					</Text>
					<Section style={btnContainer}>
						<Link style={button} href={url}>
							Reset password
						</Link>
					</Section>
					<Text style={paragraph}>Or copy this link: {url}</Text>
					<Text style={paragraph}>
						If you didn&apos;t request this, you can safely ignore this email.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

// Email styling
const main = {
	backgroundColor: "#f6f9fc",
	fontFamily: "Arial, sans-serif",
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px",
	borderRadius: "8px",
	maxWidth: "600px",
};

const h1 = {
	color: "#333",
	fontSize: "24px",
	fontWeight: "bold",
};

const paragraph = {
	color: "#555",
	fontSize: "16px",
	lineHeight: "24px",
};

const btnContainer = {
	textAlign: "left" as const,
	margin: "20px 0",
};

const button = {
	backgroundColor: "#0f172a",
	borderRadius: "5px",
	color: "#fff",
	fontSize: "16px",
	fontWeight: "bold",
	textDecoration: "none",
	textAlign: "center" as const,
	padding: "12px 30px",
	display: "inline-block",
};
