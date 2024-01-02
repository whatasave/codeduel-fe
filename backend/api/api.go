package api

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/xedom/codeduel/db"
)

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}

type APIServer struct {
	listenAddr 	string
	db 			 		db.DB
}

type ApiError struct {
	Err string `json:"error"`
}

type apiFunc func(w http.ResponseWriter, r *http.Request) error

func NewAPIServer(listenAddr string, db db.DB) *APIServer {
	log.Print("[API] Starting API server on ", listenAddr)
	return &APIServer{
		listenAddr: listenAddr,
		db: db,
	}
}

func (s *APIServer) Run() {
	router := mux.NewRouter()

	router.HandleFunc("/api/v1/user", makeHTTPHandleFunc(s.handleUser))
	router.HandleFunc("/api/v1/user/{id}", makeHTTPHandleFunc(s.handleUserByID))

	// router.HandleFunc("/api/v1/match", makeHTTPHandleFunc(s.handleMatch))
	// router.HandleFunc("/api/v1/match/{id}", makeHTTPHandleFunc(s.handleMatchByID))

	router.HandleFunc("/api/v1/auth/github", makeHTTPHandleFunc(s.handleGithubAuth))
	router.HandleFunc("/api/v1/auth/github/callback", makeHTTPHandleFunc(s.handleGithubAuthCallback))

	http.ListenAndServe(s.listenAddr, router)
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

func makeHTTPHandleFunc(fn apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := fn(w, r); err != nil {
			// http.Error(w, err.Error(), http.StatusInternalServerError)
			WriteJSON(w, http.StatusInternalServerError, ApiError{Err: err.Error()})
		}
	}
}