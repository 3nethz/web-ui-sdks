import { AsgardeoSPAClient, type Method } from '@asgardeo/vue'
import endpointConfig from '../configs/endpoint-config'

const meEndpoint = `${endpointConfig.api.endpoints.me}`

const auth = AsgardeoSPAClient.getInstance()

/**
 * API Call to fetch user details.
 */
export async function getUserDetails() {
  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json',
    },
    method: 'GET' as Method,
    url: meEndpoint,
  }

  return auth
    ?.httpRequest(requestConfig)
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      throw new Error('Failed to fetch user profile.')
    })
}

/**
 * API Call to update user details.
 */
export async function updateUserDetails(body: any) {
  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json',
    },
    method: 'PUT' as Method,
    data: body,
    url: meEndpoint,
  }

  return auth
    ?.httpRequest(requestConfig)
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      throw new Error('Failed to update user profile.')
    })
}

/**
 * API Call update the password.
 */
export async function updatePassword(
  currentPassword: string,
  username: string,
  newPassword: string,
) {
  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json',
    },
    method: 'PATCH' as Method,
    url: meEndpoint,
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
    withCredentials: true,
  }

  return auth!
    .httpRequest(requestConfig)
    .then((response) => {
      return response?.data
    })
    .catch((error) => {
      throw new Error('Failed to update the password.')
    })
}
