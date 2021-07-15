// Create table
create table product (
  product_id integer primary key autoincrement,
  name varchar(100) not null,
  inventory integer not null DEFAULT 0,
  UNIQUE (name)
);

// Insert
INSERT INTO product ("name") VALUES ("Apple");

//Delete TABLE
DROP TABLE product;