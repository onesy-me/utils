/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@onesy/utils/canvasFilterInvert', () => {

  post(() => reset());

  to('canvasFilterInvert', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.document.body.style.background = 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)';

      const canvas = await window.OnesyUtils.elementToCanvas(window.document.body);

      const cropped = window.OnesyUtils.canvasCrop(canvas, 0, 0, 14, 14);

      const method = value => {
        const contextCropped = value.getContext('2d');

        const imageData = contextCropped.getImageData(0, 0, 14, 14);

        return Array.from(imageData.data).reduce((result: any, item: any) => result += item, '');
      };

      const data: any = {
        canvas: method(cropped)
      };

      window.OnesyUtils.canvasFilterInvert(undefined, cropped);

      data.updated = method(cropped);

      return [
        data.canvas !== data.updated
      ];
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true
    ]));
  });

});
