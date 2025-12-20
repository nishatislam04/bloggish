import {
	Controller,
	type FieldValues,
	type Path,
	type UseFormReturn,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface FormInputProps<TFieldValues extends FieldValues = FieldValues> {
	form: UseFormReturn<TFieldValues>;
	name: Path<TFieldValues>;
	label?: string;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	autoComplete?: string;
}

export default function FormInput<TFieldValues extends FieldValues>({
	form,
	name,
	label = "",
	type = "text",
	placeholder = "",
	required = false,
	disabled = false,
	autoComplete,
}: FormInputProps<TFieldValues>) {
	return (
		<Controller
			name={name}
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					{label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
					<Input
						{...field}
						id={name}
						type={type}
						placeholder={placeholder}
						required={required}
						disabled={disabled}
						aria-invalid={fieldState.invalid}
						autoComplete={autoComplete}
					/>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
