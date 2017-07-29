package ws

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"golang.org/x/net/websocket"

	"ep17_quizz/api/utils/sockets"
)

func websocketHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	s := websocket.Server{Handler: websocket.Handler(socket)}
	s.ServeHTTP(w, r)
}

func socket(s *websocket.Conn) {
	defer s.Close()

	client := sockets.NewClient(s)
	client.Listen()
}
