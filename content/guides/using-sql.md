---
prev: 
  text: Making a Query
  link: /guides/making-a-query/
next:
  text: Best Practices
  link: /guides/best-practices
---

<script setup>
import ActionButton from '../../.vitepress/theme/components/ActionButton.vue'
import CenterLevel from '../../.vitepress/theme/components/CenterLevel.vue'
</script>

# Using SQL
## SQL Basics

Structured Query Language (SQL for short, sometimes pronounced "sequel") is a language for managing and processing information in a [relational database](https://www.oracle.com/database/what-is-a-relational-database/). SQL provides a simple syntax to search, aggregate, or join datasets in a way that a computer can break down into a set of optimized instructions. Get familiar with SQL using this basic tutorial.

:::: info SQL Versions
Not all versions of SQL are the same, but most are similar. The Research Data Lab uses Microsoft's Transact-SQL (T-SQL). 
::::

## IMDb Demo Database
For learning and exploring purposes, the IMDb non-commerical dataset is available in the Data Lab under the schema `imdb`. [See the full details of this database.](/#)


## Selecting Data 
Use `SELECT` to select data from a table in a database. Specify the column names separted by commas, then specify the **schema** and **table name** after `FROM`. 

```SQL
-- Pattern:
SELECT column1, column2, ...
FROM [schema_name].[table_name];

-- Example: 
-- Select movie titles, type, year and runtime
SELECT titleType, originalTitle, startYear, runtimeMinutes 
FROM [imdb].[title_basics];
```
If you would like to select all columns in the table, use `*` in place of the column names. Avoid using `*`, if there are many columns in the table
```SQL
SELECT *
FROM [imdb].[title_basics];
```


## Limiting Data
Use `TOP` to limit the number of rows returned. Otherwise, all rows that match the statement will return. *Many tables contain millions of rows*, which would take a long time to return and use up resources.
```SQL
-- Pattern:
SELECT TOP N column1, column2, ...
FROM [schema_name].[table_name];

-- Example: 
-- Select a sample of 100 titles 
SELECT TOP 100 titleType, originalTitle, startYear, runtimeMinutes 
FROM [imdb].[title_basics];
```

## Filtering Data 
To filter data down to the results you are looking for, use the `WHERE` clause followed by a condition. 

```SQL
-- Pattern:
SELECT column1, column2, ...
FROM [schema_name].[table_name]
WHERE condition;

-- Examples:
-- Select titles from 2020
SELECT titleType, originalTitle, startYear, runtimeMinutes 
FROM [imdb].[title_basics]
WHERE startYear = 2020;

-- Select titles with runtime over 120 minutes
SELECT titleType, originalTitle, startYear, runtimeMinutes 
FROM [imdb].[title_basics]
WHERE runtimeMinutes > 120;
```

To match multiple conditions, attach `AND` and `OR` clauses to the `WHERE` statement. 
```SQL
-- Pattern:
SELECT ...
FROM ...
WHERE condition_1 AND condition_2 AND condition_3 ...;

SELECT ...
FROM ...
WHERE condition_1 OR condition_2 ...;

-- Example: Select titles from 2019, with 120+ runtime minutes, 
-- starting with "Spider-Man"
SELECT titleType, originalTitle, startYear, runtimeMinutes 
FROM [imdb].[title_basics]
WHERE startYear = 2019
AND runtimeMinutes > 120
AND originalTitle like 'Spider-Man%';
```


## Ordering Data
To order results, use the `ORDER BY` clause followed by `ASC` for ascending or `DESC` for descending order. The default order is `DESC`.

```SQL
-- Pattern:
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;

-- Example: Titles from 2019 in alphabetical order. 
SELECT titleType, originalTitle, startYear, runtimeMinutes 
FROM [imdb].[title_basics]
WHERE startYear = 2019
ORDER BY originalTitle ASC;
```


## Getting Statistics
SQL provides [aggregate functions](https://learn.microsoft.com/en-us/sql/t-sql/functions/aggregate-functions-transact-sql?view=sql-server-ver16) to compute common summary statistics. To use a function, provide a column name as an argument to the function.  

Use the `COUNT()` function to return the number of rows that matches the specified query. 
- `COUNT(column_name)` returns how many rows have a value for that column (are not null)
- `COUNT(*)` returns how many rows match the whole query
```SQL
-- Pattern:
SELECT COUNT(column_name) -- OR: COUNT(*)
FROM table_name
WHERE condition;

-- Example: The number of titles in 2020
SELECT COUNT(*)
FROM [imdb].[title_basics]
WHERE startYear = 2020;
```

Use the `MIN()` function to find the minimum value of a selected variable
```SQL
-- Pattern:
SELECT MIN(column_name)
FROM table_name
WHERE condition;

-- Example: The smallest runtime from titles in 2020 
SELECT MIN(runtimeMinutes)
FROM [imdb].[title_basics]
WHERE startYear = 2020;
```

Use the `MAX()` function to find the maximum value of a selected variable. 
```SQL
-- Pattern:
SELECT MAX(column_name)
FROM table_name
WHERE condition;

-- Example: The title with the largest runtime in 2020
SELECT MAX(runtimeMinutes)
FROM [imdb].[title_basics]
WHERE startYear = 2020;
```

Use the `AVG()` function to find the average value of a numeric variable across all matching rows. 
```SQL
-- Pattern:
SELECT AVG(column_name)
FROM table_name
WHERE condition;

-- Example: The average runtime of titles that are movies
SELECT AVG(runtimeMinutes)
FROM [imdb].[title_basics]
WHERE titleType = 'movie';
```

Use the `SUM()` function to find the total sum of a numeric variable. 
```SQL
-- Pattern:
SELECT SUM(column_name)
FROM table_name
WHERE condition;

-- Example: The total runtime of titles that are not adult rated
SELECT SUM(runtimeMinutes)
FROM [imdb].[title_basics]
WHERE isAdult = FALSE;
```


## Grouping

The `GROUP BY` statement groups rows that have the same values into summary rows. This statement is often used with aggregate functions (`COUNT()`, `MAX()`, `MIN()`, `SUM()`, `AVG()`) to group the results by one or more variables. 
```SQL
-- Pattern:
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s);

-- Examples: 
-- The number of titles for each type (movie, short, tvseries, etc.)
SELECT COUNT(*)
FROM [imdb].[title_basics]
GROUP BY titleType;

-- The average runtime of movies for each year, in descending order
SELECT startYear, AVG(runtimeMinutes)
FROM [imdb].[title_basics]
WHERE titleType = 'movie'
GROUP BY startYear
ORDER BY startYear DESC;
```


## Joining Data
A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them. By default, the join is an `INNER JOIN` which means that only records with matching values in *both* tables are returned. Use `LEFT JOIN` if you want to get all values from the first table (a.k.a. "left" table) and matching values from the second table. A `LEFT JOIN` will return all records from the left table, even if there are no matches in the right table. Use `FULL OUTER JOIN` if you want to get values when there is a match in either the first table or the second table. 
```SQL
-- Pattern:
SELECT table_1.column_name, table_2.column_name, ...
FROM table_1
JOIN table_2 ON table_1.column_name = table_2.column_name;

-- Examples: 
-- Get the average rating and number of votes for the first 100 titles,
-- joined by the identifier `tconst` 
SELECT TOP 100 originalTitle, averageRating, numVotes
FROM [imdb].[title_basics]
JOIN [imdb].[title_ratings] ON title_basics.tconst = title_ratings.tconst;
```


## More Resources 
SQL comes with many features not listed here that you may find helpful in your analysis. Visit the following resources to learn more about SQL and its advanced features. 

- [W3Schools SQL Tutorial](https://www.w3schools.com/sql/default.asp)
- [Transact-SQL Reference](https://learn.microsoft.com/en-us/sql/t-sql/language-reference?view=sql-server-ver16)


## SQL Limitations 
Because SQL is a query language, there are some abilities that it cannot provide out of the box. To do more with data, such as running more advanced statistical, econometric and machine learning operations, you must utilize SQL inside of another programming languages such as Python and R. Up next, see how to use SQL when programming with Python and the R language. 