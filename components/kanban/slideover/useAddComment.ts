import { useMutation } from '@tanstack/vue-query'
import { v4 as uuid } from 'uuid'
import { COLLECTION_COMMENTS, DB_ID } from '~/app.constants'

export function useAddComment({ refetch }: { refetch: () => void }) {
    const store = useDealSlideStore()
    const commentRef = ref<string>()

    const { mutate } = useMutation({
        mutationKey: ['new comment', commentRef.value],
        mutationFn: () => db.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
            text: commentRef.value,
            deal: store.card.id
        }),
        onSuccess() {
            refetch()
            commentRef.value = ''
        }
    })

    const writeComment = () => {
		if (!commentRef.value) return
		mutate()
	}

	return {
		writeComment,
		commentRef,
	}
}