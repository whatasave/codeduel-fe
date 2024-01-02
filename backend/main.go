package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/xedom/codeduel/api"
	"github.com/xedom/codeduel/db"
)

func main() {
  err := godotenv.Load(".env")
  if err != nil { log.Fatalf("[MAIN] Error loading .env file") }
  
  db, err := db.NewDB(
    os.Getenv("MARIADB_HOST"),
    os.Getenv("MARIADB_PORT"),
    os.Getenv("MARIADB_USER"),
    os.Getenv("MARIADB_PASSWORD"),
    os.Getenv("MARIADB_DATABASE"),
  )
  if err != nil { panic(err) }
  // if err := db.Init(); err != nil { panic(err) }

  getGithubClientID()
  getGithubClientSecret()

  address := fmt.Sprintf("%s:%s", 
    os.Getenv("HOST"),
    os.Getenv("PORT"),
  )
  server := api.NewAPIServer(address, db)
  server.Run()
}

func getGithubClientID() string {
  githubClientID, exists := os.LookupEnv("AUTH_GITHUB_CLIENT_ID")
  if !exists { log.Fatal("Github Client ID not defined in .env file") }

  return githubClientID
}

func getGithubClientSecret() string {
  githubClientSecret, exists := os.LookupEnv("AUTH_GITHUB_CLIENT_SECRET")
  if !exists { log.Fatal("Github Client ID not defined in .env file") }

  return githubClientSecret
}