package sockets

import (
	"io"

	"golang.org/x/net/websocket"
)

// Client contain websocket informations and chan
type Client struct {
	Connection *websocket.Conn
	ch         chan *Message
	close      chan bool
}

// NewClient generate a new client sockect
func NewClient(ws *websocket.Conn) *Client {
	ch := make(chan *Message, 100)
	close := make(chan bool)

	client := &Client{ws, ch, close}
	hub.register <- client
	return client
}

// Listen write and read, send a Greeting message
func (c *Client) Listen() {
	go c.listenToWrite()
	c.Greeting()
	c.listenToRead()
}

// Greeting send a message to the client, usefull to show the server listen you
func (c *Client) Greeting() {
	c.ch <- &Message{"Welcome!"}
}

func (c *Client) listenToWrite() {
	for {
		select {
		case msg := <-c.ch:
			websocket.JSON.Send(c.Connection, msg)

		case <-c.close:
			c.close <- true
			hub.unregister <- c
			return
		}
	}
}

func (c *Client) listenToRead() {
	for {
		select {
		case <-c.close:
			c.close <- true
			hub.unregister <- c
			return

		default:
			var msg Message
			err := websocket.JSON.Receive(c.Connection, &msg)
			if err == io.EOF {
				c.close <- true
				hub.unregister <- c
			} else if err != nil {
			}
		}
	}
}
