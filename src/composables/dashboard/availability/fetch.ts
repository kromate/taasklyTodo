import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'


    const availabilities = ref([] as any)
    const loading = ref(false)

export const useFetchAvailabilities = () => {
    const { id: user_id } = useUser()
    const fetchAvailabilities = async () => {
        loading.value = true
        try {
            await getFirestoreSubCollection('users', user_id.value!, 'availability', availabilities)
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useFetchAvailabilities' })
        }
    }

    return { loading, availabilities, fetchAvailabilities }
}



