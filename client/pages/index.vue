<template lang="pug">
.page_list
    .grid
        .slot.md-4.xs-12.pa-0
            router-link(to="/test/create")
                AJButton Dodaj test
        .slot.md-12.grid
            .slot.md-12(v-for="test in tests").row.test_box
                .slot.row.test
                    .pa-0.max
                        AJButton(@click="() => Delete(test.id)").max.red Usuń
                    .pa-0.max
                        router-link(:to="`/test/edit/${test.id}`")
                            AJButton.max Edytuj
                    .pa-0.max
                        router-link(:to="`/test/${test.id}`")
                            AJButton.max.green Wypełnij
                .test_name {{test.name}}
            
</template>

<script setup lang="ts">

import {API} from "~/helpers/API";
import {Toast} from "~/helpers/Toast";
import type {Ref} from "@vue/reactivity";


const tests : Ref<ITest[]> = ref([]);

const GetTests = async () => {
    try {
        const result = await API.Get('/tests');
        tests.value = result.result;
        console.log(tests.value)
    }
    catch (e) {
        Toast.Error(e)
    }
}
const Delete = async (id: number) => {
    try {
        await API.Delete(`/test/${id}`);
        await GetTests()
    }
    catch (e) {
        Toast.Error(e)
    }
}
if(process.client) await GetTests();

</script>

<style lang="scss">
@import "/assets/variable.scss";

.page_list {
    .test_name {
        height: 72px;
        display: flex;
        align-items: center;
        @include font-subtitle;
		@media only screen and (max-width: 800px) {
            width: 100%;
            justify-content: center;
        }
    }
    .test_box {
		@media only screen and (max-width: 800px) {
            flex-wrap: wrap;
        }
    }
	.test {
        flex-wrap: wrap;
        width: 100%;
		@media only screen and (max-width: 800px) {
            .max {
                width: 100%;
            }
			&>:nth-child(1),
			&>:nth-child(2) {
				width: 50% !important;
			}
            .test_name {
				width: 100%;
                justify-content: center;
            }
        }
	}
}

</style>