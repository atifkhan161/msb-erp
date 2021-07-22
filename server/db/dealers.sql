// Create table
create table dealers (
  dealer_id integer primary key autoincrement,
  name varchar(100) not null,
  number integer,
  email TEXT,
  notes TEXT,
  UNIQUE (name)
);

// Insert
// Insert
INSERT INTO dealer ("name", "number", "email", "notes") VALUES ("Chicha", 8888888888, "a@a.com", "Addr: something");

//Delete TABLE
DROP TABLE dealer;