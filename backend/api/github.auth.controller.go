package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/xedom/codeduel/types"
	"github.com/xedom/codeduel/utils"
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
		if urlParams.Has("code") || urlParams.Has("state") { return fmt.Errorf("code or state is empty") }
		code := urlParams.Get("code")
		state := urlParams.Get("state")
		// fmt.Println("code:", code)
		// fmt.Println("state:", state)

		cliend_id, err := utils.GetEnv("AUTH_GITHUB_CLIENT_ID")
		if err != nil { return err }
		client_secret, err := utils.GetEnv("AUTH_GITHUB_CLIENT_SECRET")
		if err != nil { return err }
		// client_callback_url := os.Getenv("AUTH_GITHUB_CLIENT_CALLBACK_URL")

		githubAccessToken, err := getGithubAccessToken(cliend_id, client_secret, code, state)
		if err != nil { return err }

		// fmt.Printf("Github Access Token: %s\n", githubAccessToken)
		
    githubData := getGithubData(githubAccessToken.AccessToken)
		githubParsedData := &types.GithubUser{}
		json.Unmarshal([]byte(githubData), &githubParsedData)
		// fmt.Printf("Github Parsed Data: %+v\n", *githubParsedData)

		user := types.NewUser(githubParsedData.Login, githubParsedData.Email)
		user.ImageURL = githubParsedData.AvatarUrl;
		errdb := s.db.CreateUser(user)
		if errdb != nil { return errdb }

		auth := types.NewAuthEntry(user.ID, "github", fmt.Sprintf("%d", githubParsedData.Id))
		s.db.CreateAuth(auth)

	}
	
	return fmt.Errorf("method not allowed %s", r.Method)
}

func getGithubAccessToken(clientID, clientSecret, code, state string) (*types.GithubAccessTokenResponse, error) {
	requestURL := "https://github.com/login/oauth/access_token"

	// Set us the request body as JSON
	requestBodyMap := map[string]string{
		"client_id": clientID,
		"client_secret": clientSecret,
		"code": code,
		// "redirect_uri": client_callback_url,
		"state": state,
	}
	requestJSON, _ := json.Marshal(requestBodyMap)

	// POST request to set URL
	req, reqerr := http.NewRequest("POST",requestURL,bytes.NewBuffer(requestJSON))
	if reqerr != nil { return nil, fmt.Errorf("Request creation failed") }
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	// Make the request
	resp, resperr := http.DefaultClient.Do(req)
	if resperr != nil { return nil, fmt.Errorf("Request failed") }

	// Convert stringified JSON to a struct object of type githubAccessTokenResponse
	respbody, _ := io.ReadAll(resp.Body)
	ghresp := &types.GithubAccessTokenResponse{}
	json.Unmarshal(respbody, &ghresp)

	return ghresp, nil
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
	respbody, _ := io.ReadAll(resp.Body)

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
	if parserr != nil { log.Panic("JSON parse error") }

	// Return the prettified JSON as a string
	fmt.Fprintf(w, string(prettyJSON.Bytes()))
}
