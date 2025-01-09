CREATE TABLE Superstore(
Row_ID INT Primary Key,
Order_ID VARCHAR(50),
Order_Date Date,
Ship_Date Date,
Ship_Mode VARCHAR(50),
Customer_ID VARCHAR(100),
Customer_Name VARCHAR(100),
Segment VARCHAR(100),
Country VARCHAR(100),
City VARCHAR(100),
State VARCHAR(100),
Postal_Code Numeric,
Region VARCHAR(50),
Product_ID VARCHAR(100),
Category VARCHAR(100),
Sub_Category VARCHAR(100),
Product_Name VARCHAR(500),
Sales Numeric,
Quantity INT,
Discount Numeric,
Profit Numeric);
Drop Table Superstore;


Select * from Superstore;