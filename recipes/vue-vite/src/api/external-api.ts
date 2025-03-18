import {AsgardeoSPAClient, type Method} from '@asgardeo/vue';
import endpointConfig from '../configs/endpoint-config';

export async function getExternalApi () {

  const requestConfig = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    method: 'GET' as Method,
    url: `${endpointConfig.api.endpoints.externalApi}`
  };

  return AsgardeoSPAClient.getInstance()?.httpRequest(requestConfig)
  .then((response) => {
      
    return response?.data;
  })
  .catch((error) => {
    console.log(error);
    // Log the error.
  });
};
