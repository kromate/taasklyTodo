import { getFirestoreCollectionWithWhereQuery } from '@/firebase/firestore/query'
import { useAlert } from '@/composables/core/notification'
import { useUser } from '@/composables/auth/user'




export const fetchAllUserActiveTodos = () => {
    const { id: user_id } = useUser()
    const usersActiveGoal = ref([] as any)

    const usersActiveTodo = computed(() => usersActiveGoal.value.map((goal: any) => goal.todos))
    const loading = ref(false)

    const fetchUsersTodos = async () => {
        loading.value = true

        try {
            await getFirestoreCollectionWithWhereQuery('goals', usersActiveGoal, { name: 'user_id', operator: '==', value: user_id.value }, { name: 'started', operator: '==', value: true })

            loading.value = false
        } catch (e: any) {
            loading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }


    const groupTodosByDate = computed(() => {
        const groupedTasks = {}
        const activeTodo = usersActiveGoal.value.map((goal: any) => goal.todos).flat()


        activeTodo.forEach((todo) => {
            const date = new Date(todo.due_date).toISOString()

            if (groupedTasks[date]) {
                groupedTasks[date].tasks.push(todo)
            } else {
                groupedTasks[date] = { date, tasks: [todo] }
            }
        })



        return Object.values(groupedTasks)
    })



    return { fetchUsersTodos, usersActiveTodo, loading, groupTodosByDate }
}
