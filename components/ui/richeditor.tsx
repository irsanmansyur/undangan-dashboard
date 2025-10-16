"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
	value?: string; // initial value
	onChange?: (html: string) => void;
}

export default function RichTextEditor({
	value = "",
	onChange,
}: RichTextEditorProps) {
	const [mounted, setMounted] = useState(false);

	const editor = useEditor({
		extensions: [StarterKit],
		content: value,
		immediatelyRender: false, // fix SSR mismatch
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
		},
	});

	// pastikan render hanya di client
	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value);
		}
	}, [value, editor]);

	if (!mounted || !editor) return null;

	return (
		<div className="space-y-3">
			<div className="flex gap-2">
				<Button
					variant="outline"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
				>
					H1
				</Button>
				<Button
					variant="outline"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
				>
					H2
				</Button>
				<Button
					variant="outline"
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive("paragraph") ? "bg-muted" : ""}
				>
					P
				</Button>
			</div>

			<div className="border rounded-md p-2 w-full min-h-[150px]">
				<EditorContent editor={editor} />
			</div>

			<div>
				<h4 className="text-sm font-medium mb-1">HTML Output:</h4>
				<pre className="text-xs bg-muted p-2 rounded whitespace-break-spaces">
					{editor.getHTML()}
				</pre>
			</div>
		</div>
	);
}
