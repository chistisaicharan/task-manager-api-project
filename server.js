

const app=require("./app")

const sequelize=require("./config/db");

require("dotenv").config()

const PORT=process.env.PORT

sequelize.authenticate()
.then(()=>console.log("DB is Connected Successfully"))
.catch((err)=>console.log("DB Error",err))

app.listen(PORT,()=>{
    console.log(`Server is Running On port : ${PORT}`)
});