import {knex, Knex} from "knex";

export class DataBase {
    private static instance : DataBase;
    public db : Knex;

    private constructor() {
        this.db = knex({
            client: 'sqlite3',
            useNullAsDefault: true,
            connection: {
                filename: './dev.sqlite'
            },
        });
    }
    public static GetInstance() : DataBase {
        if(!this.instance) this.instance = new DataBase();
        return this.instance;
    }
}