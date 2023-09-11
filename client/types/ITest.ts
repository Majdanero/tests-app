import {ComputedRef} from "vue";

export interface ITest {
    id: number
    name: string,
    created_at: number,
    updated_at: number,
    questions: IQuestion[]

}
export interface IQuestion {
    id: number,
    test_id: number
    content: string,
    multiple: boolean,
    created_at: number,
    updated_at: number,
    answers: IAnswer[]
    correct?: ComputedRef<boolean>
}
export interface IAnswer {
    id: number,
    question_id: number
    content: string,
    correct: boolean,
    created_at: number,
    updated_at: number,
    selected?: boolean
}