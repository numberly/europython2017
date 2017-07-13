package questions

import (
	"encoding/json"
	"ep17_quizz/api/models"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func (a *App) validateQuestion(w http.ResponseWriter, r *http.Request) {
	var v models.ValidateQuestion
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&v); err != nil {
		respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	// retrieve question
	vars := mux.Vars(r)
	questionID, err := strconv.Atoi(vars["id"])
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "invalid question id")
		return
	}
	q := models.Question{ID: questionID}

	if err := q.GetQuestion(a.RethinkSession); err != nil {
		switch err {
		case rethink.ErrEmptyResult:
			respondWithError(w, http.StatusNotFound, "Question not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	// retrieve user
	u := models.User{ID: v.UserID}
	if err := u.GetUser(a.RethinkSession); err != nil {
		switch err {
		case rethink.ErrEmptyResult:
			respondWithError(w, http.StatusNotFound, "User not found")
		default:
			respondWithError(w, http.StatusInternalServerError, err.Error())
		}
		return
	}

	if q.Index == v.Answer {
		u.HitScore(a.RethinkSession)
	}

	respondWithJSON(w, http.StatusOK, u)
}
