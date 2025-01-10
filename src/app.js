const express = require("express");
const app = express();
const PORT = 7777; 
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is listening on port ${PORT}`);
    } else {
        console.error("Error in starting the server:", error);
    }
});
// app.use("/", (req, res) => {
//     res.send("Hello world");
// });
// app.use("/hello",(req,res)=>{
//     res.send("hello ");
// })
// app.use("/test",(req,res)=>{
//     res.send("hello from the server");
// })
app.use("/user",(req,res)=>{
    res.send("i will never give chance to other")
})
app.get("/user",(req,res)=>{
    res.send({name:"chitransh",age:"22"})
})
app.post("/user",(req,res)=>{
    res.send("data saved to database")
})
app.delete("/user",(req,res)=>{
    res.send("deleted !!")
})