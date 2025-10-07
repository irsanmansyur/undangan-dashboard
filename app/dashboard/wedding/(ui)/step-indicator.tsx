import { Check } from "lucide-react";
export const renderStepIndicator = (step: WEDDING.STEP) => {
	return (
		<div className="mb-8 flex items-center justify-center gap-2 sm:gap-4 ">
			{[1, 2, 3, 4].map((st) => (
				<div key={st} className="flex items-center">
					<div
						className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
							step === st
								? "border-primary bg-primary text-primary-foreground"
								: step > st
									? "border-primary bg-primary/10 text-primary"
									: "border-muted-foreground/30 text-muted-foreground"
						}`}
					>
						{step > st ? <Check className="h-5 w-5" /> : st}
					</div>
					{st < 4 && (
						<div
							className={`mx-2 h-0.5 w-3 sm:w-16 ${
								step > st ? "bg-primary" : "bg-muted-foreground/30"
							}`}
						/>
					)}
				</div>
			))}
		</div>
	);
};
