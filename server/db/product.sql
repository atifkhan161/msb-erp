// Create table
create table product (
  product_id integer primary key autoincrement,
  name varchar(100) not null,
  inventory integer not null DEFAULT 0,
  timestamp DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  UNIQUE (name)
);

// Insert
INSERT INTO product ("name") VALUES ("Apple");

// Add inventory
-- SQLite
UPDATE product SET inventory = 1000 WHERE product_id = 

//Delete TABLE
DROP TABLE product;