package handlers

import (
	"errors"
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/julienschmidt/httprouter"

	cErrors "ep17_quizz/api/errors"
	"ep17_quizz/api/utils"
)

// Panic handler catch panic to return a consistent response
func Panic(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		// Note: this defer should be first see "stack deferred"
		// defer utils.TimeTrack(time.Now(), utils.MetricGlobalResponse)

		var err error
		defer func() {
			s := utils.LoggingFromContext(r.Context())
			r := recover()
			if r != nil {
				switch t := r.(type) {
				case string:
					err = errors.New(t)
				case error:
					err = t
				default:
					err = errors.New("Unknown error")
				}
				log.Errorf("Panic handler error : %v.", err)
				cErrors.WriteHTTP(w, cErrors.ErrInternalError, s)
			}
		}()
		next(w, r, ps)
	}
}
