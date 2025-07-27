import isEnvironment from './isEnvironment';
import isValid from './isValid';
import getObjectValue from './getObjectValue';

// In your specific app, make sure you import your own app's package.json,
// and set on window.ONESY.app = { version: packageJson.version }, so checkAppVersion can get your
// app's actual version value instead of onesy-utils package.json version added atm

// meta.json file for this method to be used
// should be generated during build with,
// the package.json / app version inside of it
// so we can use it to compare it with local value
export const getMeta = async () => {
  try {
    if ((window as any).ONESY?.env === 'test') {
      if ((window as any).ONESY?.test?.getMeta?.return) return (window as any).ONESY.test.getMeta.return;
    }

    const headers = {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-store',
    };

    let meta = await fetch('/meta.json', { headers });

    meta = await meta.json();

    return meta;
  }
  catch (error) {
    console.error('Get meta: ', error);
  }
};

export const refreshCacheAndReload = async (reload = true): Promise<void> => {
  console.log(`Clearing all app cache + reloading.`, reload);

  if (caches) {
    const names = await caches.keys();

    for (const name of names) await caches.delete(name);
  }

  // Delete browser cache + hard reload
  if (reload) window.location.reload();
};

// If your app gets buggy and nothing is rendered
// in the root div of your app, in a use case where it can happen,
// use this method to check for rendered app html children elements
// and if none are there clean app cache + app reload
export const checkRoot = (rootId: string, timeout = 400, reload = true): Promise<boolean> => new Promise(resolve => {
  setTimeout(async () => {
    console.log('Root checking...');

    const root = document.getElementById(rootId || 'root');

    if (!root?.children?.length) {
      await refreshCacheAndReload(reload);

      return resolve(false);
    }

    return resolve(true);
  }, timeout);
});

const retriesDefault = 5;

const checkAppVersion = async (retries = retriesDefault, reload = true): Promise<boolean> => {
  if (isEnvironment('browser')) {
    const meta = await getMeta();

    if (!meta && retries > 0) {
      console.log('No meta, retry: ', retriesDefault - retries);

      return checkAppVersion(--retries, reload);
    }

    const versionLatest = meta?.version;
    const versionCurrent = getObjectValue(window, 'ONESY.app.version') || '1.0.0';

    const isPreviousVersion = !versionLatest || isValid('semver-compare', undefined, { valueA: versionLatest, valueB: versionCurrent, operator: 'greater-than' });

    if (isPreviousVersion) {
      console.log(`A new app version ${versionLatest} exists. App about to clean cache and refresh.`);

      await refreshCacheAndReload(reload);

      return false;
    }

    return true;
  }
};

export default checkAppVersion;
