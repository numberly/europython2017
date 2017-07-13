package stats

import (
	"ep17_quizz/api/models"
	"net/http"
)

func (a *App) getCountryStats(w http.ResponseWriter, r *http.Request) {
	cursor, err := rethink.RawQuery([]byte(`[43,[[144,[[15,[[14,["ep17"]],"users"]],"country"]]]]`)).Run(a.RethinkSession)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	stats, err := models.GetCountryStats(cursor)

	respondWithJSON(w, http.StatusOK, stats)
}
