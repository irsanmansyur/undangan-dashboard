import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioPlayer(src?: string) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!src) return;

		const audio = new Audio(src);
		audioRef.current = audio;

		const handleCanPlay = () => setIsLoaded(true);
		const handleEnded = () => setIsPlaying(false);

		audio.addEventListener("canplaythrough", handleCanPlay);
		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.pause();
			audio.removeEventListener("canplaythrough", handleCanPlay);
			audio.removeEventListener("ended", handleEnded);
			audioRef.current = null;
		};
	}, [src]);

	const play = useCallback(() => {
		if (!audioRef.current) return;
		audioRef.current.play();
		setIsPlaying(true);
	}, []);

	const pause = useCallback(() => {
		if (!audioRef.current) return;
		audioRef.current.pause();
		setIsPlaying(false);
	}, []);

	const stop = useCallback(() => {
		if (!audioRef.current) return;
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
		setIsPlaying(false);
	}, []);

	return {
		isPlaying,
		isLoaded,
		play,
		pause,
		stop,
		audio: audioRef.current,
	};
}
