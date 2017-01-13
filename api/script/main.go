package main

import (
    "encoding/json"
    "errors"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"

    env "playground/api/environment"
    model "playground/api/models"

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
    status, err := resetCharactersTable()
    log.Println("Status: ", status, "Err: ", err)
}

func resetCharactersTable() (status string, err error) {
	status = "failed to reset characters"

	db.Exec("TRUNCATE TABLE " + model.CharacterTable{}.TableName() + ";")

	collection, err := getMarvelCharacters()
	if err != nil {
		return
	}

	tx := db.Begin()
	log.Println("transaction started")

	charactersCount := len(collection)
	for key, character := range collection {
		log.Printf("adding to queue [%d of %d]", key, charactersCount)
		tx.Create(&character)

	}

	tx.Commit()

	status = "characters rest"

	return
}

func getMarvelCharacters() (charactersCollection []model.CharacterTable, err error) {
	log.Println("\t\t Calling all marvel characters")
	response, err := validateAndUnMarshalCharacters(0)
	if err != nil {
		return
	}
	collectionBuilder := model.Characters{}
	charactersCollection = collectionBuilder.Populate(response.Data.Results)

	respCount := response.Data.Count
	for count := respCount; count < response.Data.Total; count += respCount {
		log.Printf("\t\t ON [%d of %d] \n", count, response.Data.Total)

		response, err = validateAndUnMarshalCharacters(count)
		if err != nil {
			return
		}

		respCount = response.Data.Count
		charactersCollection = collectionBuilder.Populate(response.Data.Results)
	}

	return
}

func validateAndUnMarshalCharacters(offset int) (response model.MarvelResponseCharacter, err error) {
	log.Println("\t\t\t Parsing json to response model")

	reqURL := getRequestURLString("characters", 100, offset)
	resp, body, err := request(reqURL)
	log.Println("\t\t\t Response Status ", resp.StatusCode, resp.Status)
	if err != nil {
		return
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		err = errors.New("Failed Unmarshal: " + err.Error())
		return
	}

	return

}

func request(reqURL string) (resp *http.Response, body []byte, err error) {
	//send request
	log.Println("\t\t\t sending request ")

	resp, err = http.Get(reqURL)
	if err != nil {
		err = errors.New("Failed to send reqest: " + err.Error())
		return
	}

	defer resp.Body.Close()
	body, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		err = errors.New("Failed to write body to byte: " + err.Error())
		return
	}

	return

}

// formats the request url to our speficication
func getRequestURLString(reqFor string, limit int, offset int) string {
	log.Println("\t\t\t formatting request url")
	requestURL := "https://gateway.marvel.com:443/v1/public"
	hash, ts := config.GetKeyHash()
	return fmt.Sprintf("%s/%s?ts=%s&hash=%s&apikey=%s&offset=%d&limit=%d", requestURL, reqFor, ts, hash, config.MarvelPublicKey, offset, limit)
}