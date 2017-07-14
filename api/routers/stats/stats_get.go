package stats

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

func countryStatsRetrieve(rw http.ResponseWriter, req *http.Request, ps httprouter.Params) {
	ctx := req.Context()
	s := utils.LoggingFromContext(ctx)
	session := databases.RethinkFromContext(req.Context())

	cursor, err := rethink.RawQuery([]byte(`[43,[[144,[[15,[[14,["ep17"]],"users"]],"country"]]]]`)).Run(session)
	if err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}

	stats, err := models.GetCountryStats(cursor)
	if err != nil {
		errors.WriteHTTP(rw, errors.ErrInternalError, s)
		return
	}

	rdr := render.New()
	rdr.JSON(rw, http.StatusOK, stats)
}
