// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    runtimeConfig: {
        public: {
            api_path: 'http://178.213.216.138:3051',
        }
    },
    devtools: { enabled: true },
    hooks: {
        'vite:extendConfig': (config: any, { isClient, isServer }) => {
            if(isClient) config.resolve.alias.vue = './node_modules/vue/dist/vue.esm-bundler.js'
        }
    }
})
