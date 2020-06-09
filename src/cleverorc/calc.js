import {calculateCRForCreatureType, calculateCR} from './crCalculator/ChallengeRatingCalculator';

const getCrDataFromEvent = (event) => {
  //Assuming two api endpoints defined in serverless.yml
  //a get with pathParameters via: crCalculator/{type}/{value}
  //a post with a body via: crCalculator/
  const data = (event.body)
  ? {
    crData: event.body,
    type: 'post'
  }
  : {
    crData: {
      [`${event.pathParameters.type}`]: event.pathParameters.value
    },
    type: 'get'
  };
  return data;
};

export const cr = (event, context, callback) => {
  //useful bits event.pathParameters.{pathParamName}
  //more useful bits event.queryParameters.{queryParamName}
  console.log(event.body);
  const data = getCrDataFromEvent(event);

  const crOutput = (data.crData.creatureType) ? calculateCRForCreatureType(data.crData) : calculateCR(data.crData);
  console.log(crOutput);
  const finalOutput = {
    inputs: data,
    outputs: crOutput
  };
  const response = {
      statusCode: '200',
      body: `Call endpoint with info ${data.type}, ${JSON.stringify(finalOutput)}`,
  };
  callback(null, response);
};