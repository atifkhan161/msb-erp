// Create table
create table trade (
  trade_id integer primary key autoincrement,
  total integer not null DEFAULT 0,
  amount integer not null DEFAULT 0,
  dealer_id integer not null DEFAULT 0,
  timestamp DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
  type TEXT NOT NULL DEFAULT 'Sell',
  FOREIGN KEY(dealer_id) REFERENCES dealer(dealer_id)
);

// Insert
INSERT INTO trade (dealer_id, total, amount) VALUES (2, 3500, 1000);

// SELECT
SELECT trade.trade_id, trade.dealer_id, dealer.name AS Dealer_Name,
trade.amount, trade.total, trade.timestamp
FROM trade 
LEFT JOIN dealer ON trade.dealer_id = dealer.dealer_id
ORDER BY trade.timestamp DESC Limit 1

//Delete TABLE
DROP TABLE trade;