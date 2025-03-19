<template>
  <div class="app-section">
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-else>
      <header v-if="formValues" class="App-header-sub-section">
        <div class="avatar-large">
          <img
            :src="formValues.profileUrl || USER_LOGO"
            alt="user-logo"
            class="link-logo-image circular-image"
          />
        </div>
        <div class="user-info">
          <h1>{{ formValues.givenName }} {{ formValues.lastName }}</h1>
          <div>
            <label
              >Username: <b>{{ formValues.username }}</b></label
            ><br />
            <label
              >User ID: <b>{{ formValues.id }}</b></label
            >
          </div>
        </div>
      </header>

      <!-- Global notification component at the top of the page -->
      <div
        class="notification-global"
        :class="{
          show: notification.show,
          success: notification.type === 'success',
          error: notification.type === 'error',
        }"
      >
        <p class="notification-text">{{ notification.message }}</p>
      </div>

      <form v-if="formValues" @submit.prevent="handlePersonalInfoSubmit">
        <div class="table-container">
          <h3>Personal Info</h3>
          <p class="p-description justified-text">Update your user profile information.</p>
          <div class="two-column-grid">
            <div class="column">
              <table class="one-column-table">
                <tbody>
                  <tr>
                    <td><label for="givenName">First Name:</label></td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        id="givenName"
                        name="givenName"
                        v-model="formValues.givenName"
                        autocomplete="given-name"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column">
              <table class="one-column-table">
                <tbody>
                  <tr>
                    <td><label for="lastName">Last Name:</label></td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        v-model="formValues.lastName"
                        autocomplete="family-name"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button class="btn margin-top" type="submit">Update</button>
        </div>
      </form>

      <h3 class="text-center">Security Methods</h3>
      <p class="p-description justified-text">
        Secure your account by updating passwords and second factor authentication methods.
      </p>
      <div class="two-column-grid">
        <div class="column">
          <div class="info-box">
            <form @submit.prevent="handlePasswordSubmit">
              <div class="table-container">
                <h3>Change Password</h3>
                <p class="p-description justified-text">
                  Update your password regularly and make sure it's unique.
                </p>
                <table class="one-column-table">
                  <tbody>
                    <tr>
                      <td><label for="currentPassword">Current Password:</label></td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          v-model="passwordFormValues.currentPassword"
                          autocomplete="current-password"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td><label for="newPassword">New Password:</label></td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          v-model="passwordFormValues.newPassword"
                          autocomplete="new-password"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="tr-align-center">
                        <label for="hint" class="label-hint">
                          Changing the password will result in the termination of the current
                          session. You will have to login with the newly changed password.
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button class="btn-outline btn-margin-top" type="submit">Change</button>
              </div>
            </form>
          </div>
        </div>

        <div class="column">
          <div class="info-box">
            <form v-if="formValues" @submit.prevent="handleSecondFactorSubmit">
              <div class="table-container">
                <h3>Second Factor Authentication</h3>
                <p class="p-description justified-text">
                  Secure your account by setting two factor authentication.
                </p>
                <table class="one-column-table">
                  <tbody>
                    <tr>
                      <td colspan="2" class="tr-align-center">
                        <label>Select the Second Factor Authentication: </label>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="tr-align-center">
                        <select id="mfa" name="mfa" v-model="formValues.mfa">
                          <option value="false">None</option>
                          <option value="email-otp-authenticator">Email OTP</option>
                          <option value="SMSOTP">SMS OTP</option>
                          <option value="totp">TOTP</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="tr-align-center">
                        <label for="hint">
                          The selected second factor will be prompted for authentication in the
                          login flow.
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button class="btn-margin-top btn-outline" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUserDetails, updatePassword, updateUserDetails } from '../api/user-info'
import { onMounted, ref, reactive } from 'vue'
import { useAsgardeo } from '@asgardeo/vue'
import USER_LOGO from '../images/user.png'

const formValues = ref(null)
const passwordFormValues = reactive({
  currentPassword: '',
  newPassword: '',
})
const { signOut } = useAsgardeo()
const userInfo = ref(null)
const isLoading = ref(false)
const notification = reactive({
  show: false,
  message: '',
  type: 'success', // 'success' or 'error'
})

const SCHEMA = 'urn:scim:wso2:schema'

