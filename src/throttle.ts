import { TMethod } from './models';

interface IThrottleMethod {
  (...args: any[]): any;
}

// every 100ms at least
const throttle = (method: TMethod, interval: number = 100): IThrottleMethod => {
  let lastTime = 0;
  let timeoutID: any;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= interval) {
      lastTime = now;

      method(...args);
    }
    else {
      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        lastTime = Date.now();

        method(...args);
      }, interval - (now - lastTime));
    }
  };
};

export default throttle;
