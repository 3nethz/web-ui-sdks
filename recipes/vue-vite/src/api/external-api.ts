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

import { AsgardeoSPAClient, type HttpRequestConfig, type Method } from '@asgardeo/vue'
import endpointConfig from '../configs/endpoint-config'

export async function getExternalApi(): Promise<any> {
  const requestConfig: HttpRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET' as Method,
    url: `${endpointConfig.api.endpoints.externalApi}`,
  }

  return AsgardeoSPAClient.getInstance()
    ?.httpRequest(requestConfig)
    .then((response: any) => response?.data)
    .catch((error: Error) => {
      throw new Error(error.message)
      // Log the error.
    })
}
