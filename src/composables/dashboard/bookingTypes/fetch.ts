
import { getFirestoreSubCollection } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'

import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useUser } from '@/composables/auth/user'






export const useFetchbookingTypes = () => {
    const bookingTypes = ref([] as any)

  const loading = ref(false)
  const { id: user_id } = useUser()

    const fetchbookingTypes = async () => {
        if (bookingTypes.value.length > 0) return
        loading.value = true
        try {
            await getFirestoreSubCollection('users', user_id.value!, 'booking_types', bookingTypes)


            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useFetchbookingTypes' })
        }
    }

    return { loading, bookingTypes, fetchbookingTypes }
}





