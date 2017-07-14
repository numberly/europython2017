package root

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/unrolled/render"
)

// NewRouter initilize a router with Root ressources
func NewRouter(router *httprouter.Router, version, build, hash string) {
	router.GET("/api", root(version, build, hash))
}

func root(version, build, hash string) func(http.ResponseWriter, *http.Request, httprouter.Params) {
	return func(rw http.ResponseWriter, req *http.Request, _ httprouter.Params) {
		data := map[string]interface{}{
			"version": version,
			"build":   build,
		}
		rdr := render.New()
		rdr.JSON(rw, http.StatusOK, data)
	}
}
