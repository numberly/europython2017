package users

import (
	"ep17_quizz/api/models"
	"net/http"
)

func usersList(w http.ResponseWriter, r *http.Request) {
	cursor, err := rethink.Table("users").Run(a.RethinkSession)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}
	users, err := models.GetUsers(cursor)

	respondWithJSON(w, http.StatusOK, users)
}
