package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"os/signal"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/xedom/codeduel/types"
)

type DB interface {
	CreateUser(*types.User) error
	DeleteUser(int) error
	UpdateUser(*types.User) error
	GetUsers() ([]*types.User, error)
	GetUserByID(int) (*types.User, error)

	CreateAuth(*types.AuthEntry) error
}

type MariaDB struct {
	db *sql.DB
}

func NewDB(host, port, user, pass, name string) (*MariaDB, error) {
	dsn := user+":"+pass+"@tcp("+host+":"+port+")/"+name
	pool, err := sql.Open("mysql", dsn)
	if err != nil { return nil, err }

	pool.SetConnMaxLifetime(0)
	pool.SetMaxIdleConns(5)
	pool.SetMaxOpenConns(5)

	if err:= pool.Ping(); err != nil { return nil, err }

	var version string
	pool.QueryRow("SELECT VERSION()").Scan(&version)
	log.Print("[DB] Connected to: ", version)

	return &MariaDB{
		db: pool,
	}, nil
}

var pool *sql.DB

func InitOLD() {
	dbUser := os.Getenv("MARIADB_USER")
	dbPass := os.Getenv("MARIADB_PASSWORD")
	dbName := os.Getenv("MARIADB_DATABASE")
	var err error

	dbConnectionUri := dbUser+":"+dbPass+"@/"+dbName
	pool, err = sql.Open("mysql", dbConnectionUri)
	if err != nil { log.Fatal("[DB] Unable to connect to the database:", err) }
	defer pool.Close()

	ctx, stop := context.WithCancel(context.Background())
	defer stop()

	appSignal := make(chan os.Signal, 3)
	signal.Notify(appSignal, os.Interrupt)

	go func() {
		<-appSignal
		stop()
	}()

	Ping(ctx)

	var version string
	pool.QueryRow("SELECT VERSION()").Scan(&version)
	fmt.Println("[DB] Connected to:", version)
	// Query(ctx, *id)
}

func Ping(ctx context.Context) {
	ctx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()

	if err := pool.PingContext(ctx); err != nil {
		log.Fatalf("[DB] Unable to connect to the database: %v", err)
	}
}

// func Query(ctx context.Context, id int64) {
// 	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
// 	defer cancel()

// 	var name string
// 	err := pool.QueryRowContext(ctx, "select p.name from people as p where p.id = :id;", sql.Named("id", id)).Scan(&name)
// 	if err != nil {
// 		log.Fatal("[DB] unable to execute search query", err)
// 	}
// 	log.Println("name=", name)
// }

func (m *MariaDB) CreateUser(user *types.User) (error) {
	query := `INSERT INTO users (username, email, image_url)
		VALUES (?, ?, ?);
	;`
	_, err := m.db.Exec(query, user.Username, user.Email, user.ImageURL)
	if err != nil { return err }

	id, err := m.getLastInsertID()
	if err != nil { return err }

	user.ID = id
	return err
}

func (m *MariaDB) getLastInsertID() (int, error) {
	row, err := m.db.Query(`SELECT LAST_INSERT_ID();`)
	if err != nil { return 0, err }
	defer row.Close()

	var id int
	for row.Next() {
		if err := row.Scan(&id); err != nil { return 0, err }
	}
	if err := row.Err(); err != nil { return 0, err }

	return id, nil
}

func (m *MariaDB) CreateAuth(auth *types.AuthEntry) (error) {
	query := `INSERT INTO auth (user_id, provider, provider_id)
		VALUES (?, ?, ?);
	;`
	_, err := m.db.Exec(query, auth.UserID, auth.Provider, auth.ProviderID)
	if err != nil { return err }
	
	id, err := m.getLastInsertID()
	if err != nil { return err }

	auth.ID = id
	return err
}

func (m *MariaDB) DeleteUser(id int) error {
	query := `DELETE FROM users WHERE id = ?;`
	res, err := m.db.Exec(query, id)

	if err != nil { return err }
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("user with id %d not found", id)
	}

	return err
}

func (m *MariaDB) UpdateUser(user *types.User) error {
	query := `UPDATE users SET username = ?, email = ?, image_url = ? WHERE id = ?;`
	res, err := m.db.Exec(query, user.Username, user.Email, user.ImageURL, user.ID)
	if err != nil { return err }
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("user with id %d not found", user.ID)
	}

	return err
}

func (m *MariaDB) GetUsers() ([]*types.User, error) {
	query := `SELECT * FROM users;`
	rows, err := m.db.Query(query)
	if err != nil { return nil, err }
	defer rows.Close()

	var users []*types.User
	for rows.Next() {
		user, err := m.parseUser(rows)
		if err != nil { return nil, err }
		users = append(users, user)
	}
	if err := rows.Err(); err != nil { return nil, err }

	return users, nil
}

func (m *MariaDB) GetUserByID(id int) (*types.User, error) {
	query := `SELECT * FROM users WHERE id = ?;`
	rows, err := m.db.Query(query, id)
	if err != nil { return nil, err }
	defer rows.Close()

	for rows.Next() { return m.parseUser(rows) }

	return nil, fmt.Errorf("user with id %d not found", id)
}

func (m *MariaDB) Init() error {
	if err := m.createUserTable(); err != nil { return err }
	if err := m.createAuthTable(); err != nil { return err }

	return nil
}

func (m *MariaDB) Close() error {
	return m.db.Close()
}

func (m *MariaDB) createUserTable() error {
	query := `CREATE TABLE IF NOT EXISTS users (
		id INT unique AUTO_INCREMENT,
		username VARCHAR(50) NOT NULL,
		email VARCHAR(50) NOT NULL,
		image_url VARCHAR(255),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		PRIMARY KEY (id),
		UNIQUE INDEX (username)
	);`
	_, err := m.db.Exec(query)
	return err
}

func (m *MariaDB) createAuthTable() error {
	query := `CREATE TABLE IF NOT EXISTS auth (
		id INT AUTO_INCREMENT,
		user_id INT NOT NULL,
		provider VARCHAR(50) NOT NULL,
		provider_id VARCHAR(50) NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		PRIMARY KEY (id),
		FOREIGN KEY (user_id) REFERENCES users(id)
	);`
	_, err := m.db.Exec(query)
	return err
}

func (m *MariaDB) parseUser(row *sql.Rows) (*types.User, error) {
	user := &types.User{}
	user_image_url := sql.NullString{}
	if err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user_image_url,
		&user.CreatedAt,
		&user.UpdatedAt,
	); err != nil { return nil, err }
	if user_image_url.Valid { user.ImageURL = user_image_url.String }

	return user, nil
}
