import { validate as uuidValidate } from 'uuid';

import is from './is';
import isEnvironment from './isEnvironment';
import equalDeep from './equalDeep';

export type TIsValidType = 'date' | 'unix' | 'timestamp' | 'uuid' | 'binary-string' | 'hexadecimal-string' | 'url' | 'url-path' | 'domain-name' | 'compare' | 'semver' | 'semver-compare' | 'mobile' | 'email' | 'password' | 'hash' | 'color' | 'color-rgb' | 'color-hex' | 'color-hsl' | 'json' | 'min' | 'max' | 'min-max' | 'same-origin' | 'js-chunk' | 'http-method' | 'base64' | 'datauri' | 'pascal-case' | 'camel-case';

export interface IOptions {
  variant?: string;
  min?: number;
  max?: number;
  valueA?: any;
  valueB?: any;
  operator?: 'less-than' | 'less-than-equal' | 'equal' | 'not-equal' | 'array-all' | 'array-some' | 'starts-with' | 'contains' | 'greater-than-equal' | 'greater-than';
}

const optionsDefault: IOptions = {};

export default function isValid(
  type: TIsValidType,
  value?: any,
  options_: IOptions = {}
) {
  const options = { ...optionsDefault, ...options_ };

  let valueA: any;
  let valueB: any;
  let operator: any;
  let operators: any;
  let pattern: any;
  let value_: any;

  switch (type) {
    case 'date':
      return isValid('timestamp', new Date(value).getTime());

    case 'unix':
      return (
        Number.isInteger(value) &&
        String(value).length === 10 &&
        new Date(value * 1000).getTime() > 0
      );

    case 'timestamp':
      return (
        Number.isInteger(value) &&
        String(value).length >= 10 &&
        (
          new Date(value).getTime() > 0 ||
          new Date(value * 1000).getTime() > 0
        )
      );

    case 'uuid':
      return uuidValidate(value);

    case 'binary-string':
      value_ = ['0', '1'];

      return is('string', value) && [...value].every(item => value_.indexOf(item) > -1);

    case 'hexadecimal-string':
      value_ = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

      return is('string', value) && [...value].every(item => value_.indexOf(item) > -1);

    case 'url':
      pattern = /^(https?:\/\/)?([\w.-]+)(\.[\w.-]+)+(\/[\w\-.~:\/?#[\]@!$&'()*+,;=%]*)?$/;

      return pattern.test(value);

    case 'url-path':
      pattern = /^\/([^\/][A-Za-z0-9\-._~!$&'()*+,;=:@\/?#%]*)?$/;

      return pattern.test(value);

    case 'domain-name':
      pattern = /^[a-z0-9\-]+$/;

      const valueCleanedUp = (value as string).replace(/--/g, '-');

      const length = value?.length;

      return pattern.test(value) && !(value as string).startsWith('-') && !(value as string).endsWith('-') && valueCleanedUp.length === value.length && length > 1 && length < 254;

    case 'compare':
      ({ valueA, valueB, operator } = options);

      operators = {
        'less-than': valueA < valueB,
        'less-than-equal': valueA <= valueB,

        'equal': equalDeep(valueA, valueB),
        'not-equal': !equalDeep(valueA, valueB),

        'greater-than-equal': valueA >= valueB,
        'greater-than': valueA > valueB,

        'array-all': is('array', valueA) && is('array', valueB) && valueA.every((_: any, index: number) => equalDeep(valueA[index], valueB[index])),
        'array-some': is('array', valueA) && is('array', valueB) && valueA.some((_: any, index: number) => equalDeep(valueA[index], valueB[index])),

        'starts-with': is('string', valueA) && valueA.indexOf(valueB) === 0,
        'contains': is('string', valueA) && valueA.indexOf(valueB) > -1,
      };

      return operators[operator];

    case 'semver':
      pattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

      return pattern.test(value);

    case 'semver-compare':
      ({ valueA, valueB, operator } = options);

      if (!(isValid('semver', valueA) && isValid('semver', valueB))) return false;

      valueA = (valueA.match(/\d+(\.|\-|\+){0,1}/g) || []).map((item: any) => item.replace(/[,\-\+\.]/g, ''));
      valueB = (valueB.match(/\d+(\.|\-|\+){0,1}/g) || []).map((item: any) => item.replace(/[,\-\+\.]/g, ''));

      operators = {
        'less-than': false,
        'less-than-equal': false,
        'equal': valueA.every((item: any, index: number) => item === valueB[index]),
        'greater-than-equal': false,
        'greater-than': false,
      };

      // Less then
      valueA.forEach((item: any, index: number) => {
        if (!operators['less-than']) operators['less-than'] = item < valueB[index];
      });

      // Greater then
      valueA.forEach((item: any, index: number) => {
        if (!operators['greater-than']) operators['greater-than'] = item > valueB[index];
      });

      // Other or operator values
      operators['less-than-equal'] = operators['less-than'] || operators['equal'];
      operators['greater-than-equal'] = operators['greater-than'] || operators['equal'];

      return operators[operator];

    case 'mobile':
      pattern = /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

      return pattern.test(value) && !Number.isInteger(value);

    case 'email':
      pattern = /\S+@\S+\.\S+/;

      return pattern.test(value);

    case 'password':
      const values = [];

      if (!is('string', value)) return false;

      const min_ = options.min !== undefined ? options.min : 7;

      const max_ = options.max !== undefined ? options.max : 440;

      // min 7, max 440 characters
      if (value.length >= min_ && value.length <= max_) values.push('length');

      // lowercase characters
      if (value.match(/[a-z]+/)) values.push('lowercase');

      // uppercase characters
      if (value.match(/[A-Z]+/)) values.push('uppercase');

      // numbers
      if (value.match(/[0-9]+/)) values.push('number');

      return options.variant === 'value' ? values : values.length >= 4;

    case 'hash':
      pattern = /^(0x)?[a-f0-9]{64}$/gi;

      return is('string', value) && pattern.test(value);

    case 'color':
      return isValid('color-rgb', value, options) || isValid('color-hex', value, options) || isValid('color-hsl', value, options);

    case 'color-rgb':
      // Matches rgb() and rgba(), with values divided with ',' and spaces (optionaly)
      pattern = /rgb(a)?\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))(\.\d+)?,\s*(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))(\.\d+)?,\s*(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))(\.\d+)?(,\s*(?:0(?:\.[0-9]{1,2})?|1(?:\.00?)?))?\)/;

      return pattern.test(value);

    case 'color-hex':
      // Matches #nnn, #nnnnnn and #nnnnnnnn (where last nn's are for alpha (optionaly))
      pattern = /^#((?:[0-9a-fA-F]){3}|(?:[0-9a-fA-F]){6}|(?:[0-9a-fA-F]){8})$/;

      return pattern.test(value);

    case 'color-hsl':
      // Matches hsl() and hsla(), with values divided with ',' and spaces (optionaly)
      pattern = /hsl(a)?\((0|[1-9][0-9]?|[12][0-9][0-9]|3[0-5][0-9])(\.\d+)?,\s*([0-9]|[1-9][0-9]|100)(\.\d+)?%,\s*([0-9]|[1-9][0-9]|100)(\.\d+)?%(,\s*(?:0(?:\.[0-9]{1,2})?|1(?:\.00?)?))?\)/;

      return pattern.test(value);

    case 'json':
      try {
        value_ = JSON.parse(value);
      }
      catch (error) { return false; }

      return is('object', value_, options) || is('array', value_, options);

    case 'min':
      return value >= options.min;

    case 'max':
      return value <= options.max;

    case 'min-max':
      return isValid('min', value, options) && isValid('max', value, options);

    case 'same-origin':
      try {
        value_ = new URL(value);
      }
      catch (error) { }

      return isEnvironment('browser') && (isValid('url-path', value, options) || (window.location.hostname === (value_ as URL)?.hostname));

    case 'js-chunk':
      return is('object', value, options) && !!value.__esModule && (value.default instanceof Function || value.default instanceof Object);

    case 'http-method':
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];

      return is('string', value, options) && methods.indexOf(value.toUpperCase()) > -1;

    case 'base64':
      value_ = typeof value === 'string' ? value.trim() : value;

      return is('string', value_, options) && value_.length >= 1 && /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?$/gi.test(value_);

    case 'datauri':
      value_ = typeof value === 'string' ? value.trim() : value;

      return (
        is('string', value_, options) &&
        /^data:\w+\/[-+.\w]+;base64,(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?$/gi.test(value_) ||
        /^data:(\w+\/[-+.\w]+)?(;charset=[\w-]+)?,(.*)?/gi.test(value_)
      );

    case 'pascal-case':
      pattern = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;

      return pattern.test(value);

    case 'camel-case':
      pattern = /^[a-z]+(?:[A-Z][a-z]+)*$/;

      return pattern.test(value);

    default:
      return false;
  }
}
