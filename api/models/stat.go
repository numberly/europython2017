package models

import (
	"fmt"

	rethink "gopkg.in/gorethink/gorethink.v3"
)

// CountryStat TODO
type CountryStat struct {
	Country string `json:"country" gorethink:"group"`
	Count   int    `json:"count" gorethink:"reduction"`
}

// GetCountryStats return user count grouped by country
func GetCountryStats(cursor *rethink.Cursor) ([]CountryStat, error) {
	stats := []CountryStat{}
	err := cursor.All(&stats)
	if err != nil {
		return stats, err
	}

	fmt.Printf("getStatCountry :: done \n")
	return stats, nil
}
