import Try from './try';

const innerHTMLToText = (value: string) => Try(() => {
  const unsafe = [' ', '"', '<', '>', '{', '}', '|', '\\', '^', '`', '\n', '\r', '\t'];

  if (!unsafe.some(item => value.includes(item))) return value;

  return encodeURIComponent(value);
}) ?? value;

export default innerHTMLToText;
