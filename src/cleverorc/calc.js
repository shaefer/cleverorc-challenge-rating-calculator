module.exports.cr = (event, context, callback) => {
  //useful bits event.pathParameters.{pathParamName}
  //more useful bits event.queryParameters.{queryParamName}
  console.log(event.body)
  const data = (event.body) 
  ? { 
    crData: JSON.parse(event.body), 
    type: 'post'
  } 
  : {
    crData: {
      [`${event.pathParameters.type}`]: event.pathParameters.value
    }, 
    type: 'get'
  }



  const response = {
      statusCode: '200',
      body: `Call endpoint with info ${data.type}, ${data.crData.hp}`,
  };
  callback(null, response);
};