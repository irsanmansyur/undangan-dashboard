import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area"; // penting buat responsif scroll
import { useAudioPlayer } from "~/hooks/audio";
import { AppConfig } from "~/utils/configs/app";

type AudioPickerProps = {
	audios: FILE.AUDIO[];
	loading?: boolean;
	value?: string; // id selected
	onChange: (value: string) => void;
};

export function AudioPicker({
	audios,
	loading,
	value,
	onChange,
}: AudioPickerProps) {
	const [preview, setPreview] = useState<string>();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="button" variant="outline" className="w-full sm:w-auto">
					{value ? `Change audio` : "Select audio"}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg w-[95vw]">
				<DialogHeader>
					<DialogTitle>Pilih Background Music</DialogTitle>
				</DialogHeader>

				{loading ? (
					<div className="flex items-center justify-center py-6">
						<Loader2 className="h-6 w-6 animate-spin" />
					</div>
				) : (
					<ScrollArea className="max-h-[300px] w-full rounded-md border p-2">
						<RadioGroup
							value={value}
							onValueChange={(val) => {
								onChange(val);
								setPreview(
									audios.find((a) => a.id === val)?.filename || undefined,
								);
							}}
							className="space-y-3"
						>
							{audios.map((audio) => (
								<div
									key={audio.id}
									className="flex items-center justify-between rounded-lg border p-3"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value={audio.id} id={audio.id} />
										<Label
											htmlFor={audio.id}
											className="truncate max-w-[180px] sm:max-w-[250px]"
										>
											{audio.filename}
										</Label>
									</div>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => setPreview(audio.filename)}
									>
										▶️
									</Button>
								</div>
							))}
						</RadioGroup>
					</ScrollArea>
				)}
				{preview && <AudioPlayer src={preview} />}
			</DialogContent>
		</Dialog>
	);
}

function AudioPlayer({ src }: { src?: string }) {
	const { isPlaying, pause, play, stop } = useAudioPlayer(
		`${AppConfig.BackendUrl}/files/stream/${src}`,
	);
	return (
		<div className="mt-4">
			<button
				type="button"
				onClick={isPlaying ? pause : play}
				className="px-3 py-2 bg-blue-500 text-white rounded-md"
			>
				{isPlaying ? "Pause" : "Play"}
			</button>
			<button
				type="button"
				onClick={stop}
				className="px-3 py-2 bg-gray-500 text-white rounded-md"
			>
				Stop
			</button>
		</div>
	);
}
