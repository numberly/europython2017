package ws

import (
	"github.com/julienschmidt/httprouter"

	"ep17_quizz/api/utils/sockets"
)

// NewRouter intialize a router with User ressources
func NewRouter(router *httprouter.Router) {
	hub := sockets.GetHub()
	go hub.Run()
	broadcastScore(hub)
	router.GET("/api/socket", websocketHandler)
}
