import React, { useRef, useState, useEffect, useId } from "react";
import { Box } from "@mui/material";
import EditorJS from '@editorjs/editorjs'
import { EDITOR_JS_TOOLS } from "./tools/tools";
import exampleEditorData from "./data/exampleData";


export default function Editor({ value, onChange, ...props }) {
	const editorCore = useRef(null);
	const [editorData, setEditorData] = useState(exampleEditorData);
	const id = useId();
	useEffect(() => {
		if (typeof window !== undefined) {
			editorCore.current = new EditorJS({
				tools: EDITOR_JS_TOOLS,
				onChange: (api) => {
					const editorContent = api.saver.save();
					setEditorData(editorContent);
				},
				holder: id,
				data: editorData,
				placeholder: 'write something awesome'
			});
		}
		return () => {
			if (editorCore.current) {
				editorCore.current.isReady
					.then(() => editorCore.current?.destroy())
					.then(() => editorCore.current = null)
					.catch(() => { });
			}
		}
	}, []);

	useEffect(() => {
		let parsedValue = null;
		try {
			parsedValue = JSON.parse(value)
			if (value?.length > 1 && parsedValue !== editorData) {
				if (parsedValue !== null) {
					setEditorData(parsedValue);
				}
			}
		} catch (e) {
			console.error('Editor: Error parsing editor data', e);
		};
	}, [value]);

	useEffect(() => {
		if (editorData && onChange) {
			onChange(JSON.stringify(editorData));
		}
	}, [editorData]);

	return (
		<Box className={`h-auto w-full ${props?.className}`}>
			<div className="block h-full max-h-full min-h-96 w-full min-w-[400px] overflow-auto" id={id}></div>
		</Box>
	);
}