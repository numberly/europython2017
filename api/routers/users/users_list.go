package users

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/unrolled/render"
	rethink "gopkg.in/gorethink/gorethink.v3"

	"ep17_quizz/api/databases"
	"ep17_quizz/api/errors"
	"ep17_quizz/api/models"
	"ep17_quizz/api/utils"
)

func usersList(rw http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	ctx := req.Context()
	s := utils.LoggingFromContext(ctx)
	session := databases.RethinkFromContext(req.Context())

	cursor, err := rethink.Table("users").Run(session)
	if err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}

	users, err := models.GetUsers(cursor)
	if err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}

	rdr := render.New()
	rdr.JSON(rw, http.StatusOK, users)
}
