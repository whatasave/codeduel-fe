package db

func (m *MariaDB) createMatchTable() error {
	query := `CREATE TABLE IF NOT EXISTS match (
		id INT NOT NULL AUTO_INCREMENT,
		users_id 


		PRIMARY KEY (id),
	);`
	_, err := m.db.Exec(query)
	return err
}