export interface Template {
	id: string;
	templateName: string;
	sound: string;
	thumbnail: string;
	status: "active" | "inactive";
	createdAt: string;
	updatedAt: string;
}

export interface TemplateResponse {
	data: Template[];
}
