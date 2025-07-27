import is, { IOptions as IIsOptions } from './is';
import isEnvironment from './isEnvironment';
import alpha from './alpha';
import equalDeep from './equalDeep';
import order from './order';
import encrypt from './encrypt';
import decrypt, { IOptions as IDecryptOptions } from './decrypt';
import encode from './encode';
import lighten from './lighten';
import darken from './darken';
import emphasize from './emphasize';
import getLuminance from './getLuminance';
import getContrastRatio from './getContrastRatio';
import decode from './decode';
import serialize from './serialize';
import deserialize from './deserialize';
import colorToRgb from './colorToRgb';
import rgbToHex from './rgbToHex';
import rgbToHsl from './rgbToHsl';
import rgbToRgba from './rgbToRgba';
import hslToRgb from './hslToRgb';
import hexToRgb from './hexToRgb';
import stringify from './stringify';
import binaryStringToHexadecimal from './binaryStringToHexadecimal';
import hexadecimalStringToBinary from './hexadecimalStringToBinary';
import parse, { IOptions as IParseOptions, TType as TParseType } from './parse';
import merge, { IOptions as IMergeOptions } from './merge';
import hash, { IOptions as IHashOptions } from './hash';
import hashFile, { IOptions as IHashFileOptions } from './hashFile';
import getURL, { IOptions as IURLOptions } from './getURL';
import getOrdinalNumber, { IOptions as IGetOrdinalNumberOptions } from './getOrdinalNumber';
import getStringVariables, { IOptions as IGetStringVariablesOptions, IGetStringVariables } from './getStringVariables';
import setStringVariables, { IOptions as ISetStringVariablesOptions, TVariablesToValue } from './setStringVariables';
import flattenObject from './flattenObject';
import unflattenObject from './unflattenObject';
import hasObjectProperty from './hasObjectProperty';
import hasObjectPropertyValue from './hasObjectPropertyValue';
import getObjectValue from './getObjectValue';
import getObjectPropertyValue from './getObjectPropertyValue';
import setObjectValue, { IOptions as ISetObjectValueOptions } from './setObjectValue';
import removeObjectValue from './removeObjectValue';
import unique from './unique';
import simpleNormalize, { IOptions as ISimpleNormalizeOptions } from './simpleNormalize';
import getLeadingZerosNumber, { IOptions as IGetLeadingZerosNumber } from './getLeadingZerosNumber';
import getFileName, { IOptions as IGetFileNameOptions } from './getFileName';
import fileToValue, { TType as TFileToValueType } from './fileToValue';
import copy from './copy';
import clamp from './clamp';
import copyToClipboard from './copyToClipboard';
import capitalize from './capitalize';
import castParam, { IOptions as ICastParamOptions } from './castParam';
import cleanValue, { IOptions as ICleanValueOptions } from './cleanValue';
import to, { TType as TToType, IOptions as IToOptions, TTo } from './to';
import pick from './pick';
import arrayToParts from './arrayToParts';
import slugify, { IOptions as ISlugifyOptions } from './slugify';
import shuffle from './shuffle';
import updateQueryParams from './updateQueryParams';
import checkObjectFilters from './checkObjectFilters';
import numberWithCommas from './numberWithCommas';
import arrayMoveItem from './arrayMoveItem';
import factorial from './factorial';
import permutation, { IPermutationOptions } from './permutation';
import permutationWithRepetition from './permutationWithRepetition';
import variation, { IVariationOptions } from './variation';
import variationWithRepetition from './variationWithRepetition';
import combination, { ICombinationOptions } from './combination';
import combinationWithRepetition from './combinationWithRepetition';
import promisify from './promisify';
import { IFilter } from './models';

interface ICaretPositioningSelection {
  start: number;
  end: number;
}

interface ICaretPositioning {
  save?: (element: HTMLElement) => ICaretPositioningSelection;
  restore?: (element: HTMLElement, selection: ICaretPositioningSelection) => void;
}

