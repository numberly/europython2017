package scores

import (
	"ep17_quizz/api/models"
	"net/http"
)

func (a *App) getTopScores(w http.ResponseWriter, r *http.Request) {
	// fishy way, no date validatioon
	date := r.URL.Query().Get("date")

	if date != "" {
		cursor, err := rethink.Table("users").Filter(func(row rethink.Term) rethink.Term { return row.Field("scores").Field(date) }).OrderBy(rethink.Desc(func(row rethink.Term) rethink.Term { return row.Field("scores").Field(date) })).Run(a.RethinkSession)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}
		scores, err := models.GetTopScores(cursor)

		respondWithJSON(w, http.StatusOK, scores)
	} else {
		cursor, err := rethink.RawQuery([]byte(`[41,[[72,[[50,[[15,[[14,["ep17"]],"scores"]],"id_user",[15,[[14,["ep17"]],"users"]]]]]],[74,["total_score"]]]]`)).Run(a.RethinkSession)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}
		scores, err := models.GetTopScores(cursor)

		respondWithJSON(w, http.StatusOK, scores)
	}
}
