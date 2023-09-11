<template lang="pug">
.page_test_create
    .grid
        .slot.md-12.pa-0.title Dodaj test
        .slot.md-4.pa-0
            AJInput(v-model="name" :validator="Validate.Length(3, 24)" input) Nazwa testu
        .slot.md-2.pa-0
            AJButton(@click="Add" :block="invalid") Dodaj test
</template>

<script setup lang="ts">

import {API} from "~/helpers/API";
import type {Ref} from "@vue/reactivity";
import {Validate} from "~/helpers/Validate";
const name: Ref<string> = ref('');
const router = useRouter();

const invalid = computed(() => {
    return !Validate.Length(3, 24)(name.value)
})

const Add = async () => {
    await API.Post('/test', {name: name.value})
    await router.push('/')
}


</script>

<style lang="scss">
@import "/assets/variable.scss";


</style>