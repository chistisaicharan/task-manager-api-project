

const app=require("./app")

const sequelize=require("./config/db");

require("dotenv").config()

const PORT=process.env.PORT

require("./models/task_model")
require("./models/user_model")

const routes=require("./routes/auth.route")

app.use(routes)

sequelize.authenticate()
.then(()=>console.log("DB is Connected Successfully"))
.catch((err)=>console.log("DB Error",err))

sequelize.sync({alter:true})
.then(()=>console.log("Table synced"))
.catch((err)=>console.log("Table err",err))

app.listen(PORT,()=>{
    console.log(`Server is Running On port : ${PORT}`)
});