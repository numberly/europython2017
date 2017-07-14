package utils

import (
	"context"

	log "github.com/Sirupsen/logrus"
)

// LoggingContext type encapsulates all informations in a call
type LoggingContext struct {
	Fields     log.Fields
	StatusCode int
	Message    string
}

// LoggingFromContext TODO
func LoggingFromContext(ctx context.Context) *LoggingContext {
	if s := ctx.Value(KeyStat); s != nil {
		return s.(*LoggingContext)
	}
	return &LoggingContext{Fields: log.Fields{}}
}
