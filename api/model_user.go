package main

import (
	"fmt"
	"time"

	rethink "gopkg.in/gorethink/gorethink.v3"
)

type User struct {
	ID      string         `json:"id" gorethink:"id"`
	Cool    bool           `json:"cool" gorethink:"cool"`
	Email   string         `json:"email" gorethink:"email"`
	Name    string         `json:"name" gorethink:"name"`
	Country string         `json:"country" gorethink:"country"`
	Scores  map[string]int `json:"scores" gorethink:"scores"`
}

type UserResponse struct {
	User
	TotalScore string `json:"total_score" gorethink:"total_score"`
}

func (u *User) getUser(session *rethink.Session) error {
	res, err := rethink.Table("users").Get(u.ID).Run(session)
	if err != nil {
		fmt.Printf("%v :: getUser :: unable to retrieve user :: %v \n", u.ID, err)
		return err
	}

	err = res.One(&u)
	if err == rethink.ErrEmptyResult {
		fmt.Printf("%v :: getUser :: empty result :: %v \n", u.ID, err)
		return err
	}

	fmt.Printf("%v :: getUser :: done \n", u.ID)
	return nil
}

func (u *User) hitScore(session *rethink.Session) error {
	currentTime := time.Now().Local()
	currentDate := currentTime.Format("2006-01-02")
	scoreID := fmt.Sprintf("%v_%v", u.ID, currentDate)

	if _, exist := u.Scores[currentDate]; exist {
		u.Scores[currentDate]++

		// Thanks Pierrot for this fucking schema !
		var score Score
		res, err := rethink.Table("scores").Get(scoreID).Run(session)
		if err != nil {
			fmt.Printf("%v :: hitScore :: unable to retrieve score :: %v \n", u.ID, err)
			return err
		}
		err = res.One(&score)
		if err == rethink.ErrEmptyResult {
			fmt.Printf("%v :: hitScore :: score empty result :: %v \n", u.ID, err)
			return err
		}
		score.TotalScore++

		coconut, err := rethink.Table("scores").Get(score.ID).Update(score).RunWrite(session)
		if err != nil {
			fmt.Printf("%v :: hitScore :: unable to update score :: %v \n", u.ID, err)
			return err
		}
		fmt.Printf("%v", coconut)

	} else {
		u.Scores = make(map[string]int)
		u.Scores[currentDate] = 1

		//
		score := Score{Date: currentDate, IDUser: u.ID, ID: scoreID, TotalScore: 1}
		_, err := rethink.Table("scores").Insert(score).RunWrite(session)
		if err != nil {
			fmt.Printf("%v :: hitScore :: unable to insert score :: %v \n", u.ID, err)
			return err
		}
	}

	_, err := rethink.Table("users").Get(u.ID).Update(u).RunWrite(session)
	if err != nil {
		fmt.Printf("%v :: hitScore :: unable to update user score :: %v \n", u.ID, err)
		return err
	}

	fmt.Printf("%v :: hitScore :: done %v \n", u.ID)
	return nil
}

func (u *User) createUser(session *rethink.Session) error {
	_, err := rethink.Table("users").Insert(u).RunWrite(session)

	if err != nil {
		return err
	}

	fmt.Printf("%v :: createUser :: done %v \n", u.ID)
	return nil
}

func getUsers(cursor *rethink.Cursor) ([]User, error) {
	users := []User{}
	err := cursor.All(&users)
	if err != nil {
		return users, err
	}

	fmt.Printf("getUsers :: done (%v) \n", len(users))
	return users, nil
}
