package questions

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
	"github.com/unrolled/render"
	rethink "gopkg.in/gorethink/gorethink.v3"

	"ep17_quizz/api/databases"
	"ep17_quizz/api/errors"
	"ep17_quizz/api/models"
	"ep17_quizz/api/utils"
)

func validateCreate(rw http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	ctx := req.Context()
	session := databases.RethinkFromContext(req.Context())
	s := utils.LoggingFromContext(ctx)

	var v models.ValidateQuestion
	decoder := json.NewDecoder(req.Body)
	if err := decoder.Decode(&v); err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}
	defer req.Body.Close()

	// retrieve question
	questionID, err := strconv.Atoi(ps.ByName("id"))
	if err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}
	q := models.Question{ID: questionID}

	if err := q.GetQuestion(session); err != nil {
		switch err {
		case rethink.ErrEmptyResult:
			errors.WriteHTTP(rw, errors.ErrNotFound, s)
		default:
			errors.WriteHTTP(rw, errors.ErrInternalError, s)
		}
		return
	}

	// retrieve user
	u := models.User{ID: v.UserID}
	if err := u.GetUser(session); err != nil {
		switch err {
		case rethink.ErrEmptyResult:
			errors.WriteHTTP(rw, errors.ErrNotFound, s)
		default:
			errors.WriteHTTP(rw, errors.ErrInternalError, s)
		}
		return
	}

	if q.Index == v.Answer {
		u.HitScore(session)
	}

	rdr := render.New()
	rdr.JSON(rw, http.StatusOK, u)
}
