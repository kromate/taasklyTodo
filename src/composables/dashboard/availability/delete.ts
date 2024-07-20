
import { deleteFirestoreSubCollectionDocument } from '@/firebase/firestore/delete'
import { useAlert } from '@/composables/core/notification'
import { useConfirmationModal } from '@/composables/core/confirmation'
import { useUser } from '@/composables/auth/user'

const deleteAvailabilityData = ref()


export const useDeleteAvailability = () => {
	const loading = ref(false)
    const { id: user_id } = useUser()

	const setDeleteAvailabilityId = (data: Record<string, any>) => {
		deleteAvailabilityData.value = data

		        useConfirmationModal().openAlert({ type: 'Alert', title: 'Delete Availability', desc: `Are you sure you want to delete  ${deleteAvailabilityData.value.name} availability period`, call_function: deleteAvailability, loading })
	}
	const deleteAvailability = async () => {
		loading.value = true
		try {
			await deleteFirestoreSubCollectionDocument('users', user_id.value!, 'availability', deleteAvailabilityData.value.id)
			loading.value = false
			useConfirmationModal().closeAlert()
			useAlert().openAlert({ type: 'SUCCESS', msg: 'Availability Deleted successfully' })
		} catch (e: any) {
			loading.value = false
			useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}`, addrs: '' })
		}
	}
	return { loading, deleteAvailability, setDeleteAvailabilityId }
}
