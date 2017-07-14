package users

import (
	"encoding/json"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/unrolled/render"

	"ep17_quizz/api/databases"
	"ep17_quizz/api/errors"
	"ep17_quizz/api/models"
	"ep17_quizz/api/utils"
)

func usersCreate(rw http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	ctx := req.Context()
	s := utils.LoggingFromContext(ctx)
	session := databases.RethinkFromContext(req.Context())

	// TODO: test the receives values
	var u models.User
	decoder := json.NewDecoder(req.Body)
	if err := decoder.Decode(&u); err != nil {
		errors.WriteHTTP(rw, errors.ErrBadRequest, s)
		return
	}
	defer req.Body.Close()

	hash, err := utils.MD5FromString(u.Email)
	if err != nil {
		errors.WriteHTTP(rw, errors.ErrBadRequest, s)
		return
	}
	u.ID = hash

	if err := u.CreateUser(session); err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}

	rdr := render.New()
	rdr.JSON(rw, http.StatusCreated, u)
}
