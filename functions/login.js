exports.handler = async (event, context) => {
   const lessons = [{ id: 0 }, { id: 1 }];
   return {
      statusCode: 200,
      body: JSON.stringify(lessons),
   };
};
