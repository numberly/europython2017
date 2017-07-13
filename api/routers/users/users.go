package users

import (
	"github.com/julienschmidt/httprouter"

	"ep17_quizz/api/routers"
)

// NewRouter intialize a router with User ressources
func NewRouter(router *httprouter.Router) {
	router.POST("/api/users", routers.Basic(usersCreate))
	router.GET("/api/users", routers.Basic(usersList))
	router.GET("/api/users/:id", routers.Basic(usersRetrieve))
}
