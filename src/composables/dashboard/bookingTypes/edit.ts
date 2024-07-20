import { useCreateBookingType } from './create'
import { useFetchBookingTypeById } from './id'
import { useAlert } from '@/composables/core/notification'
import { updateFirestoreSubDocument } from '@/firebase/firestore/edit'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useUser } from '@/composables/auth/user'


const loading = ref(false)

export const useEditBookingType = () => {
    const { createBookingTypeForm, resetForm, seletecAvailability } = useCreateBookingType()
    const { bookingType, fetchBookingTypeById, loading: idLoading } = useFetchBookingTypeById()


    const { id: user_id } = useUser()

    const edit = async () => {
        loading.value = true

        const sentData = {

            availability_name: seletecAvailability.value.name,
            ...convertObjWithRefToObj(createBookingTypeForm, ['availability']),
            updated_at: new Date().toISOString()
        }
        await updateFirestoreSubDocument('users', user_id.value!, 'booking_types', bookingType.value.id, sentData)
        loading.value = false
        useRouter().push('/booking-types')
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Booking type Edited successfully!' })
        resetForm()
    }

    const initBookingTypeEdit = async (id: string) => {
        if (!id) return
        await fetchBookingTypeById(id)
        createBookingTypeForm.name.value = bookingType.value.name
        createBookingTypeForm.desc.value = bookingType.value.desc
        createBookingTypeForm.duration.value = bookingType.value.duration
        createBookingTypeForm.availability_id.value = bookingType.value.availability_id
        createBookingTypeForm.price.value = bookingType.value.price
        createBookingTypeForm.public.value = bookingType.value.public
    }

    const togglePublic = async (data, isPublic) => {
        await updateFirestoreSubDocument('users', user_id.value!, 'booking_types', data.id, { public: isPublic })
        useAlert().openAlert({ type: 'SUCCESS', msg: `Booking type ${isPublic ? 'Enabled' : 'Disabled'} successfully!` })
    }

    return { loading, edit, initBookingTypeEdit, idLoading, togglePublic }
}


