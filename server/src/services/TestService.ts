import {DataBase} from "../app/DataBase";
interface ITest {
    id: number
    name: string,
    created_at: number,
    updated_at: number,
    questions?: IQuestion[]

}
interface IQuestion {
    id: number,
    test_id: number
    content: string,
    multiple: boolean,
    created_at: number,
    updated_at: number,
    answers?: iAnswer[]
}

interface iAnswer {
    id: number,
    question_id?: number
    content: string,
    correct: boolean,
    created_at: number,
    updated_at: number,
}

export class TestService {
    public static tableNameTest = 'test'
    public static tableNameQuestion = 'question'
    public static tableNameAnswer = 'answer'
    public static async Example() : Promise<boolean> {
        const db = DataBase.GetInstance().db;
        const existTest = await db.schema.hasTable(this.tableNameTest)
        const existQuestion = await db.schema.hasTable(this.tableNameQuestion)
        const existAnswer = await db.schema.hasTable(this.tableNameAnswer)

        if(!existTest) await db.schema.createTable(this.tableNameTest, (table) => {
            table.increments();
            table.string('name');
            table.date('created_at');
            table.date('updated_at');
        })
        if(!existQuestion) await db.schema.createTable(this.tableNameQuestion, (table) => {
            table.increments();
            table.integer('test_id').references('id').inTable(this.tableNameTest)
            table.string('content');
            table.boolean('multiple');
            table.date('created_at');
            table.date('updated_at');
        })
        if(!existAnswer) await db.schema.createTable(this.tableNameAnswer, (table) => {
            table.increments();
            table.integer('question_id').references('id').inTable(this.tableNameQuestion)
            table.string('content');
            table.boolean('correct');
            table.date('created_at');
            table.date('updated_at');
        })
        return true
    }

    private static get TestDB() {
        const db = DataBase.GetInstance().db;
        return  db<ITest>(this.tableNameTest)
    }
    private static get QuestionDB() {
        const db = DataBase.GetInstance().db;
        return  db<IQuestion>(this.tableNameQuestion)
    }
    private static get AnswerDB() {
        const db = DataBase.GetInstance().db;
        return  db<iAnswer>(this.tableNameAnswer)
    }
    public static async CreateTest(name: string) : Promise<number> {
        const result = await this.TestDB.insert({
            name,
            created_at: Date.now()
        })
        return result[0];
    }
    public static async CreateQuestion(test_id: number, content: string, multiple: boolean) : Promise<number> {
        const result = await this.QuestionDB.insert({
            test_id,
            content,
            multiple,
            created_at: Date.now()
        })
        return result[0];
    }
    public static async CreateAnswer(question_id: number, content: string, correct: boolean) : Promise<number> {
        const result = await this.AnswerDB.insert({
            question_id,
            content,
            correct,
            created_at: Date.now()
        })
        return result[0];
    }
    public static async EditTest(id: number, name: string) : Promise<number> {
        const check = await this.TestDB.where({id}).first()
        if(!check) throw 'test not exist';
        return this.TestDB.where({id}).update({
            name,
            updated_at: Date.now()
        });
    }
    public static async EditQuestion(id: number, {content, multiple} : {content?: string, multiple?: boolean}) : Promise<number> {
        const check = await this.QuestionDB.where({id}).first()
        if(!check) throw 'question not exist';
        return this.QuestionDB.where({id}).update({
            content: content !== undefined ? content : check.content,
            multiple: multiple !== undefined ? multiple : check.multiple,
            updated_at: Date.now()
        });
    }
    public static async EditAnswer(id: number, {content, correct} : {content?: string, correct?: boolean}) : Promise<number> {
        const check = await this.AnswerDB.where({id}).first()
        if(!check) throw 'answer not exist';
        return this.AnswerDB.where({id}).update({
            content: content !== undefined ? content : check.content,
            correct: correct !== undefined ? correct : check.correct,
            updated_at: Date.now()
        });
    }
    public static async DeleteTest(id: number) : Promise<boolean> {
        const test = await this.TestDB.where({id}).first()
        if(!test) throw 'test not exist';
        const questions = await this.QuestionDB.where({test_id: id})
        const questionsIds = questions.map(q => q.id)
        await this.AnswerDB.orWhere('question_id', questionsIds).delete();
        await this.QuestionDB.where({test_id: id}).delete();
        await this.TestDB.where({id}).delete();
        return true;
    }
    public static async DeleteQuestion(id: number) : Promise<boolean> {
        const question = await this.QuestionDB.where({id}).first()
        if(!question) throw 'question not exist';
        await this.AnswerDB.where({question_id: id}).delete();
        await this.QuestionDB.where({id}).delete();
        return true;
    }
    public static async DeleteAnswer(id: number) : Promise<boolean> {
        const answer = await this.AnswerDB.where({id}).first()
        if(!answer) throw 'answer not exist';
        await this.AnswerDB.where({id}).delete();
        return true;
    }

    public static async GetTests() : Promise<ITest[]> {
        return this.TestDB.select('*');
    }
    public static async GetTest(id: number) : Promise<ITest> {
        const test = await this.TestDB.where({id}).first();
        if(!test) throw 'test not exist';
        const questions = await this.QuestionDB.where({test_id: id}).select('*');
        test.questions = await Promise.all(questions.map(async (question) => {
            question.answers = await this.AnswerDB.where({question_id: question.id}).select('*');
            return question
        }))
        return test;
    }


}