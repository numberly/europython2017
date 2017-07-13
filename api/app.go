package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	rethink "gopkg.in/gorethink/gorethink.v3"
)

// Version TODO
// Build TODO
var (
	Version string
	Build   string
	Hash    string
)

// App contain Router
type App struct {
	Router         *mux.Router
	RethinkSession *rethink.Session
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

// Initialize setup
func (a *App) Initialize(address, username, password, database string) {
	var err error

	a.RethinkSession, err = rethink.Connect(rethink.ConnectOpts{
		Address:  address,
		Database: database,
	})

	if err != nil {
		log.Fatal(err.Error())
	}

	a.Router = mux.NewRouter()
	a.InitializeRoutes()
	a.InitializeDb(a.RethinkSession, database)
}

// InitializeDb setup DB
func (a *App) InitializeDb(session *rethink.Session, database string) {
	_, err := rethink.DBCreate(database).RunWrite(session)
	if err != nil {
		log.Print(err.Error())
	}

	_, err = rethink.TableCreate("users").RunWrite(session)
	if err != nil {
		log.Print(err.Error())
	}

	_, err = rethink.TableCreate("questions").RunWrite(session)
	if err != nil {
		log.Print(err.Error())
	}
}

// InitializeRoutes initiliaze all route
func (a *App) InitializeRoutes() {
	a.Router.HandleFunc("/api/users", a.getUsers).Methods("GET", "OPTIONS")
	a.Router.HandleFunc("/api/users", a.createUser).Methods("POST")

	a.Router.HandleFunc("/api/users/{id}", a.getUser).Methods("GET")

	a.Router.HandleFunc("/api/questions", a.getQuestions).Methods("GET")
	a.Router.HandleFunc("/api/questions/{id}", a.validateQuestion).Methods("POST")

	a.Router.HandleFunc("/api/scores", a.getTopScores).Methods("GET")

	a.Router.HandleFunc("/api/stats/country", a.getCountryStats).Methods("GET")
}

// Run activate the server
func (a *App) Run(addr string) {
	origins := handlers.AllowedOrigins([]string{"*"})
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Accept", "Accept-Language", "Content-Language", "Origin", "Cache-Control", "Expires"})
	methods := handlers.AllowedMethods([]string{"GET", "DELETE", "HEAD", "POST", "PUT", "OPTIONS"})

	log.Fatal(http.ListenAndServe(":8888", handlers.CORS(headers, origins, methods)(a.Router)))
}
