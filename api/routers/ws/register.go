package ws

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"golang.org/x/net/websocket"
)

type Message struct {
	Author  string `json:"author"`
	Content string `json:"content"`
}

func websocketHandler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	s := websocket.Server{Handler: websocket.Handler(socket)}
	s.ServeHTTP(w, r)
}

func socket(s *websocket.Conn) {
	defer s.Close()

	client := NewClient(s, "id...")
	greet(client)
	client.listen()
}
