package types

type Match struct {
	ID 					int `json:"id"`
	OwnerID 		int `json:"owner_id"` // User.ID
	StatementID int `json:"statement_id"` // Statement.ID
	ModeID 			int `json:"mode_id"` // Mode.ID
	MaxUsers 		int `json:"max_users"`
	MaxTime 		int `json:"max_time"`
	CreatedAt 	string `json:"created_at"`
	UpdatedAt 	string `json:"updated_at"`
}

type MatchUserLink struct {
	ID 					int `json:"id"`
	MatchID 		int `json:"match_id"` // Match.ID
	UserID 			int `json:"user_id"` // User.ID
	Rank 				int `json:"rank"`
	Status 			int `json:"status"`  // Status.ID
	Duration 		int `json:"duration"`
	CreatedAt 	string `json:"created_at"`
	UpdatedAt 	string `json:"updated_at"`
}

type Statement struct {
	ID 					int `json:"id"`
	OwnerID 		int `json:"owner_id"` // User.ID
	Title 			string `json:"title"`
	Description string `json:"description"`
	Content 		string `json:"content"` // markdown maybe the link to the file
	CreatedAt 	string `json:"created_at"`
	UpdatedAt 	string `json:"updated_at"`
}

type Mode struct {
	ID 					int `json:"id"`
	Name 				string `json:"name"`
	Description string `json:"description"`
}

// 0: not ready, 1: ready, 2: in match, 3: finished
type Status struct {
	ID 					int `json:"id"`
	Name 				string `json:"name"`
}

