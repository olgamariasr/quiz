 exports.autor = function(req, res){

 	res.render('autor'); 	
 };
 // GET /quizes/question
/*
 exports.question = function(req, res){

 	res.render('quizes/question',{pregunta:'Capital de Italia'}); 	
 };

 exports.answer = function(req, res){
 	if (req.query.respuesta== 'Roma'){
 		res.render('quizes/answer',{respuesta:'Correcto'});		
 	}else{
 		res.render('quizes/answer',{respuesta:'Incorrecto'});
 	}
 }; 
 */
var models= require('../models/models.js');
/*
  // GET /quizes/question
 exports.question = function(req, res){
 	models.Quiz.findAll().success(function (quiz) {
 	res.render('quizes/question',{pregunta:quiz[0].pregunta}); 	
 })
 };

 exports.answer = function(req, res){
 	models.Quiz.findAll().success(function (quiz) {

 	if (req.query.respuesta== quiz[0].respuesta){
 		res.render('quizes/answer',{respuesta:'Correcto'});		
 	}else{
 		res.render('quizes/answer',{respuesta:'Incorrecto'});
 	}
 	 })
 };  
 */
 // Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};
 // GET /quizes
// GET /users/:userId/quizes
exports.index = function(req, res) {  
/*
  searchValue = req.query.search;
  console.log(searchValue);
  searchValue= searchValue.replace(/^\s+|\s+$/g, ''); 
  //searchValue= searchValue.trim(); 

  models.Quiz.findAll({where: ["pregunta like ?", searchValue]}).then(
*/
   searchValue = req.query.search||"";
   searchValue= searchValue.trim();
   searchValue=(searchValue=="")?searchValue:"%"+searchValue+"%";

    console.log(searchValue);
  models.Quiz.findAll({where: ["pregunta like ?", searchValue]}).then(

    function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }
  ).catch(function(error){next(error)});
};
// GET /quizes/:id
exports.show = function(req, res) {
  			res.render('quizes/show', { quiz: req.quiz});
};            // req.quiz: instancia de quiz cargada con autoload

// GET /quizes/:id/answer
exports.answer = function(req, res) {
var resultado="Incorrecto";
  if (req.query.respuesta === req.quiz.respuesta) {
     	resultado="Correcto";
 
  }
  res.render('quizes/answer', { quiz: req.quiz, respuesta : resultado});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz 
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  /*req.body.quiz.UserId = req.session.user.id;
  if(req.files.image){
    req.body.quiz.image = req.files.image.name;
  }*/
  var quiz = models.Quiz.build( req.body.quiz );
/*
  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {*/
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta", "UserId", "image"]})
        .then( function(){ res.redirect('/quizes')})
   /* }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});*/
};
