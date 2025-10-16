export function jsonToFormData(
	obj: Record<string, File | Blob | string | number | boolean>,
	form?: FormData,
	parentKey?: string,
): FormData {
	const formData = form || new FormData();

	Object.entries(obj).forEach(([key, value]) => {
		const fullKey = parentKey ? `${parentKey}[${key}]` : key;

		if (value instanceof File || value instanceof Blob) {
			formData.append(fullKey, value);
		} else if (Array.isArray(value)) {
			value.forEach((v, i) => {
				jsonToFormData({ [i]: v }, formData, fullKey);
			});
		} else if (value !== null && typeof value === "object") {
			jsonToFormData(value, formData, fullKey);
		} else if (value !== undefined && value !== null) {
			formData.append(fullKey, String(value));
		}
	});

	return formData;
}
