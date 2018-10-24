'use strict';

module.exports.hello = function (event, context, callback) {
  console.log(event); // Contains incoming request data (e.g., query params,
                      // headers and more)

  const response = {
    statusCode: 200,
    headers: {
      'x-custom-header': 'My Header Value',
    },
    body: JSON.stringify({'message': 'Hello World!'}),
  };

  callback(null, response);
};


function extract(url = '') {
  const request = require('request');
  return new Promise((resolve) => {
    request(url, { json: false }, (err, res, body) => {
        if (err) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({
              errorMessage: 'Could not extract Place ID from the specified URL',
              context: 'invalid-map-url'
            }),
          });
        }

        const result = body.match(/(?<=;window\.APP_INITIALIZATION_STATE=+).*?(?=;window.APP_FLAGS)/gs);
        const json = JSON.parse(result)[3][6];
        const placeId = JSON.parse(json.toString().substring(4))[0][1][0][14][78];

        if (placeId !== '') {
          resolve({
            statusCode: 200,
            body: JSON.stringify({placeId}),
          });
        }

        return resolve({
          statusCode: 500,
          body: JSON.stringify({
            errorMessage: 'Could not extract Place ID from the specified URL',
            context: 'no-id-found'
          }),
        });
      });
  });
}

module.exports.hello2 = async (event) => {
  const body = JSON.parse(event.body);
  return await extract(body.url);
};
