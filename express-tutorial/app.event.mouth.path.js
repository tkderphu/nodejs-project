const express = require('express');
const app = express(); // The main app 
const student = express();
const teacher = express();
const PORT = 3000;
 
// Multiple mounting 
teacher.on('mount', function (parent) {
    console.log('Teacher Mounted');
});
 
student.on('mount', function (parent) {
    console.log('Student Mounted');
});

teacher.get("/john", (req, res)=>{
    res.send('hello john')
})
 
app.use('/student', student);
app.use('/teacher', teacher);
 
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});