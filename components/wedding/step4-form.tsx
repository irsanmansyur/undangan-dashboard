import { Plus, Trash2 } from "lucide-react";
import { type Control, Controller, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormSchema } from "~/app/dashboard/wedding/[id]/edit/(ui)/step-4";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import RichTextEditor from "../ui/richeditor";

type UcapanPenutupProps = {
	control: Control<FormSchema>;
};
export function UcapanPenutup({ control }: UcapanPenutupProps) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">
				Closing Message (Ucapan Penutup)
			</h3>

			<div className="space-y-4">
				<FormField
					control={control}
					name="ucapanPenutup.title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Thank You" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Controller
					control={control}
					name="ucapanPenutup.desc"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<RichTextEditor value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}

type PaymentMethodProps = {
	control: Control<FormSchema>;
};
export function PaymentMethodsForm({ control }: PaymentMethodProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "paymentMethods",
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold">
					Payment Methods (Amplop Digital)
				</h3>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() =>
						append({ name: "", type: "bank", account: "", holder: "" })
					}
				>
					<Plus className="h-4 w-4" /> Add Payment
				</Button>
			</div>
			{fields.map((_method, index) => (
				<div
					key={`step4form${_method.id}${1}`}
					className="space-y-4 rounded-lg border p-4"
				>
					<div className="flex items-center justify-between">
						<h4 className="font-medium">Payment Method {index + 1}</h4>
						{index > 0 && (
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => remove(index)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						)}
					</div>
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={control}
							name={`paymentMethods.${index}.name`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Bank BCA" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name={`paymentMethods.${index}.type`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<FormControl>
										<Input placeholder="Bank Transfer, E-Wallet" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`paymentMethods.${index}.account`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Account Number</FormLabel>
									<FormControl>
										<Input placeholder="1234567890" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name={`paymentMethods.${index}.holder`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Account Holder</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
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

type VideoFormProps = {
	control: Control<FormSchema>;
};
export function VideoForm({ control }: VideoFormProps) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Video (Optional)</h3>
			<div className="space-y-4">
				<FormField
					control={control}
					name="video.url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Video URL</FormLabel>
							<FormControl>
								<Input placeholder="https://..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="video.title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Video Title</FormLabel>
							<FormControl>
								<Input placeholder="Our Pre-Wedding Video" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
