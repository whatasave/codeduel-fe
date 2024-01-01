package types

import (
	"fmt"
	"math/rand"
)

type Account struct {
	ID 				string `json:"id"`
	Username 	string `json:"username"`
	Password 	string `json:"password"`
	Email 		string `json:"email"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

func NewAccount(id, username, password, email string) *Account {
	if id == "" {
		id = fmt.Sprint(rand.Intn(1000))
	}
	return &Account{
		ID: id,
		Username: username,
		Password: password,
		Email: email,
	}
}