package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"github.com/xedom/codeduel/db"
	"github.com/xedom/codeduel/types"
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
	router.HandleFunc("/api/v1/user/{id}", authMiddleware(makeHTTPHandleFunc(s.handleUserByID)))

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

func authMiddleware(handlerFunc http.HandlerFunc) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		fmt.Println("calling auth middleware")

		tokenString := r.Header.Get("x-jwt-token")

		token, err := validateJWT(tokenString)
		if err != nil {
			WriteJSON(w, http.StatusForbidden, ApiError{Err: "invalid token"})
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		user := &types.UserRequestHeader{
			ID: claims["subject"].(int),
			Username: "test",
			Email: "test@test.com",
		}

		r.Header.Set("x-user-id", fmt.Sprintf("%d", user.ID))
		r.Header.Set("x-user-username", user.Username)
		r.Header.Set("x-user-email", user.Email)

		handlerFunc(w, r)
	}
}

const jwtSecret = "yoooSuperSecret" // TODO: move to env
func validateJWT(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		
		return []byte(jwtSecret), nil
	})
}

func createJWT(user *types.User) (string, error) {
	claims := &jwt.MapClaims {
		"expires_at": time.Now().Add(time.Hour * 24).Unix(),
		"issuer": "codeduel",
		"subject": user.ID,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(jwtSecret))
}