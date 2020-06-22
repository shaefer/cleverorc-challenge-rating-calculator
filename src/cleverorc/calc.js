import {calculateCRForCreatureType, calculateCR} from './crCalculator/ChallengeRatingCalculator';

const getCrDataFromEvent = (event) => {
  //Assuming two api endpoints defined in serverless.yml
  //a get with pathParameters via: crCalculator/{type}/{value}
  //a post with a body via: crCalculator/ --currently the invoke local sends an object event.body while the actual post via postman sends a string that must be parsed to JSON.
  const data = (event.body)
  ? {
    crData: typeof event.body === 'string' ? JSON.parse(event.body) : event.body,
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
  console.log("Event Body", event.body);
  console.log(typeof event.body);
  const data = getCrDataFromEvent(event);

  try {
    const crOutput = (data.crData.creatureType) ? calculateCRForCreatureType(data.crData) : calculateCR(data.crData);
    console.log(crOutput);
    const finalOutput = {
      inputs: data,
      outputs: crOutput
    };
    const response = {
        statusCode: '200',
        body: JSON.stringify(finalOutput),
    };
    callback(null, response);
  } catch (ex) {
    const response = {
        statusCode: '500',
        body: JSON.stringify(ex),
    };
    callback(null, response);
  }
};