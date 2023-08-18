---
next:
  text: Using SQL
  link: /guides/using-sql
prev: 
  text: Making a Query
  link: /guides/making-a-query/
---

<script setup>
import ActionButton from '../../../.vitepress/theme/components/ActionButton.vue'
import CenterLevel from '../../../.vitepress/theme/components/CenterLevel.vue'
import ImageFrame from '../../../.vitepress/theme/components/ImageFrame.vue'
</script>

# Query Using a SQL Client

:::: info Prerequisites
1. [Request access to the Data Lab](https://servicedesk.darden.virginia.edu/support/catalog/items/90) using your Darden Microsoft account. At this time, only the Darden faculty and select staff are eligible for access to the platform. Once you've been approved by administrators, you'll receive an email and gain the ability to log in. 
::::


## Download Azure Data Studio 

The recommended SQL application for connecting to the Research Data Lab is [Azure Data Studio](https://azure.microsoft.com/en-us/products/data-studio), a cross-platform tool made by Microsoft. Azure Data Studio comes packaged with necessary drivers and libraries for getting started quickly.  

You can also use other client apps that support SQL Server, like [SQL Server Management Studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16) if you prefer.  


<CenterLevel>
  <ActionButton href='https://learn.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16&culture=en-us&country=us&tabs=redhat-install%2credhat-uninstall'>Download Azure Data Studio</ActionButton>
</CenterLevel>


## Create a New Connection

1. Once Azure Data Studio is launched, click on the button **Create a connection**. 
2. Fill in the "Server" field with the server address below:

    ```txt
    researchdatalab-ondemand.sql.azuresynapse.net
    ```  
3. For "Authentication Type" select **Azure Active Directory** 
4. Under "Account", click **Add an account**. You'll be prompted to sign in with your Microsoft account. 
5. Sign in with the same Darden email used when registering for the Research Data Lab. 
6. Under "Database" select **production**.
7. Other fields do not have to be changed. Click **Connect** to save the connection information and login to the database. 

<ImageFrame src='./using-a-sql-client/create-a-new-connection.png' />

:::: info Note: User Account Error
If you encounter the error "User account [...] not found in MSAL cache...", please follow [these instructions](https://cosmic-slime-284.notion.site/Data-Lab-MSAL-Cache-Error-Fix-4227d2f42cd54544876c376460410546?pvs=4).
::::

## Making a Query

When first connecting to the server, you'll see a list of available datasets. The schema indicates the collection that the data comes from. When you're ready to make a query, click the **New Query** button.

<ImageFrame src='./using-a-sql-client/making-a-query.png' />

In the sidebar, you can expand each database to see the **columns** and **data types** present. 

<ImageFrame src='./using-a-sql-client/sidebar.png' />

In the new query editor tab, you can write out your query and execute it by clicking **Run**. The results of the query will appear in the bottom of the window. 

<ImageFrame src='./using-a-sql-client/run.png' />

## Sample Queries

Below are some queries that you can copy and paste to try out inside Azure Data Studio:
```sql
-- IMDb Database: Select titles from 2019, with 120+ runtime minutes, 
-- starting with "Spider-Man"
SELECT titleType, originalTitle, startYear, runtimeMinutes 
FROM [imdb].[title_basics]
WHERE startYear = 2019
AND runtimeMinutes > 120
AND originalTitle LIKE 'Spider-Man%';
```
```sql
-- Summary of Deposits Database: Get average total domestic deposits 
-- of state member banks
SELECT avg(DEPDOM) FROM [fdic].[sod]
WHERE BKCLASS = 'SM'
```
```sql
-- SEC 13F Database: Find the total value of assets of Goldman Sachs 
-- for each quarter
SELECT year_filed, quarter_filed, form_type, table_value_total
FROM [sec].[13f_summary]
JOIN [sec].[filings_details] 
ON [filings_details].[filing_id] = [13f_summary].[filing_id]
WHERE [filings_details].[cik] = 886982
GROUP BY year_filed, quarter_filed, form_type, table_value_total
ORDER BY year_filed, quarter_filed, form_type, table_value_total
```

## Learn More 

To learn more about SQL and how to use it, visit the next article, [using SQL](/guides/using-sql).