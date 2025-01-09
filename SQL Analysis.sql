select product_name, max(profit), ship_date as Max_Profit 
from superstore
group by product_name, ship_date;


----- top 10 product with the most profit across years
select product_name, profit, quantity, ship_date from 
superstore order by profit desc
limit 10;



--most profitablie days 2018
select product_name, category, sub_category, profit, state, ship_date from 
superstore
where ship_date BETWEEN '2018-01-01' AND '2018-12-31'
order by profit desc
limit 10;

--most profitablie days 2017
select product_name, category, sub_category, profit, state, ship_date from 
superstore
where ship_date BETWEEN '2017-01-01' AND '2017-12-31'
order by profit desc
limit 10;

--most profitablie days 2016
select product_name, category, sub_category, profit, state, ship_date from 
superstore
where ship_date BETWEEN '2016-01-01' AND '2016-12-31'
order by profit desc
limit 10;

--most profitablie days 2015
select product_name, category, sub_category, profit, state, ship_date from 
superstore
where ship_date BETWEEN '2015-01-01' AND '2015-12-31'
order by profit desc
limit 10;

--most profitablie days 2014
select product_name, category, sub_category, profit, state, ship_date from 
superstore
where ship_date BETWEEN '2014-01-01' AND '2014-12-31'
order by profit desc
limit 10;

--most profitablie days 2014-2018
select product_name, category, sub_category, profit, state, ship_date from 
superstore
where ship_date BETWEEN '2014-01-01' AND '2018-12-31'
order by profit desc,
ship_date asc,
--extract(year from ship_date) asc,
extract( month from ship_date) asc
limit 10;


-------------------------------------
---table of individuals who spent the most across each year or had the most recieved since we are going by ship date
with yeartable as (
	select customer_name, state, city, product_name, category, extract(year from ship_date) as year, sum(sales) as total_sales
    from superstore
    group by
        customer_name, state, city, product_name, category, extract(year from ship_date))
select customer_name, year, total_sales, state, city, product_name, category
from
    yeartable
where
	(year, total_sales) in (
        select year, max(total_sales)
		from yeartable
        group by year)
order by year desc;

