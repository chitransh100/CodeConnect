const mongoose=require("mongoose");
//we can either directly connect as
// mongoose.connect("connection url");
//but is better to use asyn await 
// const connectDB = async()=>{
//     await mongoose.connect("connection url");
//     //then call the function connectDB as
// }
// connectDB().then(()=>{
//     console.log("connect successfully ");}).
// catch((err)=>{
//     console.log(err);})
//but its better to use ->
const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://kumarchitransh12:kallooram%401972%40@project0.vz42l.mongodb.net/CodeConnect");
    //then call the function connectDB as
}
module.exports=connectDB;
//and import the function in app.js and then 
// connectDB().then(()=>{
//     console.log("connected to DB");
//     app.listen(PORT, (error) => {
//         if (!error) {
//             console.log(`Server is listening on port ${PORT}`);
//         } else {
//             console.error("Error in starting the server:", error);
//         }
//     });
// }).catch((err)=>{
//     console.log(err)
// })