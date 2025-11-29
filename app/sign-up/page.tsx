"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			await signUp.email({
				email,
				password,
				firstName,
				lastName,
				name: username,
				callbackURL: "/sign-up",
				fetchOptions: {
					onResponse: () => {
						setLoading(false);
					},
					onRequest: () => {
						setLoading(true);
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
						console.log(ctx.error.message);
						setLoading(false);
					},
					onSuccess: async () => {
						router.push("/");
						setLoading(false);
					},
				},
			});
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Signup error:", error);
		}
	}

	return (
		<section className="w-full h-full flex justify-center items-center min-h-screen">
			<Card className="z-50 rounded-md rounded-t-none max-w-4xl ">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="first-name">First name</Label>
									<Input
										id="first-name"
										placeholder="Max"
										required
										onChange={(e) => {
											setFirstName(e.target.value);
										}}
										value={firstName}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="last-name">Last name</Label>
									<Input
										id="last-name"
										placeholder="Robinson"
										required
										onChange={(e) => {
											setLastName(e.target.value);
										}}
										value={lastName}
									/>
								</div>
							</div>
							{/* username */}
							<div className="grid gap-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									type="text"
									placeholder="username"
									required
									onChange={(e) => {
										setUsername(e.target.value);
									}}
									value={username}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									value={email}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete="new-password"
									placeholder="Password"
								/>
							</div>

							<Button type="submit" className="w-full mt-4" disabled={loading}>
								{loading ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									"Sign Up"
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
