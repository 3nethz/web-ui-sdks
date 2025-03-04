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

import {
  AsgardeoAuthException,
  AuthClientConfig,
  AuthSPAClientConfig,
  BasicUserInfo,
  Config,
  CustomGrantConfig,
  DecodedIDTokenPayload,
  FetchResponse,
  Hooks,
  HttpClientInstance,
  HttpRequestConfig,
  HttpResponse,
  OIDCEndpoints,
  SignInConfig,
} from '@asgardeo/auth-spa';
import { Ref } from 'vue';

export interface VueConfig {
  /**
   * Prevents the SDK from automatically signing in the user if an active session exists.
   */
  disableAutoSignIn?: boolean;

  /**
   * The SDK attempts to check for an active session on the server and update
   * session state automatically. This option allows disabling that behavior.
   */
  disableTrySignInSilently?: boolean;

  /**
   * Determines if the SDK should inject the authentication state into Vue's reactive state.
   * This can be useful for integrating with Vuex or Pinia state management.
   */
  enableReactiveAuthState?: boolean;

  /**
   * If enabled, the SDK will register global authentication-related components (if any) for Vue.
   */
  registerGlobalComponents?: boolean;

  /**
   * The SDK's `AuthProvider` by default listens to route changes
   * to detect `code` & `session_state` parameters and perform a token exchange.
   * This option allows disabling that behavior.
   */
  skipRedirectCallback?: boolean;
}

export type AuthVueConfig = AuthSPAClientConfig & VueConfig;

/**
 * Interface for the Authenticated state of the user which is exposed
 * via `state` object from `useAuthContext` hook.
 */
export interface AuthStateInterface {
  /**
   * The scopes that are allowed for the user.
   */
  allowedScopes: string;
  /**
   * The display name of the user.
   */
  displayName?: string;
  /**
   * The email address of the user.
   */
  email?: string;
  /**
   * Specifies if the user is authenticated or not.
   */
  isAuthenticated: boolean;
  /**
   * Are the Auth requests loading.
   */
  isLoading: boolean;
  /**
   * The uid corresponding to the user who the ID token belonged to.
   */
  sub?: string;
  /**
   * The username of the user.
   */
  username?: string;
}

export interface AuthContextInterface {
  signIn: (
    config?: SignInConfig,
    authorizationCode?: string,
    sessionState?: string,
    state?: string,
    callback?: (response: BasicUserInfo) => void,
    tokenRequestConfig?: {
      params: Record<string, unknown>;
    },
  ) => Promise<BasicUserInfo>;
  signOut: (callback?: (response: boolean) => void) => Promise<boolean>;
  getBasicUserInfo(): Promise<BasicUserInfo>;
  httpRequest(config: HttpRequestConfig): Promise<HttpResponse<any>>;
  httpRequestAll(configs: HttpRequestConfig[]): Promise<HttpResponse<any>[]>;
  requestCustomGrant(
    config: CustomGrantConfig,
    callback?: (response: BasicUserInfo | FetchResponse<any>) => void,
  ): void;
  revokeAccessToken(): Promise<boolean>;
  getOIDCServiceEndpoints(): Promise<OIDCEndpoints>;
  getHttpClient(): Promise<HttpClientInstance>;
  getDecodedIDToken(): Promise<DecodedIDTokenPayload>;
  getIDToken(): Promise<string>;
  getAccessToken(): Promise<string>;
  refreshAccessToken(): Promise<BasicUserInfo>;
  isAuthenticated(): Ref<boolean>;
  enableHttpHandler(): Promise<boolean>;
  disableHttpHandler(): Promise<boolean>;
  updateConfig(config: Partial<AuthClientConfig<Config>>): Promise<void>;
  trySignInSilently: (
    additionalParams?: Record<string, string | boolean>,
    tokenRequestConfig?: {params: Record<string, unknown>},
  ) => Promise<boolean | BasicUserInfo>;

  on(hook: Hooks.CustomGrant, callback: (response?: any) => void, id: string): void;
  on(hook: Exclude<Hooks, Hooks.CustomGrant>, callback: (response?: any) => void): void;
  on(hook: Hooks, callback: (response?: any) => void, id?: string): void;

  // state: AuthStateInterface;
  // error: AsgardeoAuthException;
}