export const stringPolyfills = (additions = true) => {
  if (additions) {
    // eslint-disable-next-line
    (String.prototype as any).alpha = function (opacity: number): string { return alpha(this, opacity); };

    // eslint-disable-next-line
    (String.prototype as any).encode = function (): string { return encode(this); };

    // eslint-disable-next-line
    (String.prototype as any).encrypt = function (privateValue: string): string { return encrypt(this, privateValue); };

    // eslint-disable-next-line
    (String.prototype as any).simpleNormalize = function (options: ISimpleNormalizeOptions = undefined): string { return simpleNormalize(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).getVariables = function (options: IGetStringVariablesOptions = undefined): IGetStringVariables { return getStringVariables(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).setVariables = function (variablesToValue: TVariablesToValue = [], options: ISetStringVariablesOptions = undefined): string { return setStringVariables(this, variablesToValue, options); };

    // eslint-disable-next-line
    (String.prototype as any).getOrdinalNumber = function (options: IGetOrdinalNumberOptions = undefined): string { return getOrdinalNumber(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).getURL = function (options: IURLOptions = undefined): URL | string { return getURL(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).stringify = function (spaces?: number): any { return stringify(this, spaces); };

    // eslint-disable-next-line
    (String.prototype as any).parse = function (type: TParseType = 'JSON', options: IParseOptions = undefined): any { return parse(this, type, options); };

    // eslint-disable-next-line
    (String.prototype as any).colorToRgb = function (opacity: number = undefined, array: boolean = false): string | number[] { return colorToRgb(this, opacity, array); };

    // eslint-disable-next-line
    (String.prototype as any).rgbToHex = function (opacity: number = undefined, array: boolean = false): string | number[] { return rgbToHex(this, opacity, array); };

    // eslint-disable-next-line
    (String.prototype as any).rgbToHsl = function (opacity: number = undefined, array: boolean = false): string | number[] { return rgbToHsl(this, opacity, array); };

    // eslint-disable-next-line
    (String.prototype as any).rgbToRgba = function (opacity: number = undefined, array: boolean = false): string | number[] { return rgbToRgba(this, opacity, array); };

    // eslint-disable-next-line
    (String.prototype as any).hslToRgb = function (opacity: number = undefined, array: boolean = false): string | number[] { return hslToRgb(this, opacity, array); };

    // eslint-disable-next-line
    (String.prototype as any).hexToRgb = function (opacity: number = undefined, array: boolean = false): string | number[] { return hexToRgb(this, opacity, array); };

    // eslint-disable-next-line
    (String.prototype as any).serialize = function (): string { return serialize(this); };

    // eslint-disable-next-line
    (String.prototype as any).decode = function (): any { return decode(this); };

    // eslint-disable-next-line
    (String.prototype as any).deserialize = function (): any { return deserialize(this); };

    // eslint-disable-next-line
    (String.prototype as any).decrypt = function (privateValue: string, options: IDecryptOptions = undefined): string { return decrypt(this, privateValue); };

    // eslint-disable-next-line
    (String.prototype as any).equalDeep = function (valueB: any): boolean { return equalDeep(this, valueB); };

    // eslint-disable-next-line
    (String.prototype as any).lighten = function (coefficient: number): string | undefined { return lighten(this, coefficient); };

    // eslint-disable-next-line
    (String.prototype as any).darken = function (coefficient: number): string | undefined { return darken(this, coefficient); };

    // eslint-disable-next-line
    (String.prototype as any).emphasize = function (coefficient = 0.14): string | undefined { return emphasize(this, coefficient); };

    // eslint-disable-next-line
    (String.prototype as any).binaryStringToHexadecimal = function (): string | undefined { return binaryStringToHexadecimal(this); };

    // eslint-disable-next-line
    (String.prototype as any).hexadecimalStringToBinary = function (): string | undefined { return hexadecimalStringToBinary(this); };

    // eslint-disable-next-line
    (String.prototype as any).getLeadingZerosNumber = function (options: IGetLeadingZerosNumber = undefined): string { return getLeadingZerosNumber(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).getLuminance = function (): number { return getLuminance(this); };

    // eslint-disable-next-line
    (String.prototype as any).getContrastRatio = function (valueB: string): number | undefined { return getContrastRatio(this, valueB); };

    // eslint-disable-next-line
    (String.prototype as any).hash = function (options: IHashOptions = undefined): string { return hash(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).is = function (type: string, options: IIsOptions = undefined): boolean { return is(type as any, this, options); };

    // eslint-disable-next-line
    (String.prototype as any).copyToClipboard = function (): Promise<void> { return copyToClipboard(this); };

    // eslint-disable-next-line
    (String.prototype as any).numberWithCommas = function (delimiter: string = ','): string { return numberWithCommas(this, delimiter); };

    // eslint-disable-next-line
    (String.prototype as any).capitalize = function (): string { return capitalize(this); };

    // eslint-disable-next-line
    (String.prototype as any).castParam = function (options?: ICastParamOptions): any { return castParam(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).clean = function (options?: ICleanValueOptions): string { return cleanValue(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).pick = function (min = 1, max?: number): string { return pick(this, min, max); };

    // eslint-disable-next-line
    (String.prototype as any).slugify = function (options: ISlugifyOptions = undefined): string { return slugify(this, options); };

    // eslint-disable-next-line
    (String.prototype as any).shuffle = function (toShuffle = 14): string { return shuffle(this, toShuffle) as string; };

    // eslint-disable-next-line
    (String.prototype as any).to = function (type: TToType = 'arraybuffer', options: IToOptions = undefined): TTo { return to(this, type, options) as TTo; };
  }
};

export const numberPolyfills = (additions = true) => {
  if (additions) {
    // eslint-disable-next-line
    (Number.prototype as any).encode = function (): string { return encode(this); };

    // eslint-disable-next-line
    (Number.prototype as any).factorial = function () { return factorial(this); };

    // eslint-disable-next-line
    (Number.prototype as any).hash = function (options: IHashOptions = undefined): string { return hash(this, options); };

    // eslint-disable-next-line
    (Number.prototype as any).encrypt = function (privateValue: string): string { return encrypt(this, privateValue); };

    // eslint-disable-next-line
    (Number.prototype as any).stringify = function (spaces?: number): any { return stringify(this, spaces); };

    // eslint-disable-next-line
    (Number.prototype as any).simpleNormalize = function (options: ISimpleNormalizeOptions = undefined): string { return simpleNormalize(this, options); };

    // eslint-disable-next-line
    (Number.prototype as any).parse = function (type: TParseType = 'JSON', options: IParseOptions = undefined): any { return parse(this, type, options); };

    // eslint-disable-next-line
    (Number.prototype as any).serialize = function (): string { return serialize(this); };

    // eslint-disable-next-line
    (Number.prototype as any).equalDeep = function (valueB: any): boolean { return equalDeep(this, valueB); };

    // eslint-disable-next-line
    (Number.prototype as any).is = function (type: string, options: IIsOptions = undefined): boolean { return is(type as any, this, options); };

    // eslint-disable-next-line
    (Number.prototype as any).getLeadingZeros = function (options: IGetLeadingZerosNumber = undefined): string { return getLeadingZerosNumber(this, options); };

    // eslint-disable-next-line
    (Number.prototype as any).getOrdinal = function (options: IGetOrdinalNumberOptions = undefined): string { return getOrdinalNumber(this, options); };

    // eslint-disable-next-line
    (Number.prototype as any).copyToClipboard = function (): Promise<void> { return copyToClipboard(this); };

    // eslint-disable-next-line
    (Number.prototype as any).clamp = function (min: number, max?: number): number { return clamp(this, min, max); };

    // eslint-disable-next-line
    (Number.prototype as any).castParam = function (options?: ICastParamOptions): any { return castParam(this, options); };

    // eslint-disable-next-line
    (Number.prototype as any).withCommas = function (delimiter: string = ','): string { return numberWithCommas(this, delimiter); };

    // eslint-disable-next-line
    (Number.prototype as any).to = function (type: TToType = 'arraybuffer', options: IToOptions = undefined): TTo { return to(this, type, options) as TTo; };
  }
};

export const booleanPolyfills = (additions = true) => {
  if (additions) {
    // eslint-disable-next-line
    (Boolean.prototype as any).encode = function (): string { return encode(this); };

    // eslint-disable-next-line
    (Boolean.prototype as any).hash = function (options: IHashOptions = undefined): string { return hash(this, options); };

    // eslint-disable-next-line
    (Boolean.prototype as any).encrypt = function (privateValue: string): string { return encrypt(this, privateValue); };

    // eslint-disable-next-line
    (Boolean.prototype as any).stringify = function (spaces?: number): any { return stringify(this, spaces); };

    // eslint-disable-next-line
    (Boolean.prototype as any).simpleNormalize = function (options: ISimpleNormalizeOptions = undefined): string { return simpleNormalize(this, options); };

    // eslint-disable-next-line
    (Boolean.prototype as any).parse = function (type: TParseType = 'JSON', options: IParseOptions = undefined): any { return parse(this, type, options); };

    // eslint-disable-next-line
    (Boolean.prototype as any).serialize = function (): string { return serialize(this); };

    // eslint-disable-next-line
    (Boolean.prototype as any).equalDeep = function (valueB: any): boolean { return equalDeep(this, valueB); };

    // eslint-disable-next-line
    (Boolean.prototype as any).is = function (type: string, options: IIsOptions = undefined): boolean { return is(type as any, this, options); };

    // eslint-disable-next-line
    (Boolean.prototype as any).copyToClipboard = function (): Promise<void> { return copyToClipboard(this); };

    // eslint-disable-next-line
    (Boolean.prototype as any).castParam = function (options?: ICastParamOptions): any { return castParam(this, options); };

    // eslint-disable-next-line
    (Boolean.prototype as any).to = function (type: TToType = 'arraybuffer', options: IToOptions = undefined): TTo { return to(this, type, options) as TTo; };
  }
};

export const arrayPolyfills = (additions = true) => {
  if (additions) {
    // eslint-disable-next-line
    (Array.prototype as any).order = function <T extends unknown>(): T { return order(this); };

    // eslint-disable-next-line
    (Array.prototype as any).permutation = function (options?: IPermutationOptions) { return permutation(this, options); };

    // eslint-disable-next-line
    (Array.prototype as any).permutationWithRepetition = function (options?: IPermutationOptions) { return permutationWithRepetition(this, options); };

    // eslint-disable-next-line
    (Array.prototype as any).variation = function (items?: number, options?: IVariationOptions) { return variation(this, items, options); };

    // eslint-disable-next-line
    (Array.prototype as any).variationWithRepetition = function (items?: number, options?: IVariationOptions) { return variationWithRepetition(this, items, options); };

    // eslint-disable-next-line
    (Array.prototype as any).combination = function (items?: number, options?: ICombinationOptions) { return combination(this, items, options); };

    // eslint-disable-next-line
    (Array.prototype as any).combinationWithRepetition = function (items?: number, options?: ICombinationOptions) { return combinationWithRepetition(this, items, options); };

    // eslint-disable-next-line
    (Array.prototype as any).unique = function (...args: string[]): any[] { return unique(this, ...args); };

    // eslint-disable-next-line
    (Array.prototype as any).encode = function (): string { return encode(this); };

    // eslint-disable-next-line
    (Array.prototype as any).stringify = function (spaces?: number): any { return stringify(this, spaces); };

    // eslint-disable-next-line
    (Array.prototype as any).getValue = function (...args: string[]): any { return getObjectValue(this, ...args); };

    // eslint-disable-next-line
    (Array.prototype as any).setValue = function <T extends unknown>(keys: string | string[], value: any = undefined, options: ISetObjectValueOptions): T { return setObjectValue(this, keys, value, options); };

    // eslint-disable-next-line
    (Array.prototype as any).removeValue = function (keys: string | string[]): any { return removeObjectValue(this, keys); };

    // eslint-disable-next-line
    (Array.prototype as any).getPropertyValue = function (keys?: string | string[]): any { return getObjectPropertyValue(this, keys); };

    // eslint-disable-next-line
    (Array.prototype as any).hasProperty = function (...args: string[]): boolean { return hasObjectProperty(this, ...args); };

    // eslint-disable-next-line
    (Array.prototype as any).hasPropertyValue = function (keys?: string | string[]): boolean { return hasObjectPropertyValue(this, keys); };

    // eslint-disable-next-line
    (Array.prototype as any).hash = function (options: IHashOptions = undefined): string { return hash(this, options); };

    // eslint-disable-next-line
    (Array.prototype as any).encrypt = function (privateValue: string): string { return encrypt(this, privateValue); };

    // eslint-disable-next-line
    (Array.prototype as any).merge = function <T extends unknown>(source: T, options: IMergeOptions = undefined): any { return merge(this, source, options); };

    // eslint-disable-next-line
    (Array.prototype as any).parse = function (type: TParseType = 'JSON', options: IParseOptions = undefined): any { return parse(this, type, options); };

    // eslint-disable-next-line
    (Array.prototype as any).serialize = function (): string { return serialize(this); };

    // eslint-disable-next-line
    (Array.prototype as any).equalDeep = function (valueB: any): boolean { return equalDeep(this, valueB); };

    // eslint-disable-next-line
    (Array.prototype as any).is = function (type: string, options: IIsOptions = undefined): boolean { return is(type as any, this, options); };

    // eslint-disable-next-line
    (Array.prototype as any).copyToClipboard = function (): Promise<void> { return copyToClipboard(this); };

    // eslint-disable-next-line
    (Array.prototype as any).copy = function (): any { return copy(this); };

    // eslint-disable-next-line
    (Array.prototype as any).moveItem = function (oldIndex: number, newIndex: number): any[] { return arrayMoveItem(this, oldIndex, newIndex); };

    // eslint-disable-next-line
    (Array.prototype as any).toParts = function (parts: number): any[] { return arrayToParts(this, parts); };
  }
};

export const objectPolyfills = (additions = true) => {
  if (additions) {
    // eslint-disable-next-line
    (Object.prototype as any).order = function <T extends unknown>(): T { return order(this); };

    // eslint-disable-next-line
    (Object.prototype as any).encode = function (): string { return encode(this); };

    // eslint-disable-next-line
    (Object.prototype as any).hash = function (options: IHashOptions = undefined): string { return hash(this, options); };

    // eslint-disable-next-line
    (Object.prototype as any).encrypt = function (privateValue: string): string { return encrypt(this, privateValue); };

    // eslint-disable-next-line
    (Object.prototype as any).stringify = function (spaces?: number): any { return stringify(this, spaces); };

    // eslint-disable-next-line
    (Object.prototype as any).getValue = function (...args: string[]): any { return getObjectValue(this, ...args); };

    // eslint-disable-next-line
    (Object.prototype as any).setValue = function <T extends unknown>(keys: string | string[], value: any = undefined, options: ISetObjectValueOptions): T { return setObjectValue(this, keys, value, options); };

    // eslint-disable-next-line
    (Object.prototype as any).removeValue = function (keys: string | string[]): any { return removeObjectValue(this, keys); };

    // eslint-disable-next-line
    (Object.prototype as any).hasProperty = function (...args: string[]): boolean { return hasObjectProperty(this, ...args); };

    // eslint-disable-next-line
    (Object.prototype as any).hasPropertyValue = function (keys?: string | string[]): boolean { return hasObjectPropertyValue(this, keys); };

    // eslint-disable-next-line
    (Object.prototype as any).getPropertyValue = function (keys?: string | string[]): any { return getObjectPropertyValue(this, keys); };

    // eslint-disable-next-line
    (Object.prototype as any).flatten = function <T extends unknown>(): T { return flattenObject(this); };

    // eslint-disable-next-line
    (Object.prototype as any).unflatten = function (): object { return unflattenObject(this); };

    // eslint-disable-next-line
    (Object.prototype as any).merge = function <T extends unknown>(source: T, options: IMergeOptions = undefined): any { return merge(this, source, options); };

    // eslint-disable-next-line
    (Object.prototype as any).parse = function (type: TParseType = 'JSON', options: IParseOptions = undefined): any { return parse(this, type, options); };

    // eslint-disable-next-line
    (Object.prototype as any).serialize = function (): string { return serialize(this); };

    // eslint-disable-next-line
    (Object.prototype as any).equalDeep = function (valueB: any): boolean { return equalDeep(this, valueB); };

    // eslint-disable-next-line
    (Object.prototype as any).is = function (type: string, options: IIsOptions = undefined): boolean { return is(type as any, this, options); };

    // eslint-disable-next-line
    (Object.prototype as any).copyToClipboard = function (): Promise<void> { return copyToClipboard(this); };

    // eslint-disable-next-line
    (Object.prototype as any).copy = function (): any { return copy(this); };

    // eslint-disable-next-line
    (Object.prototype as any).updateQueryParams = function (override = true): void { return updateQueryParams(this, override); };

    // eslint-disable-next-line
    (Object.prototype as any).checkFilters = function (filters: Array<IFilter>, operator: 'or' | 'and'): boolean { return checkObjectFilters(this, filters, operator); };
  }
};

export const filePolyfills = (additions = true) => {
  if (isEnvironment('browser') && additions) {
    // eslint-disable-next-line
    (File.prototype as any).hash = function (options: IHashFileOptions = undefined): Promise<string> { return hashFile(this, options); };

    // eslint-disable-next-line
    (File.prototype as any).equalDeep = function (valueB: any): boolean { return equalDeep(this, valueB); };

    // eslint-disable-next-line
    (File.prototype as any).getName = function (options: IGetFileNameOptions): string { return getFileName(this, options); };

    // eslint-disable-next-line
    (File.prototype as any).toValue = function (type: TFileToValueType): Promise<string | ArrayBuffer> { return fileToValue(this, type); };
  }
};

export const blobPolyfills = (additions = true) => {
  if (isEnvironment('browser') && additions) {
    // eslint-disable-next-line
    (Blob.prototype as any).equalDeep = function (valueB: any): boolean { return equalDeep(this, valueB); };
  }
};

export const functionPolyfills = (additions = true) => {
  if (additions) {
    // eslint-disable-next-line
    (Function.prototype as any).promisify = function <T extends unknown>(): () => T | Promise<any> { return promisify(this); };

    // eslint-disable-next-line
    (Function.prototype as any).equalDeep = function (valueB: any): boolean { return equalDeep(this, valueB); };

    // eslint-disable-next-line
    (Function.prototype as any).is = function (type: string, options: IIsOptions = undefined): boolean { return is(type as any, this, options); };
  }
};

function arrayBufferFunction() {
  // this: File or Blob
  return new Promise(resolve => {
    const fileReader = new FileReader();

    fileReader.onload = () => resolve(fileReader.result);

    fileReader.readAsArrayBuffer(this);
  });
}

export const arrayBufferPolyfill = () => {
  const ONESY_TEST = (window as any).ONESY?.env === 'test';

  if ('File' in window) (File.prototype as any).arrayBuffer = ONESY_TEST ? arrayBufferFunction || (File.prototype as any).arrayBuffer : (File.prototype as any).arrayBuffer || arrayBufferFunction;

  if ('Blob' in window) (Blob.prototype as any).arrayBuffer = ONESY_TEST ? arrayBufferFunction || (Blob.prototype as any).arrayBuffer : (Blob.prototype as any).arrayBuffer || arrayBufferFunction;
};

export const browserPolyfills = (additions = true) => {
  if (isEnvironment('browser')) {
    // ArrayBuffer
    arrayBufferPolyfill();
  }
};

const polyfills = (additions = true) => {
  // String
  stringPolyfills(additions);

  // // Number
  numberPolyfills(additions);

  // Boolean
  booleanPolyfills(additions);

  // Array
  arrayPolyfills(additions);

  // Object
  objectPolyfills(additions);

  // File
  filePolyfills(additions);

  // Blob
  blobPolyfills(additions);

  // Function
  functionPolyfills(additions);

  // Browser
  browserPolyfills(additions);
};

export default polyfills;
