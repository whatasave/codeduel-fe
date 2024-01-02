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
	GetUserByID(int) (*types.User, error)
}

type MariaDB struct {
	db *sql.DB
}

func NewDB(user, pass, name string) (*MariaDB, error) {
	dbConnectionUri := user+":"+pass+"@/"+name
	fmt.Println("dbConnectionUri:", dbConnectionUri)
	pool, err := sql.Open("mysql", dbConnectionUri)
	if err != nil { return nil, err }

	pool.SetConnMaxLifetime(0)
	pool.SetMaxIdleConns(3)
	pool.SetMaxOpenConns(3)

	if err:= pool.Ping(); err != nil { return nil, err }

	var version string
	pool.QueryRow("SELECT VERSION()").Scan(&version)
	fmt.Println("[DB] Connected to:", version)

	return &MariaDB{
		db: pool,
	}, nil
}

var pool *sql.DB

func Init() {
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
		log.Fatalf("[DB] unable to connect to database: %v", err)
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

func (m *MariaDB) CreateUser(user *types.User) error {
	return nil
}

func (m *MariaDB) DeleteUser(id int) error {
	return nil
}

func (m *MariaDB) UpdateUser(user *types.User) error {
	return nil
}

func (m *MariaDB) GetUserByID(id int) (*types.User, error) {
	return nil, nil
}

func (m *MariaDB) Init() error {
	if err := m.createUserTable(); err != nil { return err }
	if err := m.createAuthTable(); err != nil { return err }

	return nil
}

func (m *MariaDB) Close() error {
	return nil
}

func (m *MariaDB) createUserTable() error {
	query := `CREATE TABLE IF NOT EXISTS users (
		id INT AUTO_INCREMENT,
		username VARCHAR(50) NOT NULL,
		email VARCHAR(50) NOT NULL,
		image VARCHAR(255),
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
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