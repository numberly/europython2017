package ws

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"golang.org/x/net/websocket"
)

func greet(client *Client) {
	websocket.JSON.Send(client.connection, Message{"Server", "Welcome!"})
}

func readMsgFromRequest(r *http.Request) string {
	return "another message"
}

func broadcastHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	msg := readMsgFromRequest(r)
	broadcast(&Message{"Server", msg})
	fmt.Fprintf(w, "Broadcasting %v to %d clients", msg, len(hub.clients))
}

func broadcast(msg *Message) {
	fmt.Printf("Broadcasting %+v\n", msg)
	for c := range hub.clients {
		c.ch <- msg
	}
}

// NewRouter intialize a router with User ressources
func NewRouter(router *httprouter.Router) {
	go hub.run()
	router.GET("/api/socket", websocketHandler)
	router.GET("/api/socket/broadcast", broadcastHandler)
}
