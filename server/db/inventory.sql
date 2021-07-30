// Create table
create table inventory (
  inventory_id integer primary key autoincrement,
  total integer not null DEFAULT 0,
  paid integer not null DEFAULT 0,
  dealer_id integer not null DEFAULT 0,
  timestamp DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  FOREIGN KEY(dealer_id) REFERENCES dealer(dealer_id)
);

// Insert
INSERT INTO inventory (dealer_id, total, paid) VALUES (2, 3500, 1000);

// SELECT
SELECT inventory.inventory_id, inventory.dealer_id, dealer.name AS Dealer_Name,
inventory.paid, inventory.total, inventory.timestamp
FROM inventory 
LEFT JOIN dealer ON inventory.dealer_id = dealer.dealer_id
ORDER BY inventory.timestamp DESC Limit 1

//Delete TABLE
DROP TABLE inventory;