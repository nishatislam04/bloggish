import { Loader2 } from "lucide-react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface FormSubmitButtonProps<TFieldValues extends FieldValues> {
	form: UseFormReturn<TFieldValues>;
	label: string;
}

export function FormSubmitButton<TFieldValues extends FieldValues>({
	form,
	label,
}: FormSubmitButtonProps<TFieldValues>) {
	const isLoading = form.formState.isSubmitting;

	return (
		<Button type="submit" className="w-full mt-4" disabled={isLoading}>
			{isLoading ? <Loader2 size={16} className="animate-spin" /> : label}
		</Button>
	);
}
