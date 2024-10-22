import {Sequelize} from 'sequelize';

// tạo object sequelize để connect tới database 
const sequelize = new Sequelize(
    "node47_youtube", // tên database
    "root", // user name 
    "123456",// passworld
    {
        host: "localhost",
        port: 3302 ,
        dialect: "mysql",
    } 
);

export default sequelize;