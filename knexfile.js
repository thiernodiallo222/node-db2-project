// Update with your config settings.

module.exports = {
	client: "sqlite3", // specifying the DBMS
	useNullAsDefault: true, // a flag required for SQLite specifically
	connection: {
		filename: "./data/cars-dealer.db3", // location of our database file
	},
}

