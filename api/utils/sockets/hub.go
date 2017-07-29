package sockets

// Hub maintains the set of active clients and broadcasts messages to the
// clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client

	// Inbound messages from the clients.
	Broadcast chan *Message
}

var hub *Hub

func init() {
	hub = &Hub{
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		Broadcast:  make(chan *Message),
	}
}

// GetHub allow to retrieve package ar hub
func GetHub() *Hub {
	return hub
}

// Run enable listen of channels
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				close(client.ch)
				delete(hub.clients, client)
			}
		case message := <-h.Broadcast:
			for client := range h.clients {
				select {
				case client.ch <- message:
				default:
					close(client.ch)
					delete(h.clients, client)
				}
			}
		}
	}
}
