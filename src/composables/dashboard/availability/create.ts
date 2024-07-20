import { v4 as uuidv4 } from 'uuid'
import { setFirestoreSubDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'

const default_days_of_week_data = ref([
    { name: 'Sunday', value: 0, active: false, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Monday', value: 1, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Tuesday', value: 2, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Wednesday', value: 3, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Thursday', value: 4, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Friday', value: 5, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Saturday', value: 6, active: false, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] }
])
const availabilityName = ref('Working Hours')

export const useCreateAvailability = () => {
    const loading = ref(false)
    const { id: user_id } = useUser()


    const create = async () => {
        loading.value = true

            const id = uuidv4()
        const sentData = { default_days_of_week_data: default_days_of_week_data.value, id, user_id: user_id.value, name: availabilityName.value, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }


        await setFirestoreSubDocument('users', user_id.value as string, 'availability', id, sentData)
        loading.value = false
          const redirectUrl = useUser().redirectUrl.value
        useUser().redirectUrl.value = null
        useRouter().push(redirectUrl ?? '/availability')
        useAlert().openAlert({ type: 'SUCCESS', msg: 'Availability created successfully!' })
        clear_service_availability_data()
    }

    return { loading, create, default_days_of_week_data, availabilityName, clear_service_availability_data }
}

export const clear_service_availability_data = () => {
    default_days_of_week_data.value = [
    { name: 'Sunday', value: 0, active: false, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Monday', value: 1, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Tuesday', value: 2, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Wednesday', value: 3, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Thursday', value: 4, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Friday', value: 5, active: true, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] },
    { name: 'Saturday', value: 6, active: false, timeSlot: [{ startTime: '08:00', endTime: '17:00' }] }
    ]

    availabilityName.value = 'Working Hours'
}
