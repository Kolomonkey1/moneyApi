package main

import (
    "encoding/json"
	"log"
	"net/http"
	model "playground/api/models"
	"strconv"
    "strings"
)

func getHandlers() {

	http.HandleFunc("/marvel/characters", charactersHandler)
    http.HandleFunc("/marvel/character/", characterHandler)
}

func charactersHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("\t Method: ", r.Method, "EndPoint: ", r.RequestURI)
	// /marvel/characters?q=iron&l=10
	var response []byte
	var resp = model.Response{Code: http.StatusOK, Status: "Neutral"}

	searchString := r.FormValue("q")
	limit, err := strconv.Atoi(r.FormValue("l"))
	if err != nil {
		limit = 100
	}

	switch r.Method {
	case "GET":
		log.Println("\t Fetching all characters - Search: ", searchString, "Limit: ", limit)
		resp.Status = "OK"

		resp.Results, err = fetchAllCharacters(searchString, limit)
		if err != nil {
			log.Println("\t Failed: ", err)
			resp.Status = "NOT OKAY"
			resp.Results = err
		}

		break
	default:
		log.Println("\t Method Not Handled")
		resp.Code = http.StatusServiceUnavailable
		resp.Status = r.Method + " method not handled "
		break
	}


	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(resp.Code)

    response, _ = json.Marshal(resp)
    w.Write(response)
    
    log.Println("\t ResponseStatus: ", resp.Status, "Response Code: ", resp.Code)

    return

}

func characterHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("\t Method: ", r.Method, "EndPoint: ", r.RequestURI)
	// /marvel/character/3?l ...
	var response []byte
	var resp = model.Response{Code: http.StatusOK, Status: "Neutral"}

	// 0 - empty 1 - marvel 2 - character 3 - ID
	paths := strings.Split(r.RequestURI, "/")
	id, err := strconv.Atoi(strings.Split(paths[3], "?")[0])
	if err != nil {
		resp.Code = http.StatusBadRequest
		resp.Status = err.Error()

	}

	switch r.Method {
	case "GET":
		log.Println("\t Fetching Character - ID: ", id)

		if resp.Code == http.StatusOK {
			resp.Status = "Not Vaild ID "

			if id >= 1 {
				resp.Status = "OK"
				resp.Results = fetchCharacter(id)
			}

		}
		break
	default:
		log.Println("\t Method Not Handled")
		resp.Code = http.StatusServiceUnavailable
		resp.Status = r.Method + " method not handled "
		break
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(resp.Code)

	response, _ = json.Marshal(resp)
	w.Write(response)

	log.Println("\t ResponseStatus: ", resp.Status, "Response Code: ", resp.Code)

	return
}