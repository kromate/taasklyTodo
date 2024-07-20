<template>
	<section class="flex flex-col gap-4">
		<article v-for="type in bookingTypes" :key="type.id" class="flex items-start border border-line rounded-md py-4 px-6 gap-3 flex-col">
			<div class="flex justify-between gap-8 items-center w-full">
				<div>
					<h2 class="font-semibold text-lg flex items-center gap-2">
						{{ type.name }}
						<span class="text-xs font-light responsive ">/{{ username }}/{{ type.id }}</span>
					</h2>
					<small class="text-subtle">{{ type.desc }}</small>
				</div>
				<div class="flex items-center space-x-2">
					<Switch v-model="type.public" class="responsive" @update="togglePublic(type, $event)" />
					<a :href="`http://${host}/${username}/${type.id}`" class="card_btn responsive" target="_blank">
						<ExternalLink :size="16" />
						View
					</a>
					<button class="card_btn responsive w-[105px]" @click="copyBookingTypeLink(type.id)">
						<Link :size="16" />
						Copy Link
					</button>
					<IconDropdown :children="dropdownChildren()" :data="type" />
				</div>
			</div>
			<footer class="flex gap-4">
				<div class="flex items-center gap-1 text-xs bg-subtle text-emphasis py-1 px-1.5 rounded bg-hover ">
					<Clock :size="16" />
					{{ type.duration }}m
				</div>
				<div class="flex items-center gap-1 text-xs bg-subtle text-emphasis py-1 px-1.5 rounded bg-hover ">
					<Banknote :size="16" />
					{{ type.price ? convertToCurrency(type.price) : 'Free' }}
				</div>
			</footer>
		</article>
	</section>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { Clock, ExternalLink, Link, Edit, Trash, Banknote } from 'lucide-vue-next'
import { useDeleteBookingType } from '@/composables/dashboard/bookingTypes/delete'
import { useUser } from '@/composables/auth/user'
import { useCopyToClipboard } from '@/composables/utils/share'
import { useEditBookingType } from '@/composables/dashboard/bookingTypes/edit'
import { convertToCurrency } from '@/composables/utils/currency'




const { togglePublic } = useEditBookingType()

const { setDeleteBookingTypeData } = useDeleteBookingType()


const host = computed(() => {
	return location.host
})
const { copyData } = useCopyToClipboard()
const { username } = useUser()

const copyBookingTypeLink = (id: string) => {
	copyData({ info: `${host.value}/${username.value}/${id}`, msg: 'Link copied!' })
}
const openBookingTypeLink = (id: string) => {
	window.open(`http://${host.value}/${username.value}/${id}`, '_blank')
}

interface Meeting {
    user_id: string;
    availability_id: string;
    id: string;
    name: string;
    desc: string;
    availability_name: string;
    price: number;
    duration: number;
    public: boolean,
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

defineProps({
    bookingTypes: {
        type: Array as PropType<Meeting[]>,
        required: true
    }
})

const { width } = useWindowSize()

const dropdownChildren = () => {
    const res = [] as any[]

        if (width.value < 768) {
        res.push({ name: 'Preview ', func: (data) => openBookingTypeLink(data.id), class: 'w-full', icon: ExternalLink })
        res.push({ name: 'Copy link to booking ', func: (data) => copyBookingTypeLink(data.id), class: 'w-full', icon: Link })
    }
    res.push({ name: 'Edit ', func: (data) => { useRouter().push(`/booking-types/${data.id}`) }, class: 'w-full', icon: Edit })
    res.push({ name: 'Delete ', func: (data) => setDeleteBookingTypeData(data), class: '!text-red hover:!bg-red hover:!text-white', icon: Trash })

    // if (order.payment_status === 'UNPAID') {
    // 	res.push({ name: 'Generate Payment link', func: (data) => { shareShopPaymentLink(data.id) }, class: 'w-full' })
    // }



    return res
}

</script>

<style scoped>
.responsive {
    @apply hidden md:flex;
}
</style>
