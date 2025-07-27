/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@onesy/utils/checkAppVersion', () => {

  post(() => reset());

  group('checkAppVersion', () => {

    to('Meta not found + reload and cache cleaned', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        await caches.open('a');

        const items = await caches.keys();

        const result = await window.OnesyUtils.checkAppVersion(4, false);

        const items1 = await caches.keys();

        return [
          result,
          items,
          items1,
        ];
      });

      valueBrowsers.forEach((value: any) => assert(value).eql([
        false,
        ['a'],
        [],
      ]));
    });

    to(`Meta found and version is previous`, async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        window.ONESY = {
          env: 'test',
          app: { version: '4.0.0' },
          test: {
            getMeta: {
              return: { version: '0.0.1' },
            },
          },
        };

        await caches.open('a');

        const items = await caches.keys();

        const result = await window.OnesyUtils.checkAppVersion(4, false);

        const items1 = await caches.keys();

        return [
          result,
          items,
          items1,
        ];
      });

      valueBrowsers.forEach((value: any) => assert(value).eql([
        false,
        ['a'],
        [],
      ]));
    });

    to(`Meta found and version is new`, async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        window.ONESY = {
          env: 'test',
          app: { version: '4.0.1' },
          test: {
            getMeta: {
              return: { version: '4.0.0' },
            },
          },
        };

        await caches.open('a');

        const items = await caches.keys();

        const result = await window.OnesyUtils.checkAppVersion(4, false);

        const items1 = await caches.keys();

        return [
          result,
          items,
          items1,
        ];
      });

      valueBrowsers.forEach((value: any) => assert(value).eql([
        true,
        ['a'],
        ['a'],
      ]));
    });

  });

  group('checkRoot', () => {

    to('Root children not found', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        await caches.open('a');

        const items = await caches.keys();

        const result = await window.OnesyUtils.checkRoot('onesy', 400, false);

        const items1 = await caches.keys();

        return [
          result,
          items,
          items1,
        ];
      });

      valueBrowsers.forEach((value: any) => assert(value).eql([
        false,
        ['a'],
        [],
      ]));
    });

    to('Root children found', async () => {
      const valueBrowsers = await evaluate(async (window: any) => {
        const onesy = window.document.createElement('div');

        onesy.id = 'onesy';

        onesy.append(window.document.createElement('a'));

        window.document.body.append(onesy);

        await caches.open('a');

        const items = await caches.keys();

        const result = await window.OnesyUtils.checkRoot('onesy', 400, false);

        const items1 = await caches.keys();

        return [
          result,
          items,
          items1,
        ];
      });

      valueBrowsers.forEach((value: any) => assert(value).eql([
        true,
        ['a'],
        ['a'],
      ]));
    });

  });

});
