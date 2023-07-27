import { User } from "./users/user.entity"

require('dotenv').config({
    path: `./${process.env.NODE_ENV}.env`
})

export const ormconfig : any =  {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    // ssl:true,
    synchronize: true,
}
