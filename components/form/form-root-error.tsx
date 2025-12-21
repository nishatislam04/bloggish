import type { FieldValues, UseFormReturn } from "react-hook-form";
import { FieldError } from "@/components/ui/field";

interface FormErrorProps<TFieldValues extends FieldValues = FieldValues> {
	form: UseFormReturn<TFieldValues>;
	className?: string;
	/**
	 * If true, shows only root errors
	 */
	rootOnly?: boolean;
}

export function FormRootError<TFieldValues extends FieldValues>({
	form,
	className,
	rootOnly = true,
}: FormErrorProps<TFieldValues>) {
	const { errors } = form.formState;

	// If showing only root errors
	if (rootOnly) {
		if (!errors.root) return null;

		return (
			<div className={className}>
				<FieldError errors={[errors.root]} />
			</div>
		);
	}
}
