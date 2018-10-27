'use strict';

export const hello = (event, context, callback) => {
  console.log(event); // Contains incoming request data (e.g., query params,
                      // headers and more)

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ id: 'second', event }),
  };

  callback(null, response);
};
