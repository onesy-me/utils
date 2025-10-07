import is from './is';
import capitalize from './capitalize';

export interface IOptions {
  filters?: string[];
  className?: boolean;
  cammelCaseTransform?: boolean;
  url?: boolean;
  replaceWith?: string;
  trim?: boolean;
  capitalize?: boolean;
  capitalizeWords?: boolean;
  lowercase?: boolean;
}

export const optionsDefault: IOptions = {
  filters: [',', '.', '-', '_', '\s+'],
  replaceWith: ' ',
  trim: true,
};

const cleanValue = (
  value_: string,
  options_: IOptions = {}
): string | any => {
  try {
    const options = { ...optionsDefault, ...options_ };

    // Few predefined options
    // for className cammel case to regular
    // css property names convert
    if (options.className) {
      options.replaceWith = '-';
      options.cammelCaseTransform = true;
      options.lowercase = true;
    }

    if (is('string', value_)) {
      let value = value_;

      if (options.url) {
        const parts = value.split('?').filter(Boolean);

        let path = parts[0];
        const query = parts[1];

        if (path.slice(-1) === '/') path = path.slice(0, -1);

        value = query ? [path, query].join('?') : path;

        return value;
      }

      if (options.cammelCaseTransform) value = value.split(/(?=[A-Z])/g).join(options.replaceWith || ' ');

      options.filters.forEach(filter => {
        const expression = `\\${filter}`;
        const regexp = new RegExp(expression, 'g');

        value = value.replace(regexp, options.replaceWith || ' ');
      });

      if (options.trim) value = value.trim();
      if (options.capitalize) value = capitalize(value);
      if (options.capitalizeWords) value = capitalize(value, true);
      if (options.lowercase) value = value.toLocaleLowerCase();

      return value;
    }

    return value_;
  }
  catch (error) { }

  return value_;
};

export default cleanValue;
