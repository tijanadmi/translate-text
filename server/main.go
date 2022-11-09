package main

import (
	"net/http"

	"github.com/tijanadmi/translate-text/server/controller/api"
)

func main() {

	http.HandleFunc("/getalllanguages", api.GetAllLanguagesFromGoogleTranslate)
	http.HandleFunc("/translate", api.TranslateTheText)

	http.ListenAndServe(":8080", nil)

}
