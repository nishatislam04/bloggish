import { ArrowRight, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailNotifyPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
			<div className="w-full max-w-md space-y-3">
				{/* Logo/Brand */}
				<div className="text-center">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
						<Mail className="h-8 w-8 text-primary-foreground" />
					</div>
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Check Your Email
					</h1>
				</div>

				<Card className="border-0 shadow-lg">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl text-center">
							Verify your email address
						</CardTitle>
						<CardDescription className="text-center">
							We've sent a verification link to your email
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Main Content */}
						<div className="space-y-8">
							<div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
								<Mail className="h-5 w-5 text-blue-600 mt-0.5" />
								<div>
									<p className="text-sm font-medium text-blue-900">
										Email sent successfully
									</p>
									<p className="text-sm text-blue-700 mt-1">
										Please check your inbox (and spam folder) for a verification
										link.
									</p>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="space-y-3 pt-4">
							<Button className="w-full" size="lg" asChild>
								<Link href="https://mail.google.com" target="_blank">
									<Mail className="mr-2 h-4 w-4" />
									Open Gmail
								</Link>
							</Button>

							<div className="text-center pt-4 border-t">
								<p className="text-sm text-gray-500">
									Already verified your email?
								</p>
								<Button variant="link" className="text-primary" asChild>
									<Link href="/">
										Go to Homepage
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Help Section */}
				<Card className="border-0 shadow-sm">
					<CardContent className="p-4">
						<h3 className="font-semibold text-sm mb-2">Need help?</h3>
						<ul className="text-sm text-gray-600 space-y-1">
							<li className="flex items-start">
								<span className="inline-block w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5 mr-2"></span>
								Check your spam or junk folder
							</li>
							<li className="flex items-start">
								<span className="inline-block w-1.5 h-1.5 bg-gray-300 rounded-full mt-1.5 mr-2"></span>
								Make sure you entered the correct email address
							</li>
						</ul>
					</CardContent>
				</Card>

				<div className="text-center">
					<p className="text-xs text-gray-500">
						You need to manually sign in again after verifying your email
						address
					</p>
				</div>
			</div>
		</div>
	);
}
