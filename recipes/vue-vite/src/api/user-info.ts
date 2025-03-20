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

const meEndpoint: string = `${endpointConfig.api.endpoints.me}`

const auth: AsgardeoSPAClient | undefined = AsgardeoSPAClient.getInstance()

/**
 * API Call to fetch user details.
 */
export async function getUserDetails(): Promise<any> {
  const requestConfig: HttpRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json',
    },
    method: 'GET' as Method,
    url: meEndpoint,
  }

  return auth
    ?.httpRequest(requestConfig)
    .then((response: any) => response?.data)
    .catch((error: Error) => {
      throw new Error(error.message)
    })
}

/**
 * API Call to update user details.
 */
export async function updateUserDetails(body: any): Promise<any> {
  const requestConfig: HttpRequestConfig = {
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json',
    },
    method: 'PUT' as Method,
    url: meEndpoint,
  }

  return auth
    ?.httpRequest(requestConfig)
    .then((response: any) => response?.data)
    .catch((error: Error) => {
      throw new Error(error.message)
    })
}

/**
 * API Call update the password.
 */
export async function updatePassword(
  currentPassword: string,
  username: string,
  newPassword: string,
): Promise<any> {
  const requestConfig: HttpRequestConfig = {
    auth: {
      password: currentPassword,
      username: [username, '@', `${import.meta.env.VITE_ASGARDEO_ORG_NAME}`].join(''),
    },
    data: {
      Operations: [
        {
          op: 'add',
          value: {
            password: newPassword,
          },
        },
      ],
      schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json',
    },
    method: 'PATCH' as Method,
    url: meEndpoint,
    withCredentials: true,
  }

  return auth!
    .httpRequest(requestConfig)
    .then((response: any) => response?.data)
    .catch((error: Error) => {
      throw new Error(error.message)
    })
}
