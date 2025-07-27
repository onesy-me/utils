/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/polyfills', () => {

  post(() => reset());

  preTo(reset);

  to('additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.polyfills(true), ('a' as any).alpha instanceof Function,
      ].filter(Boolean);

      return values_;
    });

    const values_ = [
      OnesyUtils.polyfills(true), ('a' as any).alpha instanceof Function,
    ].filter(Boolean);

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
    ]));
  });

  group('polyfills', () => {

    group('browser', () => {

      preTo(reset);

      to('ArrayBuffer', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          window.ONESY = { env: 'test' };

          window.OnesyUtils.polyfills();

          return [
            File.prototype.arrayBuffer.toString().indexOf('native code') === -1,
            Blob.prototype.arrayBuffer.toString().indexOf('native code') === -1,
          ];
        });
        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          true,
        ]));
      });

    });

  });

});
