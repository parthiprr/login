var express=require("express");
var bodyParser=require("body-parser");
var path=require("path");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/loginform');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));


app.post('/sign_up', (req,res)=>{
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.send('<h1>success</h1>');
})

app.get('/',(req, res)=>{
res.sendFile((path.join(__dirname,'index.html')));

})

app.listen(3000,()=>{
	console.log("server listening at port 3000");
})


