import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

export function htmlToReact(html: string) {
  const clean = DOMPurify.sanitize(html);
  return parse(clean);
}
