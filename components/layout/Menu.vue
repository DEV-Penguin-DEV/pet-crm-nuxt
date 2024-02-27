<script setup lang="ts">
import { MENU_DATA } from './mune.data';


</script>


<template>
    <div>
        <NuxtLink
            class="flex text-center items-center py-1 px-3 rounded-lg w-full hover:bg-gray-700 hover:shadow transition-all mb-2.5"
            v-for="link in MENU_DATA" :to="link.url" :key="link.name">
            <Icon class="mr-3" :name="link.icon" />
            <span>{{ link.name }}</span>
        </NuxtLink>
    </div>
</template>

<style scoped></style>