// Fetch user details on component mount
onMounted(async () => {
  isLoading.value = true
  try {
    const response = await getUserDetails()
    setUserInfo(response)
  } catch (error) {
    console.error('Error fetching user details:', error)
    showNotification('Error fetching user details.', 'error')
  } finally {
    isLoading.value = false
  }
})

// Set initial form values
const setUserInfo = (data) => {
  userInfo.value = data // Store the raw user info
  formValues.value = {
    username: data?.userName?.split('/')[1],
    email: data?.emails[0],
    givenName: data?.name?.givenName,
    lastName: data?.name?.familyName,
    id: data?.id,
    mfa:
      data?.[SCHEMA]?.preferredMFAOption != null &&
      JSON.parse(data?.[SCHEMA]?.preferredMFAOption)?.authenticationOption,
    profileUrl: data?.profileUrl,
  }
}

const handleSecondFactorSubmit = async () => {
  isLoading.value = true
  let _formData = {
    ...userInfo.value,
    [SCHEMA]: {
      ...userInfo.value?.[SCHEMA],
      preferredMFAOption: '{"authenticationOption":"' + formValues.value?.mfa + '"}',
    },
  }

  try {
    await updateUserDetails(_formData)
    // Reset form state if needed
    showNotification('Second factor authentication updated successfully.', 'success')
  } catch (error) {
    console.error('Error updating second factor:', error)
    showNotification('Failed to update second factor authentication.', 'error')
  } finally {
    isLoading.value = false
  }
}

const handlePersonalInfoSubmit = async () => {
  if (!formValues.value.givenName || !formValues.value.lastName) {
    showNotification('First name and last name are required.', 'error')
    return
  }

  isLoading.value = true
  let _formData = {
    ...userInfo.value,
    userName: `DEFAULT/${userInfo.value?.userName?.split('/')[1]}`,
    name: { familyName: formValues.value.lastName, givenName: formValues.value.givenName },
  }

  try {
    await updateUserDetails(_formData)
    showNotification('Personal information updated successfully.', 'success')
  } catch (error) {
    console.error('Error updating personal info:', error)
    showNotification('Failed to update personal information.', 'error')
  } finally {
    isLoading.value = false
  }
}

const handlePasswordSubmit = async () => {
  // Validate password fields
  if (!passwordFormValues.currentPassword || !passwordFormValues.newPassword) {
    showNotification('Both current and new passwords are required.', 'error')
    return
  }

  isLoading.value = true
  try {
    const response = await updatePassword(
      passwordFormValues.currentPassword,
      `DEFAULT/${userInfo.value?.userName?.split('/')[1]}`,
      passwordFormValues.newPassword,
    )

    if (response.status && response.status === 200) {
      showNotification('Password updated successfully. You will be signed out.', 'success')
      // Clear password fields
      passwordFormValues.currentPassword = ''
      passwordFormValues.newPassword = ''

      // Delay sign out to allow user to see the notification
      setTimeout(() => {
        signOut()
      }, 2000)
    }
  } catch (error) {
    console.error('Error updating password:', error)
    if (!error.response || error.response.status === 401) {
      showNotification('Failed to update password. Please check your current password.', 'error')
    } else {
      showNotification('An error occurred while updating your password.', 'error')
    }
  } finally {
    isLoading.value = false
  }
}

function showNotification(message, type = 'success') {
  notification.message = message
  notification.type = type
  notification.show = true

  // Auto-hide the notification after 3 seconds
  setTimeout(() => {
    notification.show = false
  }, 3000)

  // Scroll to top to ensure notification is visible
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  text-align: center; /* Center text inside user-info */
}

.avatar-large {
  margin-right: 20px; /* Space between avatar and text */
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
}

.user-info h1 {
  margin-bottom: 10px;
  align-self: center; /*Redundant because of the parent align-items:center; but good practice*/
}

.user-info label {
  font-size: 0.875rem;
  color: #333;
  font-weight: normal;
}

.notification-global {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: center;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  opacity: 0;
}

.notification-global.show {
  transform: translateY(0);
  opacity: 1;
}

.notification-global.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.notification-global.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.notification-text {
  margin: 0;
  font-weight: 500;
}

/* Additional styling for form validation */
input:invalid {
  border: 1px solid #f5c6cb;
}

.btn,
.btn-outline {
  position: relative;
}

.btn:disabled,
.btn-outline:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.text-center {
  text-align: center;
}
</style>
