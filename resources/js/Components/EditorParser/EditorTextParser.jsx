// edjsHTML tranforms editor js blocks to html
import edjsHTML from "editorjs-html";
import { Box } from "@mui/material";
// this function parses strings (html elements) to html
import parse from "html-react-parser";
const edjsParser = edjsHTML();

export default function EditorTextParser({ data }) {
  // array of html elements
  const html = edjsParser.parse(JSON.parse(data));

  return <Box className="flex h-full w-full flex-grow flex-col gap-3 px-5">{parse(html.join(""))}</Box>;
}
