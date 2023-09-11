<template lang="pug">
.page_test_id
    .grid(v-if="test" )
        .slot.md-12.pa-0.title Wypełnij {{test.name}}
        .slot.md-12.pa-0(v-for="(question, index) in test.questions").grid
            .slot.md-12.question {{question.content}}
            .slot.md-12(v-for="(answer, index) in question.answers" :class="{result: result, select: answer.selected, correct: result && answer.correct, incorrect: result && !answer.correct && answer.selected}" @click="Select(question, answer)").answer
                    .select(:class="{multi: question.multiple, selected: answer.selected}")
                    | {{answer.content}}
                
        .slot.md-12.pa-0
            AJButton(v-if="result" @click="GetTest") Jeszcze raz
            AJButton(v-else @click="Result") Zakończ test
            p(v-if="result" ).summary {{summary.correct}}/{{summary.all}} ({{summary.percent}}%)
</template>

<script setup lang="ts">
import {API} from "~/helpers/API";
import {Toast} from "~/helpers/Toast";
import type {Ref} from "@vue/reactivity";
import type {IAnswer, IQuestion, ITest} from "~/types/ITest";

const route = useRoute();
const test: Ref<ITest> = ref(<any>null);
const result = ref(false)

const GetTest = async () => {
    result.value = false;
    try {
        const result = await API.Get(`/test/${route.params.id}`);
        result.result.questions = Shuffle(result.result.questions.map((question : IQuestion) => {
            question.answers = reactive(Shuffle(question.answers.map((answer: IAnswer) => {
                answer.selected = false;
                return answer
            })))
            question.correct = computed(() => {
                return question.answers.filter(a => a.correct && a.selected).length === question.answers.filter(a => a.correct).length
            })
            return question
        }))
        test.value = result.result;
        console.log(123, test.value)
    }
    catch (e) {
        Toast.Error(e)
    }
}

const summary = computed(() => {
    const correct = test.value.questions.filter(q => q.correct).length;
    const all = test.value.questions.length;
    const percent = correct / all * 100;
    return {
        correct,
        all,
        percent
    }
})
const Result = () => {
    result.value = true;
}
const Shuffle = <T>(array: T[]): T[] => {
    // let currentIndex = array.length,  randomIndex;
    // while (currentIndex > 0) {
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex--;
    //     [array[currentIndex], array[randomIndex]] = [
    //         array[randomIndex], array[currentIndex]];
    // }

    return array;
}

const Select = (question: IQuestion, answer: IAnswer) => {
    if(question.multiple) {
        answer.selected = !answer.selected;
    }
    else {
        question.answers.forEach(a => a.selected = false);
        answer.selected = true;
    }
}


if(process.client) await GetTest();

</script>

<style lang="scss">
@import "/assets/variable.scss";
.page_test_id {
    .summary {
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
        @include font-subtitle
    }

    .question {
        @include font-normal-bold;
		padding: 20px 0 10px 0;
        border-top: 1px solid $c_gray_3
    }
    .answer {
        @include font-normal;
        padding: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
		border-radius: 4px;
		transition: 0.1s;
        margin-bottom: 2px;
        .select {
            min-width: 20px;
            
            width: 20px;
            height: 20px;
            border: 1px solid $c_text_2;
            border-radius: 20px;
            margin-right: 10px;
            transition: 0.3s;
            &.multi {
                border-radius: 4px;
            }
            &.selected {
                background-color: $c_main;
                border-color: $c_main;
            }
        }
        &:hover {
            background-color: $c_gray_3;
        }
        &.correct {
            background-color: rgba($c_positive, 0.5);
            &.select {
				background-color: rgba($c_positive, 0.5);
            }
        }
		&.incorrect {
			background-color: rgba($c_negative, 0.5);
		}
        &.result {
            pointer-events: none;
        }
    }
}
</style>