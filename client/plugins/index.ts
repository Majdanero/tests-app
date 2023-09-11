import {defineNuxtPlugin} from '#app'
import {EventBus} from "~/helpers/EventBus";


interface IProvide {

}
declare module '#app' { interface NuxtApp extends IProvide {} }
declare module '@vue/runtime-core' { interface ComponentCustomProperties extends IProvide {} }
export default defineNuxtPlugin(async (context) => {
    try {
        EventBus.Init()
    }
    catch (e) {

    }
})