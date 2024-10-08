import {Sequelize} from 'sequelize';

//
const sequelize = new Sequelize(
    "node47_youtube",
    "root", // user name 
    "123456",
    {
        host: "localhost",
        port: 3302 ,
        dialect: "mysql",
    } // passworld
);

export default sequelize;