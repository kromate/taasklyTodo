import { v4 as uuidv4 } from 'uuid'
import { convertObjWithRefToObj, transformString, validate_data } from '@/composables/utils/formatter'
import { setFirestoreSubDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'
import { getSingleFirestoreSubDocument } from '@/firebase/firestore/fetch'




const createBookingTypeForm = {
    name: ref(''),
    desc: ref(''),
    availability_id: ref(),
    duration: ref<number | null>(),
    price: ref<number|null>(0),
    public: ref(true),
    created_at: ref(new Date().toISOString()),
    updated_at: ref(new Date().toISOString())
}

const seletecAvailability = ref()

const resetForm = () => {
    createBookingTypeForm.name.value = ''
    createBookingTypeForm.desc.value = ''
    createBookingTypeForm.availability_id.value = {}
    createBookingTypeForm.duration.value = null
    createBookingTypeForm.price.value = null
    createBookingTypeForm.public.value = true
    createBookingTypeForm.price.value = null
}

const loading = ref(false)

export const useCreateBookingType = () => {
    const create = async () => {
        loading.value = true
        const { id: user_id } = useUser()
        const id = transformString(createBookingTypeForm.name.value)
        const sentData = {
            id,
            user_id: user_id.value,
            availability_name: seletecAvailability.value?.name,
            ...convertObjWithRefToObj(createBookingTypeForm, ['availability'])
        }

        const exists = await checkIfIdExists(id)

        if (exists) {
            useAlert().openAlert({ type: 'ERROR', msg: 'Booking type already exists' })
            loading.value = false
            return
        }

        if (!validate_data(sentData)) return
        loading.value = true
        await setFirestoreSubDocument('users', user_id.value!, 'booking_types', id, sentData)
        loading.value = false
        useRouter().push('/booking-types')
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Booking type created successfully!' })
    }

    return { loading, create, createBookingTypeForm, resetForm, seletecAvailability }
}


const checkIfIdExists = async (id: string) => {
    const { id: user_id } = useUser()
    const type = ref({})
    const doc = await getSingleFirestoreSubDocument('users', user_id.value!, 'booking_types', id, type) as any
return doc?.id
}

