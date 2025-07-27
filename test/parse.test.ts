/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/parse', () => {

  post(() => reset());

  to('parse', async () => {
    const values_ = [
      "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
      "{\n  \"a\": 4,\n  \"c\": [\n    1,\n    \"a\",\n    \"4\",\n    [\n      1,\n      \"a\",\n      4\n    ]\n  ],\n  \"b\": {\n    \"a\": 447,\n    \"d\": {\n      \"a\": 4\n    },\n    \"b\": [\n      true,\n      null,\n      null,\n      {},\n      {}\n    ]\n  }\n}",
      "true",
      undefined,
      "null",
      [1, 'a', [1, 'a', 4]],
      {
        a: 4,
        c: [1, 'a', '4', [1, 'a', 4]],
        b: {
          a: 447,
          d: { a: 4 },
          b: [true, undefined, 'a', {}],
        },
      },
      true,
      undefined,
      null,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
        "{\n  \"a\": 4,\n  \"c\": [\n    1,\n    \"a\",\n    \"4\",\n    [\n      1,\n      \"a\",\n      4\n    ]\n  ],\n  \"b\": {\n    \"a\": 447,\n    \"d\": {\n      \"a\": 4\n    },\n    \"b\": [\n      true,\n      null,\n      null,\n      {},\n      {}\n    ]\n  }\n}",
        "true",
        undefined,
        "null",
        [1, 'a', [1, 'a', 4]],
        {
          a: 4,
          c: [1, 'a', '4', [1, 'a', 4]],
          b: {
            a: 447,
            d: { a: 4 },
            b: [true, undefined, 'a', {}],
          },
        },
        true,
        undefined,
        null,
      ];

      return values_.map(value => window.OnesyUtils.parse(value));
    });
    const valueNode = values_.map(value => OnesyUtils.parse(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [
        1,
        "a",
        [
          1,
          "a",
          4
        ]
      ],
      {
        "a": 4,
        "c": [
          1,
          "a",
          "4",
          [
            1,
            "a",
            4
          ]
        ],
        "b": {
          "a": 447,
          "d": {
            "a": 4
          },
          "b": [
            true,
            null,
            null,
            {},
            {}
          ]
        }
      },
      true,
      undefined,
      null,
      [
        1,
        "a",
        [
          1,
          "a",
          4
        ]
      ],
      {
        "a": 4,
        "c": [
          1,
          "a",
          "4",
          [
            1,
            "a",
            4
          ]
        ],
        "b": {
          "a": 447,
          "d": {
            "a": 4
          },
          "b": [
            true,
            undefined,
            "a",
            {}
          ]
        }
      },
      true,
      undefined,
      null
    ]));
  });

  group('options', () => {

    to('log', async () => {
      global.ONESY = {
        env: 'test',
      };

      const values_ = [
        "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
        new Map(),
      ];

      values_.map(value => OnesyUtils.parse(value, 'JSON', { log: true }));
      values_.map(value => OnesyUtils.parse(value, 'JSON', { log: false }));

      const valueBrowsers = await evaluate((window: any) => {
        window.ONESY = {
          env: 'test',
        };

        const values_ = [
          "[\n  1,\n  \"a\",\n  [\n    1,\n    \"a\",\n    4\n  ]\n]",
          new Map(),
        ];

        values_.map(value => window.OnesyUtils.parse(value, 'JSON', { log: true }));
        values_.map(value => window.OnesyUtils.parse(value, 'JSON', { log: false }));

        return [
          window.ONESY.test.parse.logs.length,
        ];
      });
      const valueNode = [
        global.ONESY.test.parse.logs.length,
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        1,
      ]));
    });

    to('returnSame', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        return [
          window.OnesyUtils.parse([], 'JSON', { returnSame: true }),
          window.OnesyUtils.parse([], 'JSON', { returnSame: false }),
        ];
      });
      const valueNode = [
        OnesyUtils.parse([], 'JSON', { returnSame: true }),
        OnesyUtils.parse([], 'JSON', { returnSame: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [],
        undefined,
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('"a"' as any).parse(),
        ('4' as any).parse(),
        ('true' as any).parse(),
        ('[]' as any).parse(),
        ('{}' as any).parse(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('"a"' as any).parse(),
      ('4' as any).parse(),
      ('true' as any).parse(),
      ('[]' as any).parse(),
      ('{}' as any).parse(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      4,
      true,
      [],
      {},
    ]));
  });

});
