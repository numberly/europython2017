package main

import (
	"fmt"

	rethink "gopkg.in/gorethink/gorethink.v3"
)

type CountryStat struct {
	Country string `json:"country" gorethink:"group"`
	Count   int    `json:"count" gorethink:"reduction"`
}

func getCountryStats(cursor *rethink.Cursor) ([]CountryStat, error) {
	stats := []CountryStat{}
	err := cursor.All(&stats)
	if err != nil {
		return stats, err
	}

	fmt.Printf("getStatCountry :: done \n")
	return stats, nil
}
