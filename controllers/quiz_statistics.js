var models = require('../models/models.js');
var estadisticas = { npreguntas:0, ncomentarios:0,psincomentarios:0,pconcomentarios:0};

/*
.schema Comments

CREATE TABLE `Comments` (
`id` INTEGER PRIMARY KEY AUTOINCREMENT, `texto` VARCHAR(255), 
`publicado` TINYINT(1) DEFAULT 0, `createdAt` DATETIME NOT NULL, ç
`updatedAt` DATETIME NOT NULL, 
`QuizId` INTEGER REFERENCES `Quizzes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);

CREATE TABLE `Quizzes` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `pregunta` VARCHAR(255), `respuesta` VARCHAR(255), `tema` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);

El número de preguntas	select count(*) from Quizzes;
El número de comentarios totales	select count(*) from Comments;
El número medio de comentarios por pregunta
media:Ncomentarios / Npreguntas
El número de preguntas sin comentarios	
select count( distinct quizzes.id )from quizzes, comments where (select count(*) from comments where comments.quizid=quizzes.id)=0;
El número de preguntas con comentarios
select count( distinct quizzes.id )from quizzes, comments where (select count(*) from comments where comments.quizid=quizzes.id)>0;


// Autoload                        :id de comentarios
exports.load = function(req, res, next) {
  //Quiz.count()
  models.Comment.find().then(function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else{next(new Error('No existe commentId=' + commentId))}
    }
  ).catch(function(error){next(error)});
};
*/
/*
exports.media = function(req, res, next) {
	var nPreguntas =0;
	var nComentarios =0;
	 models.Quiz.count().then(function (count){nPreguntas=count;console.log(nPreguntas);}).then(
	 models.Comment.count().then(function (count){nComentarios=count;console.log(nComentarios);})
	 ).then(   	  res.render('statistics/printStatistics.ejs', {nPreguntas: nPreguntas, errors: []});
));
*/
var nComentarios = function() {
	 models.Comment.count().then(function (count){
	 	return count;
//	 	res.render('statistics/printStatistics.ejs', {countComments: count, errors: []});
});
}
exports.showEstadisticas = function(req, res, next) {
	 models.Quiz.count().then(function (count){
	 	
	 	estadisticas.npreguntas=count;
	 	return estadisticas;})

	 .then(function(estadisticas){
	 		
	 		models.Comment.count().then(function (count){
		 	    estadisticas.ncomentarios=count;
		 	    return estadisticas;
		 		}).then(function(estadisticas){
		 		    		models.Quiz.count({distinct: 'id', include: [models.Comment], unique:true, where: ["quizId is not null"] }).then(function(count){
		 		    			estadisticas.pconcomentarios=count;
		 		    			// calculo a mano la diferencia
		 		    			estadisticas.psincomentarios=estadisticas.npreguntas - count;
								res.render('statistics/printStatistics.ejs', {countPreguntas: estadisticas.npreguntas,countComments: estadisticas.ncomentarios,countConComments:estadisticas.pconcomentarios,countSinComments:estadisticas.psincomentarios, errors: []});
					    	});
	 	 	 	 });
	 	 	 });
	 	 
};

 /*

 exports.showEstadisticas = function(req, res, next) {
	 models.Quiz.count().then(function (count){
	 	
	 	estadisticas.npreguntas=count;
	 	return estadisticas;}).then(function(estadisticas){
	 		
	 		models.Comment.count().then(function (count){
		 	    estadisticas.ncomentarios=count;
		 	    return estadisticas;
		 		}).then(function(estadisticas){
	 				res.render('statistics/printStatistics.ejs', {countPreguntas: estadisticas.npreguntas,countComments: estadisticas.ncomentarios,countConComments:estadisticas.pconcomentarios,countSinComments:estadisticas.psincomentarios, errors: []});
	 	 	 	 });
	 	 	 });
	 	 
	 };
}

exports.nPreguntas0 = function(req, res, next) {
	 models.Quiz.count().then(function (count){
	 	nPreguntas=count;
	 	console.log(nPreguntas);
	 	comentarios=nComentarios();
 		res.render('statistics/printStatistics.ejs', {countPreguntas: count,countComments: nComentarios, errors: []});
	 });
}

 

   

    		models.Quiz.findAll().then(function(estadisticas){
    	for (wi=0; wi<quiz.length;wi++){
    		quizIdValue=quiz[wi].dataValues.id;
    		console.log(quizIdValue);
    		models.Comment.count( { where:{quizId:quizIdValue}}).then(function(count){
    			if (count==0){estadisticas.psincomentarios++;}
    			if (count!=0){estadisticas.pconcomentarios++;}

    		});
    	}



	var nPreguntas =0;
	var nComentarios =0;
	 models.Quiz.count().then(function (count){nPreguntas=count;console.log(nPreguntas);}).then(
	 models.Comment.count().then(function (count){nComentarios=count;console.log(nComentarios);})
	 ).then(   	  res.render('statistics/printStatistics.ejs', {nPreguntas: nPreguntas, errors: []});
));

	 //nMedia =nComentarios/nPreguntas;
	 //nPreguntasConComentarios=0;
	 //nPreguntasSinComentarios=0;
    models.Quiz.findAll().then(function(quiz){
    	for (wi=0; wi<quiz.length;wi++){
    		quizIdValue=quiz[wi].dataValues.id;
    		console.log(quizIdValue);
    		models.Comment.count( { where:{quizId:quizIdValue}}).then(function(count){
    			if (count==0){nPreguntasSinComentarios++;}
    			if (count!=0){nPreguntasConComentarios++;}

    		});
    	}
   	  res.render('statistics/printStatistics.ejs', {nPreguntas: nPreguntas, errors: []});

    	}


    find({
            where: {
                id: Number(quizId)
            },
            include: [{
                model: models.Comment
            }]
        }).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};
*/