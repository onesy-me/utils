import is from './is';

const capitalize = (value: string, words = false): string => {
  if (is('string', value)) {
    if (words) return value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }

  return value;
};

export default capitalize;
