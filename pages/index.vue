<script setup lang="ts">
import type { ICard, IColumn } from '~/components/kanban/kanban.types'
import { useKanbanQuery } from '@/components/kanban/useKanbanQuery'
import dayjs from 'dayjs'
import { convertCurrency } from '@/utils/index'
import { useMutation } from '@tanstack/vue-query'
import { COLLECTION_DEALS, DB_ID } from '~/app.constants'
import type { EnumStatus } from '~/types/deals.types'
import {generateColumnStyle} from '@/components/kanban/generate-gradient'
import { useDealSlideStore } from '~/store/deal-slide.store'

useSeoMeta({
    title: 'Home | CRM System'
})

const dragCardRef = ref<ICard | null>(null)
const dragCardColumnRef = ref<IColumn | null>(null)
const store = useDealSlideStore()

const { data, isLoading, refetch } = useKanbanQuery()

type TypeMutationVariables = {
    docId: string;
    status?: EnumStatus;
}

const {mutate} = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({ docId, status }: TypeMutationVariables) => db.updateDocument(DB_ID, COLLECTION_DEALS, docId, {status}),
    onSuccess() {
        refetch()
    }
})

const dragCardStart = (card: ICard, column: IColumn) => {
    dragCardRef.value = card
    dragCardColumnRef.value = column
}

const dragCardOver = (evt: DragEvent) => {
    evt.preventDefault()
}

const dragCardEnd = (column: IColumn) => {
    if (dragCardRef.value && dragCardColumnRef.value) {
        mutate({docId: dragCardRef.value.id, status: column.id})
    }
}
</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM System</h1>
        <div v-if="isLoading">Loading...</div>
        <div class="overflow-y-scroll max-w-[85vw]" v-if="!isLoading">
            <div  class="grid grid-cols-5 gap-16 min-w-[100vw] min-h-screen">
                <div class="min-w-[280px]" @dragover="dragCardOver" @drop="() => dragCardEnd(column)" v-for="(column, index) in data" :key="column.id">
                    <div class="text-center rounded bg-slate-700 py-1 px-5 mb-2" :style="generateColumnStyle(index, data.length)">
                        {{ column.name }}
                    </div>
                    <KanbanCreateDeal :status="column.id" :refetch="refetch"/>
                    <UiCard v-for="card in column.items" @dragstart="() => dragCardStart(card, column)" :key="card.id" class="mb-3" draggable="true">
                        <UiCardHeader role="button" @click="store.set(card)">
                            <UiCardTitle>{{ card.name }}</UiCardTitle>
                            <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
                        </UiCardHeader>

                        <UiCardContent>Заказчик: {{ card.companyName }}</UiCardContent>
                        <UiCardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
                    </UiCard>
                </div>

            </div>
        </div>
        <KanbanSlideover />
    </div>
</template>


<style scoped></style>