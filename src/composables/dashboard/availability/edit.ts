import { clear_service_availability_data, useCreateAvailability } from './create'
import { useFetchAvailabilityById } from './id'

import { useAlert } from '@/composables/core/notification'
import { updateFirestoreSubDocument } from '@/firebase/firestore/edit'
import { useUser } from '@/composables/auth/user'



export const useEditAvailability = () => {
    const { availabilityName, default_days_of_week_data } = useCreateAvailability()

        const { id: user_id } = useUser()
    const loading = ref(false)

        const { availability, fetchAvailabilityById, loading: idLoading } = useFetchAvailabilityById()


    const edit = async () => {
        loading.value = true

        const sentData = { default_days_of_week_data: default_days_of_week_data.value, name: availabilityName.value, updated_at: new Date().toISOString() }
        await updateFirestoreSubDocument('users', user_id.value!, 'availability', availability.value.id, sentData)
        loading.value = false
        const redirectUrl = useUser().redirectUrl.value
        useUser().redirectUrl.value = null
        useRouter().push(redirectUrl ?? '/availability')
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Availability Edited successfully!' })
        clear_service_availability_data()
    }

    const initAvailabilityEdit = async (id: string) => {
        if (!id) return
        await fetchAvailabilityById(id)
        availabilityName.value = availability.value.name
        default_days_of_week_data.value = availability.value.default_days_of_week_data
    }

    return { loading, edit, initAvailabilityEdit, idLoading }
}
