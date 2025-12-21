"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import FormInput from "@/components/form/form-input";
import { FormRootError } from "@/components/form/form-root-error";
import { FormSubmitButton } from "@/components/form/form-submit-button";
import { Button } from "@/components/ui/button";
import {
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { signUp } from "@/lib/auth/auth-client";

const signUpFormSchema = z.object({
	firstName: z
		.string()
		.min(1, "Please provide a valid name")
		.max(12, "Your First Name can not be grater than 12 characters")
		.transform((val) => val.trim()),
	lastName: z
		.string()
		.min(1, "Please provide a valid last name")
		.max(12, "Your Last Name can not grater than 12 characters")
		.transform((val) => val.trim()),
	username: z
		.string()
		.min(1, "Please provide a valid username")
		.min(4, "Your username need to be at least 4 characters")
		.max(32, "Your username can not be grater than 32 characters")
		.transform((val) => val.trim()),
	email: z
		.email("Please provide a valid email address")
		.min(1, "Email address is required")
		.transform((val) => val.trim()),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password need to be atleast 8 characters")
		.max(48, "Password can not be grater than 48 characters")
		.transform((val) => val.trim()),
});

export default function SignUp() {
	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		mode: "onChange",
		defaultValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
		},
	});

	const router = useRouter();

	async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
		const { firstName, lastName, username, email, password } = data;

		try {
			const { error } = await signUp.email({
				email,
				password,
				firstName,
				lastName,
				name: username,
				fetchOptions: {
					onError: (ctx) => {
						toast.error("something went wrong when trying to signup");
						console.log("sign up error: ", ctx.error.message);
					},
					onSuccess: async () => {
						router.push("/");
					},
				},
			});

			if (error) {
				form.setError("root", {
					type: "server-error",
					message: error?.message,
				});
			} else toast.success("sign up success");
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error("Signup error:", error);

			form.setError("root", {
				type: "server-error",
				message: "An unexpected error occurred. Please try again.",
			});
		}
	}

	return (
		<section className="w-full h-full flex justify-center items-center min-h-screen">
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldSet className="w-120">
					<FieldLegend className="text-lg md:text-xl mb-6">
						Sign Up
						<FieldDescription className="text-xs md:text-sm">
							Enter your information to create an account
						</FieldDescription>
					</FieldLegend>
					<FieldGroup>
						<div className="grid gap-4">
							<FieldGroup className="grid grid-cols-2 gap-4">
								<FormInput
									form={form}
									name="firstName"
									label="First Name"
									required={true}
									placeholder="Enter first name"
								/>

								<FormInput
									form={form}
									name="lastName"
									label="Last Name"
									required={true}
									placeholder="Enter your last name"
								/>
							</FieldGroup>
							<FormInput
								form={form}
								name="username"
								label="Username"
								placeholder="Enter your username"
								required={true}
								autoComplete="username"
							/>

							<FormInput
								form={form}
								name="email"
								label="Email"
								placeholder="Enter your email address"
								required={true}
								type="email"
								autoComplete="email"
							/>

							<FormInput
								form={form}
								name="password"
								label="Password"
								type="password"
								autoComplete="password"
								required={true}
							/>

							<FormRootError form={form} />

							<FormSubmitButton form={form} label="Sign up" />
						</div>
					</FieldGroup>
				</FieldSet>
			</form>
		</section>
	);
}
