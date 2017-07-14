package handlers

import (
	"net/http"

	"github.com/julienschmidt/httprouter"

	"ep17_quizz/api/databases"
	"ep17_quizz/api/errors"
	"ep17_quizz/api/utils"
)

// Rethink open connexion and defer close
func Rethink(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

		session, err := databases.NewRethink()
		if err != nil {
			s := utils.LoggingFromContext(r.Context())
			errors.WriteHTTP(w, errors.ErrServiceUnreachable, s)
		}
		defer session.Close()

		newCtx := databases.RethinkToContext(r.Context(), session)
		next(w, r.WithContext(newCtx), ps)
	}
}
