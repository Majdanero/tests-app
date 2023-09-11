import {RouterFactory} from "../app/RouterFactory";
import {TestController} from "../controllers/TestController";
import {verify} from "../middlewares/verify";
import {BodyValidator, EConfig} from "../middlewares/BodyValidator";

export default new RouterFactory([
    RouterFactory.Post('/test', TestController.CreateTest, [BodyValidator({
        name: {type: EConfig.string, required: true, min: 3, max: 24}
    })]),
    RouterFactory.Post('/test/:id/question', TestController.CreateQuestion, [BodyValidator({
        content: {type: EConfig.string, required: true, min: 3, max: 255},
        multiple: {type: EConfig.boolean, required: true}
    })]),
    RouterFactory.Post('/question/:id/answer', TestController.CreateAnswer, [BodyValidator({
        content: {type: EConfig.string, required: true, min: 3, max: 255},
        correct: {type: EConfig.boolean, required: true}
    })]),

    RouterFactory.Put('/test/:id', TestController.EditTest, [BodyValidator({
        name: {type: EConfig.string, required: false, min: 3, max: 24}
    })]),
    RouterFactory.Put('/question/:id', TestController.EditQuestion, [BodyValidator({
        content: {type: EConfig.string, required: false, min: 3, max: 255},
        multiple: {type: EConfig.boolean, required: false}
    })]),
    RouterFactory.Put('/answer/:id', TestController.EditAnswer, [BodyValidator({
        content: {type: EConfig.string, required: false, min: 3, max: 255},
        correct: {type: EConfig.boolean, required: false}
    })]),

    RouterFactory.Delete('/test/:id', TestController.DeleteTest),
    RouterFactory.Delete('/question/:id', TestController.DeleteQuestion),
    RouterFactory.Delete('/answer/:id', TestController.DeleteAnswer),

    RouterFactory.Get('/tests', TestController.GetTests),
    RouterFactory.Get('/test/:id', TestController.GetTest),
    RouterFactory.Get('/', () => 'test'),
]);
