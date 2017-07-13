package questions

import (
	"ep17_quizz/api/models"
	"net/http"
)

func (a *App) getQuestions(w http.ResponseWriter, r *http.Request) {
	cursor, err := rethink.Table("questions").OrderBy(rethink.Desc("id")).Run(a.RethinkSession)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	questions, err := models.GetQuestions(cursor)

	respondWithJSON(w, http.StatusOK, questions)
}
