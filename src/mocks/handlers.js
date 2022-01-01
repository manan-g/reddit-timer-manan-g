import { rest } from 'msw';
import jsresponse1 from './reddit-response-1.json';
import jsresponse2 from './reddit-response-2.json';
import jsresponse3 from './reddit-response-3.json';
import jsresponse4 from './reddit-response-4.json';
import jsresponse5 from './reddit-response-5.json';

let responses = [
  jsresponse1,
  jsresponse2,
  jsresponse3,
  jsresponse4,
  jsresponse5,
];

export const handlers = [
  rest.get('https://www.reddit.com/r/javascript/top.json', (req, res, ctx) => {
    let after = req.url.searchParams.get('after');
    let jsresponse;
    if (after==='t3_e8o8oz') {
      jsresponse = jsresponse1;
    } else if (after === 't3_drl1d6') {
      jsresponse = jsresponse2;
    } else if (after === 't3_ccg6no') {
      jsresponse = jsresponse3;
    } else if (after === 't3_caufp8') {
      jsresponse = jsresponse4;
    } else {
      jsresponse = jsresponse1;
    }
    return res(ctx.status(200), ctx.json(jsresponse));
  }),
  rest.get(
    'https://www.reddit.com/r/react/top.json',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(jsresponse2));
    }
  ),
];
