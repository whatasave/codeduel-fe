package types

type CreateUserRequest struct {
	Username 		string `json:"username"`
	Email 			string `json:"email"`
}

type User struct {
	ID 					int `json:"id"`
	Username 		string `json:"username"`
	Email 			string `json:"email"`
	ImageURL 		string `json:"image_url"`
	CreatedAt 	string `json:"created_at"`
	UpdatedAt 	string `json:"updated_at"`
}

func NewUser(username, email string) *User {
	return &User{
		Username: username,
		Email: email,
	}
}