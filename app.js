const express = require("express");

const bodyParser = require("body-parser");

const gtts = require('gtts')

const fs = require("fs");

var cors =  require('cors');


const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/texttospeechdemo',(req,res) => {
  res.render('texttospeechdemo',{title:"Text to Speech Demo - Free Media Tools"})
})

app.get('/texttospeechdemo/:text',(req,res) => {
  var text = req.params.text;

  var language = "en"

  outputFilePath = Date.now() + "output.mp3"

  var voice = new gtts(text,language)

  voice.save(outputFilePath,function(err,result){
    if(err){
      fs.unlinkSync(outputFilePath)
      res.send("Unable to convert to audio")
    }
    res.download(outputFilePath,(err) => {
      if(err){
        fs.unlinkSync(outputFilePath)
        res.send("Unable to download the file")
      }

      fs.unlinkSync(outputFilePath)
    })
  })
})

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});