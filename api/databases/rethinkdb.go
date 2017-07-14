package databases

import (
	"context"

	rethink "gopkg.in/gorethink/gorethink.v3"

	"ep17_quizz/api/utils"
)

// RethinkConfig handle database connection parameters
var RethinkConfig rethink.ConnectOpts

// NewRethink init new connection to the server from the defined
//config RethinkConfig
func NewRethink() (*rethink.Session, error) {
	return rethink.Connect(RethinkConfig)
}

// RethinkToContext put session for the defined user call in context
func RethinkToContext(ctx context.Context, session *rethink.Session) context.Context {
	newctx := context.WithValue(ctx, utils.KeyRethink, session)
	return newctx
}

// RethinkFromContext retrieve from context the session database
// It permit for any function who had ctx to communicate with rethink
func RethinkFromContext(ctx context.Context) *rethink.Session {
	if db := ctx.Value(utils.KeyRethink); db != nil {
		return db.(*rethink.Session)
	}
	return nil
}
