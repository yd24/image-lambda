'use strict';

const handler = require('./index');

describe('Testing AWS lambda function', () => {
  test('Testing that we can generate manifest', async() => {
    const event = {
      Records: [
        {
          s3: {
            bucket: {
              name: 'jscf-lambda-bucket',
            },
            object: {
              key: 'sample',
              size: 1024,
            }
          }
        }
      ]
    };

    let spyConsole = jest.spyOn(console, 'log');
    let res = await handler(event);
    expect(spyConsole).toHaveBeenCalledWith('jscf-lambda-bucket sample 1024');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('\"Hello from Lambda!\"');
  });
});