package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/xedom/codeduel/api"
	"github.com/xedom/codeduel/db"
)

func main() {
  err := godotenv.Load(".env")
  if err != nil { log.Fatalf("[MAIN] Error loading .env file") }
  warnUndefinedEnvVars()
  
  db, err := db.NewDB(
    os.Getenv("MARIADB_HOST"),
    os.Getenv("MARIADB_PORT"),
    os.Getenv("MARIADB_USER"),
    os.Getenv("MARIADB_PASSWORD"),
    os.Getenv("MARIADB_DATABASE"),
  )
  if err != nil { log.Fatalf("[MAIN] Error creating DB instance: %v", err) }
  if err := db.Init(); err != nil { log.Fatalf("[MAIN] Error initializing DB: %v", err) }


  server := api.NewAPIServer(os.Getenv("HOST"), os.Getenv("PORT"), db)
  server.Run()
}

func warnUndefinedEnvVars() {
  envVars := []string{
    "HOST",
    "PORT",
    "FRONTEND_URL",
    "FRONTEND_URL_AUTH_CALLBACK",
    "MARIADB_HOST",
    "MARIADB_PORT",
    "MARIADB_USER",
    "MARIADB_PASSWORD",
    "MARIADB_DATABASE",
    "AUTH_GITHUB_CLIENT_ID",
    "AUTH_GITHUB_CLIENT_SECRET",
    "AUTH_GITHUB_CLIENT_CALLBACK_URL",
  }
  
  for _, envVar := range envVars {
    _, exists := os.LookupEnv(envVar)
    if !exists { log.Printf("[MAIN] Warning: %s not defined in .env file", envVar) }
  }
}
