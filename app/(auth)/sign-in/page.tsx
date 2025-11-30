"use client";

import { Loader2 } from "lucide-react";
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
import { signIn } from "@/lib/auth/auth-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			await signIn.email(
				{
					email,
					password,
					callbackURL: "/",
				},
				{
					onRequest: (ctx) => {
						setLoading(true);
					},
					onResponse: (ctx) => {
						setLoading(false);
					},
				},
			);
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Signin error:", error);
		}
	}

	return (
		<section className="w-full h-full flex justify-center items-center min-h-screen">
			<Card className="w-96">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-4">
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
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>

								<Input
									id="password"
									type="password"
									placeholder="password"
									autoComplete="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<Button type="submit" className="w-full mt-4" disabled={loading}>
								{loading ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									<p> SignIn </p>
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
