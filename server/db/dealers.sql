// Create table
create table dealer (
  dealer_id integer primary key autoincrement,
  name varchar(100) not null,
  number integer,
  amount integer not null DEFAULT 0,
  email TEXT,
  notes TEXT,
  timestamp DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  UNIQUE (name)
);

// Insert
// Insert
INSERT INTO dealer ("name", "number", "email", "notes", "amount") VALUES ("Chicha", 8888888888, "a@a.com", "Addr: something", 0);

//Delete TABLE
DROP TABLE dealer;