package ws

import (
	log "github.com/Sirupsen/logrus"
	rethink "gopkg.in/gorethink/gorethink.v3"

	"ep17_quizz/api/databases"
	"ep17_quizz/api/models"
	"ep17_quizz/api/utils/sockets"
)

// UserChange catch old and new value from gorethink Changes
type UserChange struct {
	Old *models.User `gorethink:"old_val"`
	New *models.User `gorethink:"new_val"`
}

func broadcastScore(hub *sockets.Hub) error {
	session, _ := databases.NewRethink()

	query := rethink.Table("users")
	curs, err := query.Changes().Run(session)
	if err != nil {
		log.Errorf("Failed to init listen change: %v", err)
		return err
	}
	changes := make(chan UserChange)
	curs.Listen(changes)
	go listenScoreChange(hub, curs, changes)
	return nil
}

func listenScoreChange(hub *sockets.Hub, curs *rethink.Cursor, changes <-chan UserChange) {
	defer curs.Close()
	for {
		select {
		case c, ok := <-changes:
			if !ok {
				return
			}
			if c.New != nil {
				hub.Broadcast <- &sockets.Message{
					Content: c.New,
				}
			}
		}
	}
}
