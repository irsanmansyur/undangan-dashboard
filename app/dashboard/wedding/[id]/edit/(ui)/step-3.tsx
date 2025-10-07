"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import z from "zod";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

import { WeddingCollection } from "~/types/wedding";
import { LoveStoryForm } from "./love-story";
import Gallery from "./galery";
import { useStorePage } from "~/stores/page";
import { useStoreWedding } from "~/stores/wedding";

type Step3Props = {
	wedding: WeddingCollection;
	children?: React.ReactNode;
};

const Step3: React.FC<Step3Props> = ({ wedding }) => {
	const { generateNewPageId } = useStorePage();
	const { setWedding } = useStoreWedding();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Step 3: {`Gallery & Love Story `} </CardTitle>
				<CardDescription>
					Update your love story timeline and photo gallery (Optional)
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<Gallery weddingId={wedding?.id!} galleries={wedding?.gallery || []} />
				<LoveStoryForm
					weddingId={wedding?.id!}
					onSubmitAction={() => {
						generateNewPageId();
					}}
					loveStories={wedding.loveStory?.map((item) => item) || []}
				/>

				<div className="flex justify-between">
					<Button
						type="button"
						variant="outline"
						onClick={() => setWedding({ step: 2 })}
					>
						<ArrowLeft className="h-4 w-4" /> Back
					</Button>
					<Button type="submit" onClick={() => setWedding({ step: 4 })}>
						Next <ArrowRight className="h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default Step3;
