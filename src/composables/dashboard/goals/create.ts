import { v4 as uuidv4 } from 'uuid'
import { useGenerateGoalActionableStep } from '@/composables/genericGoals/timeline'
import { setFirestoreDocument } from '@/firebase/firestore/create'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'

export const useCreateGoals = () => {
    const { steps, userGoal, step } = useGenerateGoalActionableStep()

    const createGoals = async (goal) => {
        const { id: user_id } = useUser()

        const id = uuidv4()

        const sent_data = {
            id,
            goal: userGoal.value,
            steps: steps.value,
            user_id: user_id.value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            started: false
        }

        await setFirestoreDocument('goals', sent_data.id, sent_data)
        useRouter().push(`/goals/${sent_data.id}`)
    }

    const resetForm = () => {
        step.value = 1
        userGoal.value = ''
        steps.value = []
    }

    return { createGoals, resetForm }
}
