<script setup lang="ts">
import {v4 as uuid} from 'uuid'
useSeoMeta({
    title: 'Login | CRM System'
})

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
	isLoadingStore.set(true)
	await account.createEmailSession(emailRef.value, passwordRef.value)
	const response = await account.get()
	if (response) {
		authStore.set({
			email: response.email,
			name: response.name,
			status: response.status,
		})
	}

	emailRef.value = ''
	passwordRef.value = ''
	nameRef.value = ''

	await router.push('/')
	isLoadingStore.set(false)
}

const register = async () => {
	await account.create(uuid(), emailRef.value, passwordRef.value, nameRef.value)
	await login()
}
</script>

<template>
    <div class="flex items-center min-h-screen w-full justify-center">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="text-center font-bold text-2xl mb-5">CRM System</h1>

            <form>
                <UiInput placeholder="Your name" type="name" class="mb-3" v-model="nameRef" />
                <UiInput placeholder="Your email" type="email" class="mb-3" v-model="emailRef" />
                <UiInput placeholder="Your password" type="password" class="mb-3" v-model="passwordRef" />

                <div class="flex gap-5 items-center justify-center">
                    <UiButton type="button" @click="login">Login</UiButton>
                    <UiButton type="button" @click="register">Register</UiButton>
                </div>
            </form>
        </div>


    </div>
</template>


<style scoped></style>