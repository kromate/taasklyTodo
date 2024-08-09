import { Link, Calendar, Clock, User, Settings, Grid3X3, CheckCheck } from 'lucide-vue-next'

export const dashboardRoutes = () => [

	{
		icon: Link,
		name: 'Goals',
		route: '/goals',
		main: true,
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: CheckCheck,
		name: 'Todo',
		route: '/todos',
		main: true,
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: Clock,
		name: 'Availability',
		route: '/availability',
		main: true,
		bg: '#e5e7eb',
		color: '#18181B'
	},

	{
		icon: User,
		name: 'Partners',
		route: '/contacts',
		main: true,
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	},

	{
		icon: Grid3X3,
		name: 'Integrations',
		route: '/integrations',
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	},
	{
		icon: Settings,
		name: 'Settings',
		route: '/settings',
		type: 'all',
		bg: '#e5e7eb',
		color: '#18181B'
	}

]
