package main

import (
	"time"

	rethink "gopkg.in/gorethink/gorethink.v3"
)

type User struct {
	ID      string         `json:"id" gorethink:"id"`
	Cool    bool           `json:"cool" gorethink:"cool"`
	Email   string         `json:"email" gorethink:"email"`
	Name    string         `json:"name" gorethink:"name"`
	Country string         `json:"country" gorethink:"country"`
	Scores  map[string]int `json:"scores" gorething:"scores"`
}

func (u *User) getUser(session *rethink.Session) error {
	res, err := rethink.Table("users").Get(u.ID).Run(session)
	if err != nil {
		return err
	}

	err = res.One(&u)
	if err == rethink.ErrEmptyResult {
		return err
	}

	return nil
}

func (u *User) hitScore(session *rethink.Session) error {
	currentTime := time.Now().Local()
	currentDate := currentTime.Format("2006-01-02")

	if _, exist := u.Scores[currentDate]; exist {
		u.Scores[currentDate]++
	} else {
		u.Scores = make(map[string]int)
		u.Scores[currentDate] = 1
	}

	_, err := rethink.Table("users").Get(u.ID).Update(u).RunWrite(session)
	if err != nil {
		return err
	}

	return nil
}

func (u *User) createUser(session *rethink.Session) error {
	_, err := rethink.Table("users").Insert(u).RunWrite(session)

	if err != nil {
		return err
	}

	return nil
}

func getUsers(cursor *rethink.Cursor) ([]User, error) {
	users := []User{}
	err := cursor.All(&users)
	if err != nil {
		return users, err
	}
	return users, nil
}

type Question struct {
	Index   int      `json:"index" gorethink:"index"` // AnswerIndex
	Answers []string `json:"answers" gorethink:"answers"`
	ID      int      `json:"id" gorethink:"id"`
	Text    string   `json:"text" gorethink:"text"`
}

type validateQuestion struct {
	Answer int    `json:"answer"`
	UserID string `json:"user_id"`
}

func (q *Question) getQuestion(session *rethink.Session) error {
	res, err := rethink.Table("questions").Get(q.ID).Run(session)
	if err != nil {
		return err
	}
	err = res.One(&q)
	if err == rethink.ErrEmptyResult {
		return err
	}

	return nil
}
func getQuestions(cursor *rethink.Cursor) ([]Question, error) {
	questions := []Question{}
	err := cursor.All(&questions)
	if err != nil {
		return questions, err
	}
	return questions, nil
}
