<template lang="pug">
.page_test_edit
    .grid(v-if="test" )
        .slot.md-12.pa-0.title Edytuj {{test.name}}
        .slot.md-12.pa-0.question(v-for="question in test.questions" )
            .grid
                .slot.md-12.row.question_edit
                    .pa-0.full
                        AJInput(v-model="question.content" :validator="Validate.Length(3, 255)" input) Treśc pytnia
                    .pa-0
                        AJCheckbox(v-model="question.multiple") Wielokrotny wybór
                    .pa-0
                        AJButton(@click="() => DeleteQuestion(question)").red Usuń
                    .pa-0
                        AJButton(@click="() => EditQuestion(question)" :block="!Validate.Length(3, 255)(question.content)") Edytuj
                .slot.md-12.row(v-for="answer in question.answers").answer
                    .pa-0.full
                        AJInput(v-model="answer.content" :validator="Validate.Length(3, 255)" input) Treśc odpowiedzi
                    .pa-0
                        AJCheckbox(v-model="answer.correct") Poprawna odpowiedź
                    .pa-0
                        AJButton(@click="() => DeleteAnswer(answer)").red Usuń
                    .pa-0
                        AJButton(@click="() => EditAnswer(answer)" :block="!Validate.Length(3, 255)(answer.content)") Edutuj
                .slot.md-12.row.answer_add
                    .pa-0.full
                        AJInput(v-model="question.temp.content" :validator="Validate.Length(3, 255)" input) Nowa Treść odpowiedzi
                    .pa-0
                        AJCheckbox(v-model="question.temp.correct") Poprawna odpowiedź
                    .pa-0
                        AJButton(@click="() => AddAnswer(question)" :block="question.tempValid") Dodaj
    .grid.full
        .slot.md-12.row.question_add
            .pa-0.full
                AJInput(v-model="question.content" :validator="Validate.Length(3, 255)" input) Treśc pytnia
            .pa-0
                AJCheckbox(v-model="question.multiple") Wielokrotny wybór
            .pa-0
                AJButton(@click="AddQuestion" :block="questionInvalid") Dodaj pytanie
</template>

<script setup lang="ts">

import {API} from "~/helpers/API";
import {useRoute} from "#app";
import type {Ref} from "@vue/reactivity";
import {Toast} from "~/helpers/Toast";
import {Validate} from "~/helpers/Validate";
import AJCheckbox from "~/components/AJCheckbox.vue";
const route = useRoute();
const question = ref({
    content: '',
    multiple: true,
})
const questionInvalid = computed(() => {
    return !Validate.Length(3, 255)(question.value.content)
})


const test : Ref<ITest> = ref(<any>null);
const GetTest = async () => {
    try {
        const result = await API.Get(`/test/${route.params.id}`);
        result.result.questions = result.result.questions.map((r: any) => {
            r.temp = reactive({
                content: '',
                correct: false,
            })
            r.tempValid = computed(() => {
                return !Validate.Length(3, 255)(r.temp.content)
            })
            return r
        });
        test.value = result.result
    }
    catch (e) {
        Toast.Error(e)
    }
}


const AddQuestion = async () => {
    try {
        await API.Post(`/test/${route.params.id}/question`, {content: question.value.content, multiple: question.value.multiple});
        question.value.content = ''
        question.value.multiple = true;
        await GetTest()
        Toast.Success('Dodano pytanie')
    }
    catch (e) {
        Toast.Error(e)
    }
}
const EditQuestion = async (question: any) => {
    try {
        await API.Put(`/question/${question.id}`, {content: question.content, multiple: question.multiple});
        await GetTest()
        Toast.Success('Zmieniono pytanie')
    }
    catch (e) {
        Toast.Error(e)
    }
}
const DeleteQuestion = async (question: any) => {
    try {
        await API.Delete(`/question/${question.id}`);
        await GetTest()
        Toast.Success('Usunięto pytanie')
    }
    catch (e) {
        Toast.Error(e)
    }
}


const AddAnswer = async (question: any) => {
    try {
        await API.Post(`/question/${question.id}/answer`, {content: question.temp.content, correct: question.temp.correct});
        question.temp.content = ''
        question.temp.multiple = true;
        await GetTest()
        Toast.Success('Dodano odpowiedź')
        
    }
    catch (e) {
        Toast.Error(e)
    }
}
const EditAnswer = async (answer: any) => {
    try {
        await API.Put(`/answer/${answer.id}`, {content: answer.content, correct: answer.correct});
        await GetTest()
        Toast.Success('Zmieniono odpowiedź')
    }
    catch (e) {
        Toast.Error(e)
    }
}
const DeleteAnswer = async (answer: any) => {
    try {
        await API.Delete(`/answer/${answer.id}`);
        await GetTest()
        Toast.Success('Usunięto odpowiedź')
    }
    catch (e) {
        Toast.Error(e)
    }
}


if(process.client) await GetTest();
console.log(test.value)

</script>

<style lang="scss">
@import "/assets/variable";
.page_test_edit {
    .question_add {
		border-top: 1px solid $c_gray_3;
		margin: 10px 0 30px 0;
        padding-top: 10px;
    }
	.question {
		border-top: 1px solid $c_gray_3;
		margin: 10px 0 30px 0;
		.answer_add,
        .answer {
			padding-left: 100px;
        
        }
		.question_edit {
			border-bottom: 1px solid $c_gray_3;
            padding-bottom: 20px;
            margin-bottom: 10px;
		}
	}
}

</style>