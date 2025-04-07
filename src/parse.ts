import getEnvironment from './getEnvironment';
import setObjectValue from './setObjectValue';

export type TType = 'JSON';

export interface IOptions {
  log?: boolean;
  returnSame?: boolean;
}

const optionsDefault: IOptions = {
  returnSame: true
};

const parse = (
  value: any,
  type: TType = 'JSON',
  options_: IOptions = {}
): any => {
  const options = { ...optionsDefault, ...options_ };

  switch (type) {
    case 'JSON':
      try {
        return JSON.parse(value);
      }
      catch (error) {
        if (options.log) {
          console.error('Parse JSON: ', error);

          const env = getEnvironment();

          if (env.ONESY?.env === 'test') {
            if (!env.ONESY?.test?.parse?.logs) setObjectValue(env, 'ONESY.test.parse.logs', []);

            env.ONESY.test.parse.logs.push(error);
          }
        }
      }

      break;

    default:
      break;
  }

  if (options.returnSame) return value;
};

export default parse;
