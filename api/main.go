package main

import (
	"flag"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var (
		port   = flag.String("port", os.Getenv("EP17_API_PORT"), "Port to listen to")
		dbName = flag.String("dbname", os.Getenv("APP_DB_NAME"), "Port to listen to")
	)

	// Set the addr with the port
	var bindingPort int
	bindingPort, err := strconv.Atoi(*port)
	if err != nil {
		bindingPort = 8888
	}
	addr := fmt.Sprintf(":%d", bindingPort)

	// Setup & run application
	a := App{}
	a.Initialize(
		os.Getenv("APP_DB_ADDRESS"),
		os.Getenv("APP_DB_USERNAME"),
		os.Getenv("APP_DB_PASSWORD"),
		os.Getenv(*dbName))

	a.Run(addr)
}
