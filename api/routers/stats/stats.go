package stats

import (
	"github.com/julienschmidt/httprouter"

	"ep17_quizz/api/routers"
)

// NewRouter intialize a router with User ressources
func NewRouter(router *httprouter.Router) {
	router.GET("/api/stats/country", routers.Basic(countryStatsRetrieve))
}
