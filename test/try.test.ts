/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/try', () => {

  post(() => reset());

  to('tryValue', async () => {
    const values_ = [
      OnesyUtils.Try(() => 4),
      OnesyUtils.Try(() => { throw new Error(); }),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.Try(() => 4),
        window.OnesyUtils.Try(() => { throw new Error(); }),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      4,
      undefined,
    ]));
  });

  group('options', () => {

    to('log', async () => {
      global.ONESY = {
        env: 'test',
      };

      OnesyUtils.Try(() => { throw new Error(); }, { log: true });
      OnesyUtils.Try(() => { throw new Error(); }, { log: false });

      const valueBrowsers = await evaluate((window: any) => {
        window.ONESY = {
          env: 'test',
        };

        window.OnesyUtils.Try(() => { throw new Error(); }, { log: true });
        window.OnesyUtils.Try(() => { throw new Error(); }, { log: false });

        return [
          window.ONESY.test.Try.logs.length,
        ];
      });
      const valueNode = [
        global.ONESY.test.Try.logs.length,
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        1,
      ]));
    });

  });

});
