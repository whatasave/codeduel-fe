package types

type User struct {
	ID 					string `json:"id"`
	Username 		string `json:"username"`
	Email 			string `json:"email"`
	ImageURL 		string `json:"image"`
	CreatedAt 	string `json:"createdAt"`
	UpdatedAt 	string `json:"updatedAt"`
}

func NewUser(username, email string) *User {
	return &User{
		Username: username,
		Email: email,
	}
}