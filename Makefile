watch:
	watch -n 60 timeout 20s "node index.js >> yo.csv"

db:
	-rm db.sqlite
	sqlite3 db.sqlite < import.sql


viewers-per-minute: db
	sqlite3 db.sqlite "SELECT SUM(view_count) from kick GROUP BY run_time"
