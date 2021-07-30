// Create table
create table transac (
  transaction_id integer primary key autoincrement,
  quantity integer not null DEFAULT 0,
  cost integer not null DEFAULT 0,
  product_id integer not null DEFAULT 0,
  inventory_id integer not null DEFAULT 0,
  timestamp DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  FOREIGN KEY(product_id) REFERENCES product(product_id)
  FOREIGN KEY(inventory_id) REFERENCES inventory(inventory_id)
);

// Insert
INSERT INTO transac (product_id, inventory_id, quantity, cost) VALUES (2, 1, 100, 1000);
INSERT INTO transac (product_id, inventory_id, quantity, cost) VALUES (1, 1, 100, 2500);

// SELECT
SELECT transac.inventory_id, transac.product_id, product.name, transac.quantity,
transac.cost, transac.timestamp
FROM transac 
LEFT JOIN product ON transac.product_id = product.product_id;

//Delete TABLE
DROP TABLE transac;