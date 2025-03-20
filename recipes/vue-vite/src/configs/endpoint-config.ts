/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const asgardeoBaseUrl: string = import.meta.env.VITE_ASGARDEO_BASE_URL

interface EndpointConfig {
  api: {
    endpoints: {
      externalApi: string
      me: string
    }
  }
}

const endpointConfig: EndpointConfig = {
  api: {
    endpoints: {
      externalApi:
        'https://71fe9995-65a1-4e05-92a8-bc40749649d8-prod.e1-us-east-azure.choreoapis.dev/hmvi/demoapi/endpoint-9090-803/1.0.0/accounts',
      me: `${asgardeoBaseUrl}/scim2/Me`,
    },
  },
}

export default endpointConfig
