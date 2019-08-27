let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let viewPath = __dirname + "/views/";
app.get('/',function(req,res){
    res.sendFile(viewPath + "index.html");
});

let db =[];
app.use(bodyParser.urlencoded({extended:false}));

app.engine('html',require('ejs').renderFile);
app.set('view engine','html');


app.get('/addnewtaskw4',function(req,res){
    res.sendFile(viewPath + "addnewtask.html");
});

app.get('/listalltasksw4',function(req,res){
    res.render(viewPath + "listalltasks.html",{
        taskDb: db
    });
});

app.post('/addthetask',function(req,res){
  console.log(req.body);
  db.push(req.body);
  res.render(viewPath + "listalltasks.html",{
      taskDb: db
  });
  
});

app.listen(8080);