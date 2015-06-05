var express = require('express');
var router = express.Router();

// b: Importar quiz_controller.js en routes/index.js.js
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', quizController.load); //autoload :quizId

// Introducir nuevas rutas en el enrutador routes/index.js
// GET /quizes/question y GET /quizes/answer
/*
router.get('/quizes/question', quizController.question);
*/
router.get('/quizes/answer', quizController.answer);

router.get('/autor', quizController.autor);

router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.get('/quizes/create',               quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);

module.exports = router;
