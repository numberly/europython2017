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

func usersRetrieve(rw http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	ctx := req.Context()
	s := utils.LoggingFromContext(ctx)
	session := databases.RethinkFromContext(req.Context())

	u := models.User{ID: ps.ByName("id")}
	if err := u.GetUser(session); err != nil {
		switch err {
		case rethink.ErrEmptyResult:
			errors.WriteHTTP(rw, errors.ErrNotFound, s)
		default:
			errors.WriteHTTP(rw, errors.ErrInternalError, s)
		}
		return
	}

	rdr := render.New()
	rdr.JSON(rw, http.StatusOK, u)
}
