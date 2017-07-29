package sockets

// Message reflect the interface returned to the app
type Message struct {
	Content interface{} `json:"content"`
}
