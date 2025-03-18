<template>
  <div class="App-section">
    <header v-if="formValues" class="App-header-sub-section">
      <div class="avatar-large">
        <img
          :src="formValues.profileUrl || USER_LOGO"
          alt="user-logo"
          class="link-logo-image circular-image"
        />
      </div>
      <h1>{{ formValues.givenName }} {{ formValues.lastName }}</h1>
      <div>
        <label
          >Username: <b>{{ formValues.username }}</b></label
        ><br />
        <label
          >User ID: <b>{{ formValues.id }}</b></label
        >
      </div>
    </header>

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

    <h3>Security Methods</h3>
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
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" class="tr-align-center">
                      <label for="hint" class="label-hint">
                        Changing the password will result in the termination of the current session.
                        You will have to login with the newly changed password.
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
                        The selected second factor will be prompted for authentication in the login
                        flow.
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="btn-margin-top btn-outline" type="submit">Save</button>
            </div>
          </form>
        </div>
        <div
          class="notification tr-align-center"
          id="successNotification"
          :class="{ show: notification.show }"
        >
          <p class="p-description" id="notificationDescription">{{ notification.message }}</p>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
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
const { signOut, state } = useAsgardeo()
const userInfo = ref(null)
const isLoading = ref(false)
const notification = reactive({
  show: false,
  message: '',
})

const SCHEMA = 'urn:scim:wso2:schema'

// Fetch user details on component mount
onMounted(async () => {
  isLoading.value = true // Correctly update isLoading
  try {
    const response = await getUserDetails()
    setUserInfo(response)
  } catch (error) {
    console.error('Error fetching user details:', error)
    showNotification('Error fetching user details.')
  } finally {
    isLoading.value = false // Correctly update isLoading
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
  let _formData = {
    ...userInfo.value,
    [SCHEMA]: {
      ...userInfo.value?.[SCHEMA],
      preferredMFAOption: '{"authenticationOption":"' + formValues.value?.mfa + '"}',
    },
  }

  try {
    await updateUserDetails(_formData)
    showNotification('User details update successful.')
  } catch (error) {
    console.error('Error updating second factor:', error)
    showNotification('Error in updating the user details.')
  }
}

const handlePersonalInfoSubmit = async () => {
  let _formData = {
    ...userInfo.value,
    userName: `DEFAULT/${userInfo.value?.userName?.split('/')[1]}`,
    name: { familyName: formValues.value.lastName, givenName: formValues.value.givenName },
  }
  try {
    await updateUserDetails(_formData)
    showNotification('User details update successful.')
  } catch (error) {
    console.error('Error updating personal info:', error)
    showNotification('Error in updating the user details.')
  }
}

const handlePasswordSubmit = async () => {
  try {
    const response = await updatePassword(
      passwordFormValues.currentPassword,
      `DEFAULT/${userInfo.value?.userName?.split('/')[1]}`,
      passwordFormValues.newPassword,
    )
    if (response.status && response.status === 200) {
      showNotification('Password update successful.')
    }
    signOut()
  } catch (error) {
    console.error('Error updating password:', error)
    if (!error.response || error.response.status === 401) {
      showNotification('Error in updating the password.')
    }
  }
}

function showNotification(message) {
  notification.message = message
  notification.show = true
  setTimeout(() => {
    notification.show = false
  }, 3000)
}
</script>
