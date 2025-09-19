import isBrowser from './isBrowser';
import isOS from './isOS';
import getCountry from './getCountry';
import { ICountry } from './countries';

export interface IUserIPandLocation {
  ip_address: string;
  country_code: string;
}

export interface IUserOSandBrowser {
  browser: {
    name: string;
    version: string;
    major_version: string;
    agent: string;
    language: string;
  };
  os: {
    platform: string;
  };
}

export interface IUserLocalInfo extends IUserOSandBrowser {
  ip_address: string;
  country: ICountry;
}

export const getUserIPandLocation = async (): Promise<IUserIPandLocation> => {
  let ip_address: string;
  let country_code: string;

  // cloudflare
  try {
    const data: any = await fetch(`https://www.cloudflare.com/cdn-cgi/trace`);

    const items = ((await data.text()) || '').split('\n');

    ip_address = items.find((item: string | string[]) => item.indexOf('ip') === 0)?.slice(3) || '';

    country_code = items.find((item: string | string[]) => item.indexOf('loc') === 0)?.slice(4) || '';
  }
  catch (error) {
    console.log(error);
  }

  // aws
  if (!ip_address) {
    try {
      const dataAWS = await fetch('https://checkip.amazonaws.com');

      ip_address = ((await dataAWS.text()) || '').split('\n')?.[0] || '';
    }
    catch (error) {
      console.log(error);
    }
  }

  return {
    ip_address,
    country_code
  };
};

export const getUserOSandBrowser = (): IUserOSandBrowser => {
  const result: any = {};
  const meta = {
    os: ['mac', 'ios', 'windows', 'linux'],
    browser: ['chrome', 'opera', 'safari', 'firefox', 'edge-chromium', 'edge', 'ie'],
  };

  meta.os.forEach(item => {
    if (isOS(item as any)) result['os'] = item;
  });
  meta.browser.forEach(item => {
    if (isBrowser(item as any)) result['browser'] = item;
  });

  switch (result.browser) {
    case 'chrome':
      result['version'] = navigator.userAgent.split('Chrome/')[1].split(' ')[0];
      break;

    case 'firefox':
      result['version'] = navigator.userAgent.split('Firefox/')[1];
      break;

    case 'opera':
      result['version'] = navigator.userAgent.split('OPR/')[1];
      break;

    case 'safari':
      result['version'] = navigator.userAgent.split('Safari/')[1];
      break;

    case 'edge-chromium':
      result['version'] = navigator.userAgent.split('Edg/')[1];
      break;

    case 'edge':
      result['version'] = navigator.userAgent.split('Edg/')[1];
      break;

    case 'ie':
      result['version'] = (
        (navigator.userAgent.indexOf('MSIE 10') > -1 && '10') ||
        (navigator.userAgent.indexOf('rv:11') > -1 && '11') ||
        '1'
      );
      break;

    default:
      break;
  }

  return {
    browser: {
      name: result.browser,
      version: result.version,
      major_version: result.version?.split('.')[0],
      agent: navigator.userAgent,
      language: navigator.language
    },
    os: {
      platform: result.os
    }
  };
};

const getUserLocalInfo = async (): Promise<IUserLocalInfo> => {
  const IPandLocation = await getUserIPandLocation();

  const country = getCountry(IPandLocation.country_code);
  const osAndBrowser = getUserOSandBrowser();

  return {
    ip_address: IPandLocation.ip_address,
    country,

    ...osAndBrowser
  };
};

export default getUserLocalInfo;
