package users

import (
	"encoding/json"
	"ep17_quizz/api/models"
	"net/http"
)

func userCreate(w http.ResponseWriter, r *http.Request) {
	// TODO: test the receives values
	var u models.User
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&u); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	hash, err := MD5FromString(u.Email)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	u.ID = hash

	if err := u.CreateUser(a.RethinkSession); err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondWithJSON(w, http.StatusCreated, u)
}
