package scores

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

func scoresRetrieve(rw http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	var cursor *rethink.Cursor
	var err error

	ctx := req.Context()
	s := utils.LoggingFromContext(ctx)
	session := databases.RethinkFromContext(ctx)
	date := req.URL.Query().Get("date")

	if date != "" {
		orderBy := rethink.Desc(func(row rethink.Term) rethink.Term {
			return row.Field("scores").Field(date)
		})

		filter := func(row rethink.Term) rethink.Term {
			return row.Field("scores").Field(date)
		}

		cursor, err = rethink.Table("users").Filter(filter).OrderBy(orderBy).Run(session)
	} else {
		cursor, err = rethink.RawQuery([]byte(`[41,[[72,[[50,[[15,[[14,["ep17"]],"scores"]],"id_user",[15,[[14,["ep17"]],"users"]]]]]],[74,["total_score"]]]]`)).Run(session)
	}

	if err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}
	scores, err := models.GetTopScores(cursor)
	if err != nil {
		// TODO
	}

	rdr := render.New()
	rdr.JSON(rw, http.StatusOK, scores)
}
