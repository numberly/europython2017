package users

import (
	"ep17_quizz/api/models"
	"net/http"

	"github.com/gorilla/mux"
)

func userRetrieve(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	u := models.User{ID: vars["id"]}
	if err := u.GetUser(a.RethinkSession); err != nil {
		switch err {
		case rethink.ErrEmptyResult:
			respondWithError(w, http.StatusNotFound, "User not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	respondWithJSON(w, http.StatusOK, u)
}
