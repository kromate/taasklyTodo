import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'





const fetchedBookings = ref([] as any[])

const bookingIsEmpty = computed(() => {
    return fetchedBookings.value.length === 0
})

export const useFetchBookings = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)

    const fetchUserBookings = async () => {
        loading.value = true
        fetchedBookings.value = []

        try {
            await getFirestoreCollectionWithWhereQuery('bookings', fetchedBookings, { name: 'user_id', operator: '==', value: user_id.value })


            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { loading, fetchedBookings, fetchUserBookings, bookingIsEmpty }
}

