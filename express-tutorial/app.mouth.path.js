const express = require('express');
const app = express();  // the main app
const user = express(); // the sub app
const PORT = 3000;
 
user.get('/', function (req, res) {
      console.log(user.mountpath); // /user
      res.send('User Homepage');
});
 
app.use('/user', user); // Mounting the sub app
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});