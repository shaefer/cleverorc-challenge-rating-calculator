const getCrDataFromEvent = (event) => {
  //Assuming two api endpoints defined in serverless.yml
  //a get with pathParameters via: crCalculator/{type}/{value}
  //a post with a body via: crCalculator/
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
  return data;
}

module.exports.cr = (event, context, callback) => {
  //useful bits event.pathParameters.{pathParamName}
  //more useful bits event.queryParameters.{queryParamName}
  console.log(event.body)
  const data = getCrDataFromEvent(event);



  const response = {
      statusCode: '200',
      body: `Call endpoint with info ${data.type}, ${data.crData.hp}`,
  };
  callback(null, response);
};