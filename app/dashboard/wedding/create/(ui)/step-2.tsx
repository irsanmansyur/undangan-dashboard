"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { useFetch } from "~/hooks/fetch-new";
import { WeddingCollection } from "~/types/wedding";
import { AppConfig } from "~/utils/configs/app";
import ImageCard from "./image-card";
import { FormSchemaInsert2, formSchemaInsert2 } from "./schema";
import { Checkbox } from "~/components/ui/checkbox";
import { jsonToFormData } from "~/lib/form";
import { useStoreCreateWedding } from "../store";
type Step2Props = {
	children?: React.ReactNode;
	wedding: WeddingCollection;
};

const Step2: React.FC<Step2Props> = ({ wedding }) => {
	const { step, setWedding } = useStoreCreateWedding();
	const [previewGroom, setPreviewGroom] = useState<string>(
		wedding?.mempelai?.groom
			? `${AppConfig.BackendUrl}/files/${wedding.mempelai?.groom.photoUrl}`
			: "/add.png",
	);
	const [previewBride, setPreviewBride] = useState<string>(
		wedding?.mempelai?.bride
			? `${AppConfig.BackendUrl}/files/${wedding.mempelai?.bride.photoUrl}`
			: "/add.png",
	);

	const { fetchData, loading } = useFetch<{ data: WEDDING.Collection }>();
	const form = useForm<FormSchemaInsert2>({
		resolver: zodResolver(formSchemaInsert2),
		defaultValues: {
			resepsiPria: !!wedding?.acara?.resepsiPria?.tanggal,
			resepsiWanita: !!wedding?.acara?.resepsiWanita?.tanggal,
			priaNamaLengkap: wedding?.mempelai?.groom.namaLengkap || "",
			priaAnakKe: wedding?.mempelai?.groom.anakKe || "",
			priaNamaAyah: wedding?.mempelai?.groom.namaAyah || "",
			priaNamaIbu: wedding?.mempelai?.groom.namaIbu || "",
			priaInstagram: wedding?.mempelai?.groom.instagram || "",

			wanitaNamaLengkap: wedding?.mempelai?.bride.namaLengkap || "",
			wanitaAnakKe: wedding?.mempelai?.bride.anakKe || "",
			wanitaNamaAyah: wedding?.mempelai?.bride.namaAyah || "",
			wanitaNamaIbu: wedding?.mempelai?.bride.namaIbu || "",
			wanitaInstagram: wedding?.mempelai?.bride.instagram || "",

			akadTanggal: wedding?.acara?.akadNikah.tanggal || "",
			akadWaktu: wedding?.acara?.akadNikah.waktu || "",
			akadAlamat: wedding?.acara?.akadNikah.alamat || "",
			akadTempat: wedding?.acara?.akadNikah.tempat || "",

			resepsiPriaTanggal: wedding?.acara?.resepsiPria?.tanggal || "",
			resepsiPriaWaktu: wedding?.acara?.resepsiPria?.waktu || "",
			resepsiPriaAlamat: wedding?.acara?.resepsiPria?.alamat || "",
			resepsiPriaTempat: wedding?.acara?.resepsiPria?.tempat || "",

			resepsiWanitaTanggal: wedding?.acara?.resepsiWanita?.tanggal || "",
			resepsiWanitaWaktu: wedding?.acara?.resepsiWanita?.waktu || "",
			resepsiWanitaAlamat: wedding?.acara?.resepsiWanita?.alamat || "",
			resepsiWanitaTempat: wedding?.acara?.resepsiWanita?.tempat || "",
		},
	});
	async function onSubmit(data: FormSchemaInsert2) {
		const formData = jsonToFormData(data);

		const resp = await fetchData(
			`${AppConfig.BackendUrl}/weddings/${wedding.id}/step-2`,
			{
				method: "PATCH",
				body: formData,
			},
		);
		if (resp) {
			setWedding({ step: 3, wedding: resp.data });
		}
	}
	console.log(form);
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Step 2: Complete Wedding Details</CardTitle>
					<CardDescription>
						Update bride & groom information and event details
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Groom (Mempelai Pria)</h3>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="priaPhoto"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Replace Photo (Optional)</FormLabel>
												<ImageCard imageUrl={previewGroom!} />
												<Input
													type="file"
													accept="image/*"
													onChange={(e) => {
														const file = e.target.files?.[0];
														field.onChange(file); // simpan ke react-hook-form
														if (file) {
															setPreviewGroom(URL.createObjectURL(file)); // buat preview
														}
													}}
												/>
											</FormItem>
										)}
									/>
									<div className="grid gap-2 grid-cols-2">
										<FormField
											control={form.control}
											name={`priaNamaLengkap`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Full Name{" "}
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="." {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`priaAnakKe`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Child Order
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="Anak ke 2" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-2 grid-cols-2">
										<FormField
											control={form.control}
											name={`priaNamaAyah`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Father's Name{" "}
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="." {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`priaNamaIbu`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Mother's Name
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="." {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">
									Bride (Mempelai Wanita)
								</h3>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="wanitaPhoto"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Replace Photo (Optional)</FormLabel>
												<ImageCard imageUrl={previewBride!} />
												<Input
													type="file"
													accept="image/*"
													onChange={(e) => {
														const file = e.target.files?.[0];
														field.onChange(file); // simpan ke react-hook-form
														if (file) {
															setPreviewBride(URL.createObjectURL(file)); // buat preview
														}
													}}
												/>
											</FormItem>
										)}
									/>
									<div className="grid gap-2 grid-cols-2">
										<FormField
											control={form.control}
											name={`wanitaNamaLengkap`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Full Name{" "}
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="." {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`wanitaAnakKe`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Child Order
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="Anak ke 2" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-2 grid-cols-2">
										<FormField
											control={form.control}
											name={`wanitaNamaAyah`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Father's Name{" "}
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="." {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`wanitaNamaIbu`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Mother's Name
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="." {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Akad Nikah</h3>
								<div className="space-y-4">
									<div className="grid gap-2 grid-cols-2">
										<FormField
											control={form.control}
											name={`akadTanggal`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Date <span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input
															type="date"
															placeholder="."
															{...field}
															required
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`akadWaktu`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Time <span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input type="time" {...field} required />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-2 grid-cols-2">
										<FormField
											control={form.control}
											name={`akadTempat`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Venue (Tempat){" "}
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="." {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`akadAlamat`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Address <span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input placeholder="." {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
							{/* Optional Resepsi Pria */}
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="resepsiPria"
									render={({ field }) => (
										<>
											<FormItem className="flex items-center gap-2">
												<FormControl>
													<Checkbox
														id="terms"
														checked={field.value == true}
														onCheckedChange={(checked) => {
															if (field.value == true) {
																form.setValue("resepsiPriaTanggal", undefined);
																form.setValue("resepsiPriaWaktu", undefined);
																form.setValue("resepsiPriaAlamat", undefined);
																form.setValue("resepsiPriaTempat", undefined);
															} else {
																form.setValue(
																	"resepsiPriaTanggal",
																	wedding.acara?.resepsiPria?.tanggal || "",
																);
																form.setValue(
																	"resepsiPriaWaktu",
																	wedding.acara?.resepsiPria?.waktu || "",
																);
																form.setValue(
																	"resepsiPriaAlamat",
																	wedding.acara?.resepsiPria?.alamat || "",
																);
																form.setValue(
																	"resepsiPriaTempat",
																	wedding.acara?.resepsiPria?.tempat || "",
																);
															}
															field.onChange(!field.value);
														}}
													/>
												</FormControl>
												<FormLabel htmlFor="terms">Resepsi Pria</FormLabel>
											</FormItem>
											{field.value == true && (
												<>
													<div className="grid gap-2 grid-cols-2">
														<FormField
															control={form.control}
															name={`resepsiPriaTanggal`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		Tanggal
																		<span className="text-destructive">*</span>
																	</FormLabel>
																	<FormControl>
																		<Input
																			type="date"
																			placeholder="."
																			{...field}
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name={`resepsiPriaWaktu`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		Waktu{" "}
																		<span className="text-destructive">*</span>
																	</FormLabel>
																	<FormControl>
																		<Input
																			type="time"
																			placeholder="."
																			{...field}
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</div>
													<div className="grid gap-2 grid-cols-2">
														<FormField
															control={form.control}
															name={`resepsiPriaTempat`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		Tempat{" "}
																		<span className="text-destructive">*</span>
																	</FormLabel>
																	<FormControl>
																		<Input placeholder="." {...field} />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name={`resepsiPriaAlamat`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		Alamat{" "}
																		<span className="text-destructive">*</span>
																	</FormLabel>
																	<FormControl>
																		<Input placeholder="." {...field} />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</div>
												</>
											)}
										</>
									)}
								/>
							</div>

							{/* Optional Resepsi Wanita */}
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="resepsiWanita"
									render={({ field }) => (
										<>
											<FormItem className="flex items-center gap-2">
												<FormControl>
													<Checkbox
														id="respisWanitaChecked"
														checked={field.value}
														onCheckedChange={(checked) => {
															if (field.value == true) {
																form.setValue(
																	"resepsiWanitaTanggal",
																	undefined,
																);
																form.setValue("resepsiWanitaWaktu", undefined);
																form.setValue("resepsiWanitaAlamat", undefined);
																form.setValue("resepsiWanitaTempat", undefined);
															} else {
																form.setValue(
																	"resepsiWanitaTanggal",
																	wedding.acara?.resepsiWanita?.tanggal || "",
																);
																form.setValue(
																	"resepsiWanitaWaktu",
																	wedding.acara?.resepsiWanita?.waktu || "",
																);
																form.setValue(
																	"resepsiWanitaAlamat",
																	wedding.acara?.resepsiWanita?.alamat || "",
																);
																form.setValue(
																	"resepsiWanitaTempat",
																	wedding.acara?.resepsiWanita?.tempat || "",
																);
															}
															field.onChange(!field.value);
														}}
													/>
												</FormControl>
												<FormLabel htmlFor="respisWanitaChecked">
													Resepsi Wanita
												</FormLabel>
											</FormItem>
											{field.value == true && (
												<>
													<div className="grid gap-2 grid-cols-2">
														<FormField
															control={form.control}
															name={`resepsiWanitaTanggal`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		Tanggal
																		<span className="text-destructive">*</span>
																	</FormLabel>
																	<FormControl>
																		<Input
																			type="date"
																			placeholder="."
																			{...field}
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name={`resepsiWanitaWaktu`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		Waktu{" "}
																		<span className="text-destructive">*</span>
																	</FormLabel>
																	<FormControl>
																		<Input
																			type="time"
																			placeholder="."
																			{...field}
																		/>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</div>
													<div className="grid gap-2 grid-cols-2">
														<FormField
															control={form.control}
															name={`resepsiWanitaTempat`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		Tempat{" "}
																		<span className="text-destructive">*</span>
																	</FormLabel>
																	<FormControl>
																		<Input placeholder="." {...field} />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name={`resepsiWanitaAlamat`}
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		Alamat{" "}
																		<span className="text-destructive">*</span>
																	</FormLabel>
																	<FormControl>
																		<Input placeholder="." {...field} />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</div>
												</>
											)}
										</>
									)}
								/>
							</div>
							<div className="flex justify-between">
								<Button
									type="button"
									variant="outline"
									onClick={() => setWedding({ step: 1 })}
									disabled={loading}
								>
									<ArrowLeft className="h-4 w-4" /> Back
								</Button>
								<Button type="submit" disabled={loading}>
									Next <ArrowRight className="h-4 w-4" />
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
};

export default Step2;
