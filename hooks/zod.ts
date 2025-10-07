import { useState, useCallback } from "react";
import { z, ZodType } from "zod";

export function useZodForm<T extends ZodType<any, any>>(
	schema: T,
	defaultValues: z.infer<T>,
) {
	const [fields, setFields] = useState<z.infer<T>>(defaultValues);

	// error jadi record<string, string[]>
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	const setField = useCallback(
		<K extends keyof z.infer<T>>(key: K, value: z.infer<T>[K]) => {
			setFields((prev) => ({
				...prev,
				[key]: value,
			}));
		},
		[],
	);

	const validate = useCallback(() => {
		const result = schema.safeParse(fields);
		if (!result.success) {
			const newErrors: Record<string, string[]> = {};

			result.error.issues.forEach((err) => {
				const pathKey = err.path.join(".");
				if (!newErrors[pathKey]) {
					newErrors[pathKey] = [];
				}
				newErrors[pathKey].push(err.message);
			});

			setErrors(newErrors);
			return false;
		} else {
			setErrors({});
			return true;
		}
	}, [fields, schema]);

	return {
		fields,
		setFields,
		setField,
		errors,
		validate,
	};
}
