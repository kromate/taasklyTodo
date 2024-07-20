// import { is_dev } from './src/composables/utils/system'




export default {
    keepalive: true,
    head: {
        title: 'Bookings - Simplified Bookings, Amplified Business',
        htmlAttrs: { lang: 'en' },
        viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
        bodyAttrs: { class: 'overflow-x-hidden' },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                'http-equiv': 'Content-Security-Policy',
                content: 'upgrade-insecure-requests'
            },
            {
                name: 'title',
                content: 'Bookings - Simplified Bookings, Amplified Business'
            },
            {
                name: 'description',
                content: 'Create personalized booking pages, manage appointments effortlessly, and get paid seamlessly. Tailored for African entrepreneurs, perfect for everyone.'
            },
            {
                name: 'twitter:title',
                content: 'Bookings - Simplified Bookings, Amplified Business'
            },
            { name: 'twitter:image', content: 'https://bookings.taaskly.site/og2.png' },
            {
                name: 'twitter:description',
                content: 'Create personalized booking pages, manage appointments effortlessly, and get paid seamlessly. Tailored for African entrepreneurs, perfect for everyone.'
            },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@kromate_24' },
            { name: 'twitter:creator', content: '@kromate_24' },
            {
                property: 'og:title',
                content: 'Bookings | Simplified Bookings, Amplified Business'
            },
            { name: 'google-site-verification', content: 'tWttF6w3RHPlNPm5u7KSRgh4lgkRUZ2Bwl6QzECjY18' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://bookings.taaskly.site/' },
            { property: 'og:image', content: 'https://bookings.taaskly.site/og2.png' },
            { property: 'og:image:secure_url', content: 'https://bookings.taaskly.site/og2.png' },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:site_name', content: 'Bookings' },
            {
                property: 'og:description',
                content: 'Create personalized booking pages, manage appointments effortlessly, and get paid seamlessly. Tailored for African entrepreneurs, perfect for everyone.'
            },

            { name: 'format-detection', content: 'telephone=no' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/og.png' },
            { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
            { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: true }

        ]
    }

}



