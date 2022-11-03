package helpers

import (
	"errors"
	"io/ioutil"
	"net/http"
	"strings"
)

type ReqBody struct {
	SourceLang string `json:"sourceLang"`
	TargetLang string `json:"targetLang"`
	SourceText string `json:"sourceText"`
}

const translateURL = "https://google-translate1.p.rapidapi.com/language/translate/v2"

func ReqTranslate(body *ReqBody) ([]byte, error) {
	var str2 string
	str2 = ""
	str2 = str2 + "q=" + body.SourceText
	str2 = str2 + "&target=" + body.TargetLang
	str2 = str2 + "&source=" + body.SourceLang

	payload := strings.NewReader(str2)

	req, err := http.NewRequest("POST", translateURL, payload)
	if err != nil {
		return []byte(""), err
	}

	req.Header.Add("content-type", "application/x-www-form-urlencoded")
	req.Header.Add("Accept-Encoding", "application/gzip")
	req.Header.Add("X-RapidAPI-Key", "")
	req.Header.Add("X-RapidAPI-Host", "google-translate1.p.rapidapi.com")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return []byte(""), err
	}

	defer res.Body.Close()
	body1, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return []byte(""), err
	}

	defer res.Body.Close()

	if res.StatusCode == http.StatusTooManyRequests {
		return []byte(""), errors.New("Too many requests")
	}
	return body1, nil
}
