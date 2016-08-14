var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var db = mongojs('bukutamu',["bukutamu"]);
var http = require('http').Server(app);
app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use('/bootstrap-3.3.7-dist',express.static(__dirname + '/bootstrap-3.3.7-dist'));
app.use('/js',express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get("/",function(req,res){
res.render("index.jade");
});
app.get("/ambil_bukutamu",function(req,res){
  db.bukutamu.find(function(err,docs){
    res.json(docs)
  })
});
app.post("/editbukutamu",function(req,res){
  var id = req.body.id;
    db.bukutamu.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set:{nama:req.body.nama,notlp:req.body.notlp,alamat:req.body.alamat}},new:true},function(err,doc){
      res.json(doc);
    });
});
app.post("/hapusbukutamu",function(req,res){
  var id =  req.body.id;
  db.bukutamu.remove( {_id: mongojs.ObjectId(id)},1);
  res.json();
})
app.post("/simpanbukutamu",function(req,res){
  db.bukutamu.insert(req.body,function(err,docs){
    res.json(docs)
  })
})
http.listen(3000);
