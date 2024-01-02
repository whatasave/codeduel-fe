package main

import (
	"fmt"
	"os"

	"github.com/xedom/codeduel/api"
	"github.com/xedom/codeduel/db"
)

func main() {
  // docker()
  // db.Init()

	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
  
	dbUser := os.Getenv("MARIADB_USER")
	dbPass := os.Getenv("MARIADB_PASSWORD")
	dbName := os.Getenv("MARIADB_DATABASE")
	fmt.Printf("[main]: %s %s %s %s %s \n",
    host,
    port,
    dbUser,
    dbPass,
    dbName,
  )

  db, err := db.NewDB(dbUser, dbPass, dbName)
  if err != nil { panic(err) }
  if err := db.Init(); err != nil { panic(err) }

  address := fmt.Sprintf("%s:%s", host, port)
  server := api.NewAPIServer(address, db)
  server.Run()
}