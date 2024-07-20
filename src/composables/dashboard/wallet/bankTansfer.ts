import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { wallet_data } from './fetch'
import { useWalletModal } from '@/composables/core/modals'
import { useAlert } from '@/composables/core/notification'
import { callFirebaseFunction } from '@/firebase/functions'
import { nairaToKobo } from '@/composables/utils/currency'
import { useUser } from '@/composables/auth/user'

export const transferType = ref('') as Ref<'' | 'BANK_TRANSFER' | 'TAASKLY_TRANSFER' | 'ESCROW_TRANSFER'>
const key = import.meta.env.VITE_PSK_SECRET_KEY as string
const step = ref(1)
const credentials = {
    bank: ref({} as any),
    accountNumber: ref(''),
    accountName: ref(''),
    amount: ref()
}

const reset = () => {
    credentials.bank.value = {}
    credentials.accountNumber.value = ''
    credentials.accountName.value = ''
    credentials.amount.value = ''
    step.value = 1
    transferType.value = ''
}

export const useSendMoney = () => {
    const { userProfile } = useUser()
    const loading = ref(false)
    const resolveLoading = ref(false)

    const url = computed(() => {
        return `https://api.paystack.co/bank/resolve?account_number=${credentials.accountNumber.value}&bank_code=${credentials.bank.value.code}`
    })

    watch(credentials.accountNumber, async (val) => {
        if (val.length === 10 && credentials.bank.value.code) {
            resolveLoading.value = true
            try {
                const res = await axios.get(url.value, { headers: { Authorization: `Bearer ${key}` } }) as any
                credentials.accountName.value = res.data.data.account_name
            } catch (e) {
                credentials.accountName.value = ''
                useAlert().openAlert({ msg: 'Invalid account number', type: 'ERROR' })
            } finally {
                resolveLoading.value = false
            }
        }
    })

    const disabled = computed(() => {
        if (Object.keys(credentials.bank.value).length === 0) return true
        if (credentials.accountNumber.value.length < 10) return true
        if (credentials.accountName.value === '') return true
        if (credentials.accountName.value === '') return true
        if (!credentials.amount.value || credentials.amount.value < 100) return true
        return false
    })

    const sendMoney = async () => {
        if (step.value === 1) return step.value = 2
        loading.value = true
        const details = {
            type: 'nuban',
            name: credentials.accountName.value,
            account_number: credentials.accountNumber.value,
            bank_code: credentials.bank.value.code,
            currency: 'NGN',
            metadata: {
                id: userProfile.value?.id,
                username: userProfile.value?.username,
                email: userProfile.value?.email,
                phone: userProfile.value?.phone
            }
        }
        try {
            const res = await axios.post('https://api.paystack.co/transferrecipient', details, { headers: { Authorization: `Bearer ${key}` } })
            const sent_data = {
                source: 'balance',
                amount: nairaToKobo(credentials.amount.value),
                reference: uuidv4(),
                recipient: res.data.data.recipient_code,
                counterparty: {
                    type: 'nuban',
                    account_name: credentials.accountName.value,
                    account_number: credentials.accountNumber.value,
                    recipient: res.data.data.recipient_code
                },
                user: {
                    id: userProfile.value?.id,
                    username: userProfile.value?.username,
                    email: userProfile.value?.email,
                    phone: userProfile.value?.phone
                }
            }
            try {
                const response = await callFirebaseFunction('booking_initiate_transfer', sent_data) as any
                if (response.code === 200) {
                    useAlert().openAlert({ msg: 'Transfer Sent', type: 'SUCCESS' })
                     wallet_data.value.balance = (wallet_data.value.balance || 0) - credentials.amount.value
                    useWalletModal().closeSendMoney()
                    reset()
                } else {
                    useAlert().openAlert({ msg: response.msg, type: 'ERROR' })
                }
            } catch {
                loading.value = false
                useAlert().openAlert({ msg: 'Something went wrong while sending money', type: 'ERROR' })
            }
        } catch (e) { useAlert().openAlert({ msg: 'Something went wrong while creating a recipient', type: 'ERROR' }) }

        loading.value = false
    }
    return {
        loading, credentials, sendMoney, resolveLoading, disabled, step
    }
}

export const useFetchBanks = () => {
    const loading = ref(false)
    const banks = ref([])
    const FLW_FETCH_BANKS_URL = 'https://api.paystack.co/bank?country=nigeria'
    const fetchBanks = async () => {
        loading.value = true
        const res = await axios.get(FLW_FETCH_BANKS_URL) as any
        if (res.status === 200) {
            banks.value = res.data.data
        }
        loading.value = false
    }

    return { loading, banks, fetchBanks }
}
