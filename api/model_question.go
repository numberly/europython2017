package main

import (
	"fmt"

	rethink "gopkg.in/gorethink/gorethink.v3"
)

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

	fmt.Printf("%v :: getQuestion :: done \n", q.ID)
	return nil
}

func getQuestions(cursor *rethink.Cursor) ([]Question, error) {
	questions := []Question{}
	err := cursor.All(&questions)
	if err != nil {
		return questions, err
	}

	fmt.Printf("getQuestion :: done (%v) \n", len(questions))
	return questions, nil
}
