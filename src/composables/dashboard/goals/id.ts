import { getSingleFirestoreDocument } from '@/firebase/firestore/fetch'
import { useAlert } from '@/composables/core/notification'



export const useFetchGoalsById = () => {
    const goalDetails = ref({})
    const loading = ref(false)

    const fetchGoalsById = async (id) => {
        loading.value = true
        

        	try {
            await getSingleFirestoreDocument('goals', id, goalDetails)
            loading.value = false
        } catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
		}
    }

    return { fetchGoalsById, goalDetails, loading }
 }