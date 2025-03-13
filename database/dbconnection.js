import { connect } from "mongoose"

const dbconnection = connect("mongodb://localhost:27017/Assignment08")
    .then(() => console.log("DB connected Successfully"))
    .catch((error) => console.log("Error in connecting DataBase:", error))

export default dbconnection