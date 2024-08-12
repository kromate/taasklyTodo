import { useAlert } from '@/composables/core/notification'
import { useDashboardModal } from '@/composables/core/modals'



const start_date = ref()
const goalDetails = ref()
const milestones = ref()
const todos = ref()
const loading = ref(false)
export const useStartGoal = () => {
    const initStartGoal = async (data: Record<string, any>) => {
        goalDetails.value = data
        useDashboardModal().openStartGoal()
    }

    const startGoal = async () => {
        loading.value = true
        await createMilestone()
        loading.value
    }


    return { startGoal, initStartGoal, start_date, goalDetails, loading }
}


const createMilestone = async () => {
        try {
            const { data, error: fetchError } = await useFetch('/api/gemini/chat', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: JSON.stringify({
                        goal: goalDetails.value.desc,
                        steps: JSON.stringify(goalDetails.value.steps),
                        start_date: start_date.value
                    }),
                    promptType: 'SMART_MILESTONE'
                })
            }) as { data: Ref<string>, error: any }

            if (fetchError.value) {
                throw new Error(fetchError.value.message || 'An error occurred while fetching data for the milestone')
            }

            if (data.value === undefined) {
                throw new Error('No response received from the server for the milestone')
            }


            milestones.value = JSON.parse(data.value).milestones
            loading.value = false
        } catch (e) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: e instanceof Error ? e.message : 'An unexpected error occurred, please try again' })
        }
}
