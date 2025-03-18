import is from './is';

const truncate = (text: string, maxLength: number = 50, sufix = '...') => {
  if (!is('string', text)) return text;

  return text.length > maxLength ? text.slice(0, maxLength) + sufix : text;
};

export default truncate;
