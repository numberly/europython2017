package models

import (
	"fmt"

	rethink "gopkg.in/gorethink/gorethink.v3"
)

// Score TODO
type Score struct {
	Date       string `json:"date" gorethink:"date"`
	ID         string `json:"id" gorethink:"id"`
	IDUser     string `json:"id_user" gorethink:"id_user"`
	TotalScore int    `json:"total_score" gorethink:"total_score"`
}

// GetTopScores return top score user
func GetTopScores(cursor *rethink.Cursor) ([]UserResponse, error) {
	users := []UserResponse{}
	err := cursor.All(&users)
	if err != nil {
		return users, err
	}

	fmt.Printf("getTopScores :: done \n")
	return users, nil
}
