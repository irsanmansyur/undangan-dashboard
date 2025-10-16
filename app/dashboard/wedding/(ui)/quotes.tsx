import { Plus, Trash2 } from "lucide-react";
import { type Control, useFieldArray } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { FormSchema } from "../[id]/edit/(ui)/step-4";

type QuotesProps = {
	control: Control<FormSchema>;
};

export function Quotes({ control }: QuotesProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "quotes",
	});

	// hapus quote by index
	const removeQuote = (index: number) => {
		remove(index);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold">Quotes</h3>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() =>
						append({ title: "", defaultText: "", otherText: "", source: "" })
					}
				>
					<Plus className="h-4 w-4" /> Add Quote
				</Button>
			</div>

			{fields.map((_quote, index) => (
				<div key={_quote.id} className="space-y-4 rounded-lg border p-4">
					<div className="flex items-center justify-between">
						<h4 className="font-medium">Quote {index + 1}</h4>
						{index > 0 && (
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => removeQuote(index)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						)}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={control}
							name={`quotes.${index}.title`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Love Quote" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`quotes.${index}.source`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Source</FormLabel>
									<FormControl>
										<Input placeholder="QS. Ar-Rum: 21" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`quotes.${index}.defaultText`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Default Text (English/Indonesian)</FormLabel>
									<FormControl>
										<Input
											placeholder="And of His signs is that..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`quotes.${index}.otherText`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Other Text (Arabic/Original)</FormLabel>
									<FormControl>
										<Input placeholder="وَمِنْ آيَاتِهِ..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
