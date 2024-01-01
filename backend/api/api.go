package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/xedom/codeduel/types"
)

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(v)
}

type apiFunc func(w http.ResponseWriter, r *http.Request) error

type ApiError struct {
	Err string
}

func makeHTTPHandleFunc(fn apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := fn(w, r); err != nil {
			// http.Error(w, err.Error(), http.StatusInternalServerError)
			WriteJSON(w, http.StatusInternalServerError, ApiError{Err: err.Error()})
		}
	}
}

type APIServer struct {
	listenAddr string
}

func NewAPIServer(listenAddr string) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
	}
}

func (s *APIServer) Run() {
	router := mux.NewRouter()

	router.HandleFunc("/account", makeHTTPHandleFunc(s.handleAccount)) //.Methods("GET")
	router.HandleFunc("/account/{id}", makeHTTPHandleFunc(s.handleGetAccount)) //.Methods("GET")

	http.ListenAndServe(s.listenAddr, router)

	log.Println("API server listening on", s.listenAddr)
}

func (s *APIServer) handleAccount(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		return s.handleGetAccount(w, r)
	}
	if r.Method == "POST" {
		return s.handleCreateAccount(w, r)
	}
	if r.Method == "DELETE" {
		return s.handleDeleteAccount(w, r)
	}
	
	return fmt.Errorf("method not allowed %s", r.Method)
}

func (s *APIServer) handleGetAccount(w http.ResponseWriter, r *http.Request) error {
	params := mux.Vars(r)
	fmt.Println("Fetching account", params["id"])
	account := types.NewAccount(params["id"], "test", "test", "test@test.com")
	return WriteJSON(w, http.StatusOK, account)
}

func (s *APIServer) handleCreateAccount(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func (s *APIServer) handleDeleteAccount(w http.ResponseWriter, r *http.Request) error {
	return nil
}


// func api() {
// 	fmt.Println("Super api runner")

// 	mux := http.NewServeMux()
// 	// Register the routes and handlers
// 	// mux.Handle("/", &homeHandler{})
// 	mux.Handle("/recipes", &RecipesHandler{})
// 	mux.Handle("/recipes/", &RecipesHandler{})
// 	// Run the server
// 	http.ListenAndServe(":8080", mux)
// }

// type RecipesHandler struct{}

// func (h *RecipesHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
// 	w.Write([]byte("This is my recipe page"))
// }