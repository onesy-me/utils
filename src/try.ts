import is from './is';
import getEnvironment from './getEnvironment';
import setObjectValue from './setObjectValue';

export interface IOptions {
  log?: boolean;
}

const optionsDefault: IOptions = {};

const Try = <Type extends unknown = undefined>(
  value: () => any,
  options_: IOptions = {}
): Type => {
  const options = { ...optionsDefault, ...options_ };

  try {
    return is('function', value) ? value() : undefined;
  }
  catch (error) {
    if (options.log) {
      console.error('Try: ', error);

      const env = getEnvironment();

      if (env.AMAUI?.env === 'test') {
        if (!env.AMAUI?.test?.Try?.logs) setObjectValue(env, 'AMAUI.test.Try.logs', []);

        env.AMAUI.test.Try.logs.push(error);
      }
    }
  }
};

export default Try;
