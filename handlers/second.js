
function handleHello(event) {
  return new Promise((resolve) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ id: 'second', event }),
    };

    resolve(response);
  });
}

const hello = async (event) => {
  await handleHello(event);
};

export default hello;
