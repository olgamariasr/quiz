var express = require('express');
// b: Importar quiz_controller.js en routes/index.js.js
var quizController = require('../controllers/quiz_controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
// Introducir nuevas rutas en el enrutador routes/index.js
// GET /quizes/question y GET /quizes/answer
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/autor', quizController.autor);

module.exports = router;
