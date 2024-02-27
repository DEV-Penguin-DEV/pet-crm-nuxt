<script lang="ts" setup>
const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
	isLoadingStore.set(true)
	await account.deleteSession('current')
    authStore.clear();

	await router.push('/login')
	isLoadingStore.set(false)
}
</script>

<template lang="">
    <aside class="px-5 py-8 h-full w-full bg-sidebar relative">
        <NuxtLink class="mb-10 block" to="/">
            <NuxtImg src="/logo.svg" alt="Logo." width="140px" class="mx-auto"/>
        </NuxtLink>
        <button @click="logout" class="cursor-pointer absolute top-2 right-3 transition-colors hover:text-primary">
            <Icon name="line-md:logout" size="20"/>
        </button>
        <LayoutMenu />
    </aside>
</template>

<style lang="">
</style>