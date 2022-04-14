exports.handler = async (event, context) => {
   console.log('To działa');
   return {
      statusCode: 200,
      body: 'Hello world!',
   };
};
