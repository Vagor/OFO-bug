var express = require('express');
var port = process.env.PROT || 3000; //进程.环境变量.端口
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

// initializing
var app = express();

// setting
app.set('views', './views'); //设置视图根目录
app.listen(port); //设置监听端口
app.use(bodyParser.urlencoded())
app.use(serveStatic('public'));
console.log('ofo_hust started on prot ' + port);

// connect mongodb
mongoose.connect('mongodb://localhost/ofo_hust');
// Schema
var OFOSchema = new mongoose.Schema({
    pn: Number,
    code: Number
});
OFOSchema.statics.findByPN = function(pn, cb) {
        this.findOne({
            pn: pn
        }, cb);
    }
    // Model
var OFOModel = mongoose.model('ofo', OFOSchema);

// index page
app.get('/', function(req, res) { //prama：路由匹配格式  回调方法
    res.sendFile('/Users/Vagor/GitHub/OFO_HUST/public/index.html');
})

// search
app.post('/search', function(req, res) {
    var plateNumber = req.body.plateNumber;
    OFOModel.findByPN(plateNumber, function(err, ofo) {
        if (ofo) {
            console.log(ofo);
            res.json({
                success: 1,
                code: ofo.code
            })
        } else {
            res.json({
                success: 0,
            })
        }

    })

})


// save
app.post('/save', function(req, res) {
    var code = req.body.codeSave;
    var plateNumber = req.body.plateNumberSave;

    console.log(code);
    // create an ofo entity
    ofoEntity = new OFOModel({
        pn: plateNumber,
        code: code
    })
    ofoEntity.save();
    res.json({
        success: '1'
    })
})
