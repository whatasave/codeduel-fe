package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/xedom/codeduel/types"
)

func (s *APIServer) handleGithubAuth(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		// redirect to github auth
		urlParams := r.URL.Query()
		
		cliend_id := os.Getenv("AUTH_GITHUB_CLIENT_ID")
		// client_secret := os.Getenv("AUTH_GITHUB_CLIENT_SECRET")
		client_callback_url := os.Getenv("AUTH_GITHUB_CLIENT_CALLBACK_URL")
		redirect := "https://github.com/login/oauth/authorize"

		urlParams.Add("client_id", cliend_id)
		urlParams.Add("redirect_uri", client_callback_url)
		// urlParams.Add("return_to", "/login/oauth/authorize?client_id=23e780f12c2e313d2872")
		urlParams.Add("response_type", "code")
		urlParams.Add("scope", "user:email")
		urlParams.Add("state", "an_unguessable_random_string") // It is used to protect against cross-site request forgery attacks.
		urlParams.Add("allow_signup", "true")
		encodedParams := urlParams.Encode()

		url := fmt.Sprintf("%s?%s", redirect, encodedParams)
		http.Redirect(w, r, url, http.StatusTemporaryRedirect)

		// http.Redirect(w, r, "http://localhost:5000/api/v1/auth/github/callback", http.StatusTemporaryRedirect)
		return nil
	}
	
	return fmt.Errorf("method not allowed %s", r.Method)
}

func (s *APIServer) handleGithubAuthCallback(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		// read params
		urlParams := r.URL.Query()
		code := urlParams.Get("code")
		state := urlParams.Get("state")
		fmt.Println("code: ", code)
		fmt.Println("state: ", state)
		// redirect to github auth
		// urlParams := r.URL.Query()

		// posturl := "https://github.com/login/oauth/access_token"

		cliend_id := os.Getenv("AUTH_GITHUB_CLIENT_ID")
		client_secret := os.Getenv("AUTH_GITHUB_CLIENT_SECRET")
		// client_callback_url := os.Getenv("AUTH_GITHUB_CLIENT_CALLBACK_URL")

		githubAccessToken := getGithubAccessToken(cliend_id, client_secret, code)
		fmt.Printf("Github Access Token: %s\n", githubAccessToken)
		
    githubData := getGithubData(githubAccessToken)
		fmt.Printf("Github Data: %s\n", githubData)

		githubParsedData := &types.GithubUser{}
		json.Unmarshal([]byte(githubData), &githubParsedData)
		fmt.Printf("Github Parsed Data: %+v\n", *githubParsedData)

    // // JSON body
		// body := []byte(`{
		// 	"client_id": "` + cliend_id + `",
		// 	"client_secret": "` + client_secret + `",
		// 	"code": "` + code + `",
		// 	"redirect_uri": "` + client_callback_url + `",
		// 	"state": "` + state + `"
		// }`)

		// // Create a HTTP post request
		// rr, err := http.NewRequest("POST", posturl, bytes.NewBuffer(body))
		// if err != nil { panic(err) }
		
		// client := &http.Client{}
		// res, err := client.Do(rr)
		// if err != nil { panic(err) }

		// defer res.Body.Close()

    // responseData, err := ioutil.ReadAll(res.Body)
    // if err != nil { log.Fatal(err) }
    // responseString := string(responseData)
    // fmt.Println(responseString)

	}
	
	return fmt.Errorf("method not allowed %s", r.Method)
}

func getGithubAccessToken(clientID, clientSecret, code string) string {

	// Set us the request body as JSON
	requestBodyMap := map[string]string{
			"client_id": clientID,
			"client_secret": clientSecret,
			"code": code,
	}
	requestJSON, _ := json.Marshal(requestBodyMap)

	// POST request to set URL
	req, reqerr := http.NewRequest(
			"POST",
			"https://github.com/login/oauth/access_token",
			bytes.NewBuffer(requestJSON),
	)
	if reqerr != nil {
			log.Panic("Request creation failed")
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	// Get the response
	resp, resperr := http.DefaultClient.Do(req)
	if resperr != nil {
			log.Panic("Request failed")
	}

	// Response body converted to stringified JSON
	respbody, _ := ioutil.ReadAll(resp.Body)

	// Represents the response received from Github
	type githubAccessTokenResponse struct {
			AccessToken string `json:"access_token"`
			TokenType   string `json:"token_type"`
			Scope       string `json:"scope"`
	}

	// Convert stringified JSON to a struct object of type githubAccessTokenResponse
	var ghresp githubAccessTokenResponse
	json.Unmarshal(respbody, &ghresp)

	// Return the access token (as the rest of the
	// details are relatively unnecessary for us)
	return ghresp.AccessToken
}

func getGithubData(accessToken string) string {
	// Get request to a set URL
	req, reqerr := http.NewRequest(
			"GET",
			"https://api.github.com/user",
			nil,
	)
	if reqerr != nil {
			log.Panic("API Request creation failed")
	}

	// Set the Authorization header before sending the request
	// Authorization: token XXXXXXXXXXXXXXXXXXXXXXXXXXX
	authorizationHeaderValue := fmt.Sprintf("token %s", accessToken)
	req.Header.Set("Authorization", authorizationHeaderValue)

	// Make the request
	resp, resperr := http.DefaultClient.Do(req)
	if resperr != nil {
			log.Panic("Request failed")
	}

	// Read the response as a byte slice
	respbody, _ := ioutil.ReadAll(resp.Body)

	// Convert byte slice to string and return
	return string(respbody)
}

func loggedinHandler(w http.ResponseWriter, r *http.Request, githubData string) {
	if githubData == "" {
			// Unauthorized users get an unauthorized message
			fmt.Fprintf(w, "UNAUTHORIZED!")
			return
	}

	// Set return type JSON
	w.Header().Set("Content-type", "application/json")

	// Prettifying the json
	var prettyJSON bytes.Buffer
	// json.indent is a library utility function to prettify JSON indentation
	parserr := json.Indent(&prettyJSON, []byte(githubData), "", "\t")
	if parserr != nil {
			log.Panic("JSON parse error")
	}

	// Return the prettified JSON as a string
	fmt.Fprintf(w, string(prettyJSON.Bytes()))
}