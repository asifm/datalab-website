---
prev: 
  text: Using SQL
  link: /guides/using-sql
next:
  text: Databases
  link: /databases/
---

# Best Practices 
The Research Data Lab can be used to process and analyze data at large scale. However, it differs from traditional research computing methods in order to make this feasibility possible. Follow these best practices to fully utilize its power and prevent resource misuse. 

---

# Save Resources 
On the cloud, the amount of data processed translates into a dollar cost. To prevent overconsuming resources follow these practices when querying data in SQL. It will not only save resources, it will also make your queries faster.

## Narrow Your SQL Query 
- Use `WHERE` filters to narrow down results to only data of interest.  
- Avoid selecting all columns with `SELECT *` for tables with a large number of columns. Try to select only the data you require.
- Limit the rows (observations) returned using `TOP [number]` when your search could potentially return a vast number of rows. 

## Utilize SQL's Built-In Abilities 
- Do aggregations (like `SUM`, `AVG`, `MIN`, `MAX`, or `COUNT`) on the cloud instead of pulling down raw data and processing it locally. To learn more, read up on [using SQL](/guides/using-sql).

## Test Before Running
- If you expect a query to return a large number of rows, it is recommended to first test the query by limiting the number of returned rows using the `TOP` keyword. Once the verification is successful, you can proceed to execute the complete query.
- When preparing a large aggregation or join on the data, it is advisable to initially test the query on a subset or sample of the data. Once the test proves successful, you can proceed to execute the query on the entire dataset.

&nbsp;  
# Tips for Working Efficiently 
These practices can help carry out research data analysis more efficiently when using the Research Data Lab in your workflow. 

## Build Queries, Then Program 
- Use your SQL client (such as [Azure Data Studio](/guides/making-a-query/using-a-sql-client)) to first build, test, and compile your query. Then, bring your query into your statistical programming environment for more flexibility around the resulting data. 

## Use a Python Notebook 
- When using a bare Python script, you may need to log in to the Data Lab each time you run your code. Using Python in a notebook environment, like a [Jupyter Notebook](https://jupyter.org/), stores your database connection which you can reuse without having to login again. 