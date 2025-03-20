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

import { useAsgardeo } from '@asgardeo/vue'
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type Router,
} from 'vue-router'
import Home from '../views/HomeView.vue'
import NotFound from '../views/NotFoundView.vue'
import Profile from '../views/ProfileView.vue'
import Resources from '../views/ResourcesView.vue'
import Settings from '../views/SettingsView.vue'

const requireAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: any,
): void => {
  const { state } = useAsgardeo()

  if (state.isAuthenticated) {
    next()
  } else {
    next('/')
  }
}

interface RouteConfig {
  beforeEnter?: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => void
  component: any
  name: string
  path: string
}

const routes: RouteConfig[] = [
  {
    component: Home,
    name: 'Home',
    path: '/',
  },
  {
    beforeEnter: requireAuth,
    component: Profile,
    name: 'Profile',
    path: '/profile',
  },
  {
    beforeEnter: requireAuth,
    component: Resources,
    name: 'Resources',
    path: '/resource',
  },
  {
    beforeEnter: requireAuth,
    component: Settings,
    name: 'Settings',
    path: '/settings',
  },
  {
    component: NotFound,
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
