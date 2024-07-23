
const isComponentOpen = ref(false)
const userGoal = ref('')
const gemini_response = ref()
const loading = ref(false)

export const useSmartGoal = () => {
    const checkIfGoalIsSmart = async () => {
        loading.value = true
        isComponentOpen.value = true

        const { data, error } = await useFetch('/api/gemini/chat', {
            method: 'POST',
            body: JSON.stringify({ prompt: userGoal.value })
        })

        gemini_response.value = data.value?.response
        loading.value = false
    }

    return { isComponentOpen, userGoal, checkIfGoalIsSmart, loading, gemini_response }
}
