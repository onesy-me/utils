import he from 'he';

import Try from './try';

const textToInnerHTML = (value: string) => Try(() => {
  if (!value) return '';

  // Step 1: Decode URI components repeatedly (e.g., "%20" -> " ")
  let decoded = value;
  let previous: string;

  do {
    previous = decoded;
    decoded = Try(() => decodeURIComponent(decoded)) ?? decoded;

    // Stop when no more %-encoding exists
  } while (decoded !== previous);

  // Step 2: Decode HTML entities (e.g., "&amp;" -> "&")
  const decodedHTMLString = he.decode(decoded);

  // Step 3: Escape JSON-breaking characters
  return Try(() => JSON.parse(`"${decodedHTMLString}"`)) ?? decodedHTMLString;
}) ?? value;

export default textToInnerHTML;
