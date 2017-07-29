package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"strconv"

	log "github.com/Sirupsen/logrus"
	"github.com/julienschmidt/httprouter"
	rethink "gopkg.in/gorethink/gorethink.v3"

	"ep17_quizz/api/databases"
	"ep17_quizz/api/routers/questions"
	"ep17_quizz/api/routers/root"
	"ep17_quizz/api/routers/scores"
	"ep17_quizz/api/routers/stats"
	"ep17_quizz/api/routers/users"
	"ep17_quizz/api/routers/ws"
)

// Version TODO
// Build TODO
var (
	Version string
	Build   string
	Hash    string
)

func initRouter(router *httprouter.Router) {
	root.NewRouter(router, Version, Build, Hash)
	scores.NewRouter(router)
	users.NewRouter(router)
	stats.NewRouter(router)
	questions.NewRouter(router)
	ws.NewRouter(router)
}

// Initialize setup
func initDB(address, username, password, database string) {
	databases.RethinkConfig.Address = address
	databases.RethinkConfig.Database = database
	session, err := rethink.Connect(databases.RethinkConfig)

	if err != nil {
		log.Fatal(err.Error())
	}

	// Ensure DB is valid
	_, err = rethink.DBCreate(database).RunWrite(session)
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

func main() {
	var (
		port   = flag.String("port", os.Getenv("EP17_API_PORT"), "Port to listen to")
		dbName = flag.String("dbname", os.Getenv("APP_DB_NAME"), "Port to listen to")
	)
	flag.Parse()
	log.Info("Initializing ep17_quiz api...")

	// Set the addr with the port
	var bindingPort int
	bindingPort, err := strconv.Atoi(*port)
	if err != nil {
		bindingPort = 8888
	}
	addr := fmt.Sprintf(":%d", bindingPort)

	log.Infof("Version: %s", Version)
	log.Infof("Git commit hash: %s", Build)

	// Setup the route from the api to the router
	router := httprouter.New()
	initDB(
		os.Getenv("APP_DB_ADDRESS"),
		os.Getenv("APP_DB_USERNAME"),
		os.Getenv("APP_DB_PASSWORD"),
		*dbName)
	initRouter(router)

	// Start the api
	log.Infof("EP17-quiz is running at %s.", addr)
	log.Fatal(http.ListenAndServe(addr, router))
}
