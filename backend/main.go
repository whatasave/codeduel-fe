package main

import (
	"fmt"

	"github.com/xedom/codeduel/api"
)

func main() {
  // docker()
  fmt.Println("Hello World")
  server := api.NewAPIServer(":5000")
  server.Run()
}