import { booking_create_utils } from './create_utils'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useUser } from '@/composables/auth/user'
import { useAlert } from '@/composables/core/notification'
import { useLoadingNotification } from '@/composables/core/verificationLoader'
import { callFirebaseFunction } from '@/firebase/functions'
import { useFetchAvailabilityById } from '@/composables/dashboard/availability/id'
import { useMakePayment } from '@/composables/payment/paystack'



export const useCreateBooking = () => {
    const loading = ref(false)

    let sent_data

    const initBooking = async (data) => {
        if (!data) return
        booking_create_utils.loadingState.date.value = true
        booking_create_utils.selectedBooking.value = data
        const { availability, fetchPublicAvailabilityById } = useFetchAvailabilityById()
        await fetchPublicAvailabilityById(data.user_id, data.availability_id)
        booking_create_utils.selectedAvailability.value = availability.value
        booking_create_utils.loadingState.date.value = false
    }

    const createBooking = async () => {
        try {
            sent_data = {
                ...convertObjWithRefToObj(booking_create_utils.credientials),
                date: booking_create_utils.credientials.selectedDate.value.toString(),
                time: booking_create_utils.credientials.selectedTime.value.value,
                duration: booking_create_utils.selectedBooking.value.duration,
                availability_id: booking_create_utils.selectedBooking.value.availability_id,
                bookingType_id: booking_create_utils.selectedBooking.value.id,
                price: booking_create_utils.selectedBooking.value.price,
                user_id: booking_create_utils.selectedBooking.value.user_id,
                booking_desc: booking_create_utils.selectedBooking.value.desc,
                booking_name: booking_create_utils.selectedBooking.value.name
            }



            if (sent_data.price && sent_data.price > 0) {
                const { makePayment } = await useMakePayment(handlePaymentClose, handlePaymentCallback)
                makePayment(sent_data.price, { channel: 'BOOKING_PAYMENT', bookingId: booking_create_utils.selectedBooking.value.id })
            } else {
                await proceedWithBooking(sent_data)
            }
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: e.msg, addrs: 'useCreateBooking 2' })
            loading.value = false
            useLoadingNotification().closeLoader()
        }
    }

    const handlePaymentClose = () => {
        useAlert().openAlert({ type: 'ERROR', msg: 'Payment Failed' })
        loading.value = false
        useLoadingNotification().closeLoader()
    }

    const handlePaymentCallback = (data) => {
        proceedWithBooking(sent_data, data)
    }

    const proceedWithBooking = async (sent_data_params, payment_data?: Record<string, any>) => {
        try {
            useLoadingNotification().openLoader({ title: 'Creating Booking', msg: 'Please wait while we create your booking' })
            const res = await callFirebaseFunction('createBooking', { ...sent_data_params, payment_reference: payment_data?.reference }) as any


            if (res.code === 200) {
                useAlert().openAlert({ type: 'SUCCESS', msg: 'Booking Created Successfully' })
                loading.value = false
                useRouter().push(`/booking/${res.id}`)
                // useLoadingNotification().closeLoader()
            } else {
                useAlert().openAlert({ type: 'ERROR', msg: res.msg, addrs: 'useCreateBooking' })
                loading.value = false
                useLoadingNotification().closeLoader()
            }
        } catch (e: any) {
            useAlert().openAlert({ type: 'ERROR', msg: e.msg, addrs: 'useCreateBooking 2' })
            loading.value = false
            useLoadingNotification().closeLoader()
        }
    }

    return { createBooking, initBooking }
}
