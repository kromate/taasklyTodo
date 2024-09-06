import axios from 'axios'
import { useUser } from '@/composables/auth/user'
import { useAlert } from '@/composables/core/notification'
import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'




export const useFetchUserGoogleCalEvents = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)
    const fetchedEvents = ref([] as any[])

    const fetchUserGoogleCalEvents = async () => {
        loading.value = true
        fetchedEvents.value = []

        try {
            try {
                const { data, error: fetchError } = await useFetch('/api/googleCal/fetch', {
                    method: 'GET'
                }) as { data: Ref<string>, error: any }
            } catch (e) {
                throw new Error('No response received from the server')
            }
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { loading, fetchedEvents, fetchUserGoogleCalEvents }
}
