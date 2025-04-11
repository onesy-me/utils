import Try from './try';
import textToInnerHTML from './textToInnerHTML';

const innerHTMLToText = (value: string) => Try(() => {
  if (!value) return '';

  // Step 1: Decode the string first
  const decoded = textToInnerHTML(value);

  // Step 3: Escape JSON-breaking characters
  return JSON.stringify(decoded).slice(1, -1);
}) ?? value;

export default innerHTMLToText;
