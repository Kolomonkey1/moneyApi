package main

import (
	"fmt"
	"log"
	"net/http"

	env "playground/api/environment"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var config env.EnvConfig
var gerr error
var db *gorm.DB

func init() {
	log.Println("Getting Environment Config")
	config, gerr = env.GetEnvConfig()
	if gerr != nil {
		log.Fatal("Failed: ", gerr)
	}

	log.Println("Connecting to database")
	connectionString := fmt.Sprintf("%s:%s@(%s:%d)/?parseTime=True&loc=%s", config.DBUsername, config.DBPassword, config.DBHostname, config.DBPort, "America%2FChicago")
	db, gerr = gorm.Open("mysql", connectionString)
	if gerr != nil {
		log.Fatal("Failed: ", gerr)
	}
}

func main() {
	defer db.Close()

	getHandlers()
	s := &http.Server{
		Addr: ":8083",
	}

	log.Println("Serving on port 8083")
	log.Fatal(s.ListenAndServe())

}