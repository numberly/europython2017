package questions

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

func questionsList(rw http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	ctx := req.Context()
	session := databases.RethinkFromContext(ctx)
	s := utils.LoggingFromContext(ctx)

	cursor, err := rethink.Table("questions").OrderBy(rethink.Desc("id")).Run(session)
	if err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}

	questions, err := models.GetQuestions(cursor)
	if err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}

	s.StatusCode = http.StatusOK
	rdr := render.New()
	rdr.JSON(rw, http.StatusOK, questions)
}
