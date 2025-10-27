import is from './is';
import cleanValue from './cleanValue';
import castParam from './castParam';

export interface IOptions {
  valueOverride?: boolean;
}

const optionsDefault: IOptions = {
  valueOverride: false
};

const setObjectValue = <T extends unknown>(
  object: T,
  keys: string | string[] = '',
  value: any = undefined,
  options_: IOptions = {}
): T => {
  const options = { ...optionsDefault, ...options_ };

  if (!(object || keys)) return object;

  if (is('string', keys)) {
    const keys_ = (keys as string).split('.').filter(Boolean).map(key => castParam(key));

    return setObjectValue(object, keys_, value, options);
  }

  if (is('array', keys)) {
    const key = keys[0];
    const keyClean = cleanValue(String(key), { filters: ['.', ','], replaceWith: '' });

    if (keys.length === 1) {
      if (
        (is('array', object) && is('number', key)) ||
        (is('object', object) || is('object-like', object) || is('class', object) || is('function', object))
      ) {
        // Add array or object as a value of the key, if that key doesn't exist atm
        if (
          !object?.hasOwnProperty(key) ||
          options.valueOverride
        ) object[keyClean] = is('number', keys[1]) ? [] : {};

        object[is('string', key) ? keyClean : key] = value;
      }
    }
    else {
      if (
        (is('array', object) && is('number', key)) ||
        (is('object', object) || is('object-like', object) || is('class', object) || is('function', object))
      ) {
        // Add array or object as a value of the key, if that key doesn't exist atm
        if (
          !object?.hasOwnProperty(key) ||
          options.valueOverride
        ) object[keyClean] = is('number', keys[1]) ? [] : {};
      }

      const value_ = object[keyClean];

      // If we are trying to set a deeply nested value on a
      // simple value type, meaning if it's not an array or an object,
      // To override existing value use valueOverride: true option
      if (!(is('object', value_) || is('object-like', value_) || is('class', value_) || is('function', value_) || is('array', value_))) return object;

      return setObjectValue(object[key], keys.slice(1), value, options);
    }
  }

  return object;
};

export default setObjectValue;
