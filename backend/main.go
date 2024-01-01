package main

import (
	"github.com/xedom/codeduel/api"
)

func main() {
  // docker()
  server := api.NewAPIServer(":5000")
  server.Run()
}