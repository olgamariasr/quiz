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
  
  models.Quiz.findAll().then(
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