create table sale (
  saledate date not null,
  product_id integer not null references product,
  quantity integer not null,
  price decimal(6,2) not null,
  primary key (saledate, product_id)
);

// Reporting on a day:

select s.product_id, p.name, s.quantity, s.price, (s.quantity * s.price) as total
from product p, sale s
where p.id = s.product_id
and s.saledate = date '2010-12-5';

// Reporting on all days:

select saledate, sum(quantity * price) as total
from sale
group by saledate
order by saledate;

// A nice master report over all days, with a summary line:

select *
from (
    (select s.saledate, s.product_id, p.name, s.quantity, s.price, (s.quantity * s.price) as total
    from product p, sale s
    where p.id = s.product_id)
  union
    (select saledate, NULL, 'TOTAL', sum(quantity), NULL, sum(quantity * price) as total
    from sale group by saledate)
) as summedsales
order by saledate, product_id;