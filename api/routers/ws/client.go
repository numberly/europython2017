package ws

import (
	"fmt"
	"io"

	log "github.com/Sirupsen/logrus"
	"golang.org/x/net/websocket"
)

type Client struct {
	ID         string
	connection *websocket.Conn
	ch         chan *Message
	close      chan bool
}

func init() {
	hub = &Hub{
		clients: make(map[*Client]bool),
	}
}

func NewClient(ws *websocket.Conn, ID string) *Client {
	ch := make(chan *Message, 100)
	close := make(chan bool)

	client := &Client{ID, ws, ch, close}
	hub.register <- client
	return client
}

func (c *Client) listen() {
	go c.listenToWrite()
	c.listenToRead()
}

func (c *Client) listenToWrite() {
	for {
		select {
		case msg := <-c.ch:
			websocket.JSON.Send(c.connection, msg)

		case <-c.close:
			c.close <- true
			hub.unregister <- c
			log.Info("Delete client...")
			return
		}
	}
}

func (c *Client) listenToRead() {
	for {
		select {
		case <-c.close:
			c.close <- true
			log.Info("Delete client...")
			hub.unregister <- c
			return

		default:
			var msg Message
			err := websocket.JSON.Receive(c.connection, &msg)
			fmt.Printf("Received: %+v\n", msg)
			if err == io.EOF {
				c.close <- true
				hub.unregister <- c
			} else if err != nil {
				// c.server.Err(err)
			} else {
				broadcast(&msg)
			}
		}
	}
}
