import is from './is';
import isValid from './isValid';
import isEnvironment from './isEnvironment';
import stringify from './stringify';
import castParam from './castParam';

export type TType = 'string' | 'arraybuffer' | 'datauri' | 'base64' | 'blob' | 'buffer' | 'byte-size' | 'size' | 'size-format';

export type TTo = ArrayBuffer | Blob | Buffer | string | number;

// Only for nodejs, since only nodejs has Buffer
export const dataURIToBuffer = (value: string): Buffer | undefined => {
  if (isValid('datauri', value) || isValid('base64', value)) {
    try {
      // Extract the base64 data from dataUri
      const data = isValid('datauri', value) ? value.split(',')[1] : value;

      // Create buffer from base64 string
      return Buffer.from(data, 'base64');
    }
    catch (error) {
      return;
    }
  }
};

// Only for browser, since browser only has Blob
export const dataURIToBlob = (value: string, outputArrayBuffer = false): Blob | ArrayBuffer | undefined => {
  // Extract base64 part of the dataURL (remove the prefix)
  const base64Data = value.split(',')[1];

  // Convert base64 string to binary data (Blob)
  // Decode base64 string
  const byteCharacters = atob(base64Data);

  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) byteNumbers[i] = slice.charCodeAt(i);

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  // array buffer
  if (outputArrayBuffer) {
    // Calculate the total length of all Uint8Arrays
    let totalLength = 0;

    for (let array of byteArrays) totalLength += array.length;

    // Create a new ArrayBuffer to hold all the data
    const arrayBuffer = new ArrayBuffer(totalLength);

    // Create a view of the ArrayBuffer as a Uint8Array
    const combinedArray = new Uint8Array(arrayBuffer);

    // Copy the contents of each Uint8Array into the combined ArrayBuffer
    let offset = 0;

    for (let array of byteArrays) {
      combinedArray.set(array, offset);

      offset += array.length;
    }

    return arrayBuffer;
  }

  // blob
  // Create Blob from the byte arrays
  const blob = new Blob(byteArrays, { type: 'image/png' });

  return blob;
};

export const blobToDataURI = blob => new Promise<string>(resolve => {
  const reader = new FileReader();

  reader.onloadend = () => {
    const result = reader.result;

    if (typeof result === 'string') resolve(result);
    else resolve('');
  };

  reader.onerror = () => resolve('');

  reader.readAsDataURL(blob);
});

export const sizeFormat = (value: number, decimals = 2, thousand = 1000): string => {
  if (!is('number', value) || value <= 0) return '0 Bytes';

  const k = thousand;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const unitIndex = Math.floor(Math.log(value) / Math.log(k));

  return `${parseFloat((value / Math.pow(k, unitIndex)).toFixed(dm))} ${sizes[unitIndex]}`;
};

export interface IOptions {
  thousand?: number;
  decimals?: number;
  mime?: string;
}

const optionsDefault: IOptions = {
  thousand: 1000,
  decimals: 2,
  mime: 'text/plain',
};

const to = (
  value_: any,
  type: TType = 'arraybuffer',
  options_: IOptions = {}
): TTo | Promise<TTo> => {
  const options = { ...optionsDefault, ...options_ };

  let value: any = value_;

  switch (type) {
    case 'string':
      if (is('arraybuffer', value)) return String.fromCharCode.apply(null, new Uint16Array(value));

      if (is('buffer', value)) return (value as Buffer).toString('utf-8');

      if (isValid('base64', value)) {
        if (isEnvironment('browser')) return atob(value);
        if (isEnvironment('nodejs')) return Buffer.from(value, 'base64').toString('binary');
      }

      if (isValid('datauri', value)) {
        if (isEnvironment('browser')) return atob(value.split(',')[1]);
        if (isEnvironment('nodejs')) return Buffer.from(value.split(',')[1], 'base64').toString('binary');
      }

      if (is('string', value)) return value;

      return stringify(value);

    case 'arraybuffer':
      if (isValid('base64', value)) {
        if (isEnvironment('browser')) return dataURIToBlob(value, true);
        if (isEnvironment('nodejs')) return to(Buffer.from(value, 'base64'), 'arraybuffer', options);
      }

      if (isValid('datauri', value)) {
        if (isEnvironment('browser')) return dataURIToBlob(value, true);
        if (isEnvironment('nodejs')) return to(value.split(',')[1], 'arraybuffer', options);
      }

      if (is('string', value)) {
        const arrayBuffer = new ArrayBuffer(value.length * 2);

        const arrayBufferView = new Uint16Array(arrayBuffer);

        for (let i = 0; i < value.length; i++) arrayBufferView[i] = value.charCodeAt(i);

        return arrayBuffer;
      }

      if (is('buffer', value)) {
        const arrayBuffer = new ArrayBuffer(value.length * 2);

        const arrayBufferView = new Uint16Array(arrayBuffer);

        for (let i = 0; i < value.length; i++) arrayBufferView[i] = value[i];

        return arrayBuffer;
      }

      if (is('arraybuffer', value)) return value;

      return;

    case 'base64':
      if (isValid('base64', value)) return value;

      if (is('string', value)) {
        if (isEnvironment('browser')) value = btoa(value);
        if (isEnvironment('nodejs')) value = Buffer.from(value, 'binary').toString('base64');

        return value;
      }

      return;

    case 'datauri':
      if (is('blob', value)) return blobToDataURI(value);

      if (isValid('datauri', value)) return value;

      if (is('string', value)) {
        let base64: any;

        if (isEnvironment('browser')) base64 = btoa(value);
        if (isEnvironment('nodejs')) base64 = Buffer.from(value, 'binary').toString('base64');

        return `data:${options.mime};base64,${base64}`;
      }

      return;

    case 'blob':
      if (isEnvironment('browser')) {
        if (isValid('base64', value)) return dataURIToBlob(value);

        if (isValid('datauri', value)) return dataURIToBlob(value);

        if (is('string', value)) return new Blob([value], { type: 'text/plain' });

        if (is('blob', value)) return value;
      }

      return;

    case 'buffer':
      if (isEnvironment('nodejs')) {
        if (isValid('base64', value)) return dataURIToBuffer(value);

        if (isValid('datauri', value)) return dataURIToBuffer(value);

        if (is('string', value)) return Buffer.from(value, 'utf-8');

        if (is('buffer', value)) return value;

        return Buffer.from(stringify(value), 'utf-8');
      }

      return;

    case 'byte-size':
      if (is('string', value)) return new TextEncoder().encode(value).byteLength;

      if (is('typedarray', value) || is('buffer', value)) return (value as Uint8Array | Buffer).byteLength;

      return;

    case 'size-format':
      if (is('string', value) || is('number', value)) return sizeFormat(castParam(value), options.decimals, options.thousand);

      return;

    case 'size':
      if (is('string', value)) return sizeFormat(castParam(new TextEncoder().encode(value).byteLength), options.decimals, options.thousand);

      return;

    default:
      return;
  }
};

export default to;
