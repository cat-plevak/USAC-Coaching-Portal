var express = require('express');
var router = express.Router();

// Registration home page
router.get('/', (req, res, next) => {

  res.render('body/home', {
    title: '',
    _layoutFile: 'layout.ejs'
  });

})

router.post('/', (req,res,next) => {
  // let match = false;
  //
  // if(bcrypt.compareSync(req.body.password, req.body.hash)){
  //   match = true;
  // }
  // res.render('compare',{passwordMatched:match})
  console.log('information received');
  console.log(res.body);
})

module.exports = router;
