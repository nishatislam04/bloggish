import {
	Body,
	Container,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

export function VerificationEmail({ url }: { url: string }) {
	return (
		<Html>
			<Preview>Verify your email address</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>Verify Your Email</Heading>
					<Text style={paragraph}>
						Thanks for signing up! Please verify your email address by clicking
						the button below.
					</Text>
					<Section style={btnContainer}>
						<Link style={button} href={url}>
							Verify Email Address
						</Link>
					</Section>
					<Text style={paragraph}>
						If you didn't create an account, you can safely ignore this email.
					</Text>
					<Text style={paragraph}>Or copy this link: {url}</Text>
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
	textAlign: "center" as const,
	margin: "20px 0",
};

const button = {
	backgroundColor: "#0070f3",
	borderRadius: "5px",
	color: "#fff",
	fontSize: "16px",
	fontWeight: "bold",
	textDecoration: "none",
	textAlign: "center" as const,
	padding: "12px 30px",
	display: "inline-block",
};
