
//[res.render(): It allows the user to use static files in the application, 
//during the runtime, the engine will replace the variables 
//which are in template file with the actual values and 
//convert the template into a HTML page, then send the page to the client. ]


let express = require('express');
let app = express();

//[Third-party middleware fun can be used to add functionality to express apps]
let bodyParser = require('body-parser'); //[create an instance]
                               /*bodyParser is used to parse and generate
                               the payload of the incoming POST*/

let viewPath = __dirname + "/views/"; /*viewPath: required for 
                                       response.sendFile func */
                                 /* __dirname is the  directory 
                                name of the current module*/
 app.use(express.static('views'));   

app.get('/',function(req,res){
    res.sendFile(viewPath + "index.html"); //[generate relative path:viewPath + "index.html"]
});

let db =[]; //list of tasks
app.use(bodyParser.urlencoded({extended:false})); //link express to the bodyParser

app.engine('html',require('ejs').renderFile); /*express should be 
                                able to render ejs templates, ejs: embed js into html*/ 
app.set('view engine','html');

//[request to add new task]
app.get('/addnewtaskw4',function(req,res){
    res.sendFile(viewPath + "addnewtask.html");//[send addnewtask.html back to user]
});
//[request to list all tasks]
app.get('/listalltasksw4',function(req,res){
    res.render(viewPath + "listalltasks.html",{ //[content of page listalltasks will be changed 
        taskDb: db                           //dynamically, a copy of list 
    });                                      //will be sent to rendering engine] 
});

//[user clicks submit button]
app.post('/addthetask',function(req,res){ //[method is equal to post]
  console.log(req.body);
  db.push(req.body);                 //[bodyParser generates body object]
  res.render(viewPath + "listalltasks.html",{ //[After adding new task,
                                            // redirect user to listalltasks.html] 
      taskDb: db       //[Rendering engine put data of html into js, 
  });                   // should have an obj "taskDb" is equal to the db]
});
app.listen(8080);      //[important: <% } %>: begin and close tag for embeded js, 
                         //used for switching between html and js]