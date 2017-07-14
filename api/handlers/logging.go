package handlers

import (
	"context"
	"net/http"
	"time"

	log "github.com/Sirupsen/logrus"
	"github.com/julienschmidt/httprouter"

	"ep17_quizz/api/utils"
)

// Logging ...
func Logging(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		s := utils.LoggingContext{Fields: log.Fields{}}
		newReq := r.WithContext(context.WithValue(r.Context(), utils.KeyStat, &s))

		defer func(t time.Time, r *http.Request) {
			if s := r.Context().Value(utils.KeyStat); s != nil {
				stats := s.(*utils.LoggingContext)
				stats.Fields["method"] = r.Method
				stats.Fields["path"] = r.URL.Path
				stats.Fields["ip"] = r.RemoteAddr
				stats.Fields["duration"] = time.Since(t).Nanoseconds() / 1000

				data := log.WithFields(stats.Fields)
				if stats.StatusCode >= 200 && stats.StatusCode < 300 {
					data.Info(stats.Message)
				} else {
					data.Error(stats.Message)
				}
			}
		}(time.Now(), newReq)

		next(w, newReq, ps)
	}
}
