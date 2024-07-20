import { getFirestoreSubCollection, getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'



export const wallet_data = ref({} as { balance: number, id: string })

export const useFetchWalletBalance = () => {
    const { id: user_id } = useUser()
    const loading = ref(false)
    const fetch = async () => {
        if (!user_id.value) return
        if (wallet_data.value && Object.keys(wallet_data.value).length > 0) return
        loading.value = true
        try {
            await getSingleFirestoreDocument('wallets', user_id.value as string, wallet_data)
            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: 'useFetchWalletBalance' })
        }
    }

    return { wallet_data, fetch, loading }
}
