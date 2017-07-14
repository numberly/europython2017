package questions

import (
	"github.com/julienschmidt/httprouter"

	"ep17_quizz/api/routers"
)

// NewRouter intialize a router with User ressources
func NewRouter(router *httprouter.Router) {
	router.GET("/api/questions", routers.Basic(questionsList))
	router.GET("/api/questions/:id", routers.Basic(validateCreate))
}
