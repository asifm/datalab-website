---
next:
  text: Using SQL
  link: /guides/using-sql
prev: 
  text: Query Using R
  link: /guides/making-a-query/using-r/
---

<script setup>
import ActionButton from '../../../../.vitepress/theme/components/ActionButton.vue'
import CenterLevel from '../../../../.vitepress/theme/components/CenterLevel.vue'
import ImageFrame from '../../../../.vitepress/theme/components/ImageFrame.vue'
</script>

# Query Using R on Windows

:::: info Prerequisites
1. [Request access to the Data Lab](https://servicedesk.darden.virginia.edu/support/catalog/items/90) using your Darden Microsoft account. At this time, only the Darden faculty and select staff are eligible for access to the platform. Once you've been approved by administrators, you'll receive an email and gain the ability to log in. 

2. [Download and install R](https://cloud.r-project.org/) (language) for your machine.

3. [Download and install RStudio](https://posit.co/download/rstudio-desktop/) for your machine.
::::

## 1. Install the ODBC Driver Version 18
The ODBC driver is required to connect to the database from R. Click the button below to follow the download and install instructions from Microsoft. Make sure to get the version that supports your hardware. 

<CenterLevel>
  <ActionButton href='https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16'>Download ODBC Driver</ActionButton>
</CenterLevel>

## 2. Install the `odbc` Package
The `odbc` package is required to let R communicate with the ODBC Driver and connect to the server. 
1. Launch RStudio, then in the **Tools** menu, choose **Install Packages**. 
2. Search for `odbc` and click **Install**.

<ImageFrame src='./on-windows/install-packages.png' style="min-height:40vh;" />
<ImageFrame src='./on-windows/click-install.png' />

## 3. Create the Database Connection 
To send queries to the database, we will need to connect through the `odbc` package we just installed. 

1. Create a new R script and paste the following code into the editor. This code will load the package, then uses the driver to connect to the database. 

```r
library(odbc) 
conn <- dbConnect(odbc(),
    .connection_string = "Authentication=ActiveDirectoryInteractive;Encrypt=yes;",
    Driver = "ODBC Driver 18 for SQL Server", 
    Server = "researchdatalab-ondemand.sql.azuresynapse.net", 
    Database = "production", 
    Port = 1433)
```  

2. **Run the script**. After a moment you should see a new window appear, prompting you to sign in with your Microsoft account. Sign in with the same Darden email used when registering for the Research Data Lab. 

<ImageFrame src='./on-windows/sign-in.png' />

The `conn` variable seen in the **Environment** pane now holds the connection, which is used to make queries. This variable can be reused until the R session ends. **Save this R script to reconnect to the server in later R sessions.**

<ImageFrame src='./on-windows/environment.png' style="min-height:30vh" />

## 4. Using the Database Connection 
Once connected to the database, you'll be able to explore the tables and schemas available in the **Connections** tab. All public datasets can be viewed under the database named `production`. The `master` and `development` databases can be ignored. Click to expand the view and look at tables and their columns. 

<ImageFrame src='./on-windows/connections.png' style="min-height:30vh"  />

## 5. Making and Using a Query
To make a query, use the the `conn` variable we've created in combination with `dbGetQuery()` function or similar commands (ex: `dbExecute`, `dbFetch`, `dbListTables`...). To see the full list of commands, reference the [DBI package manual](https://cran.r-project.org/web/packages/DBI/DBI.pdf).  

Example R script: 

```r
# get average runtime for all movies in each year
data <- dbGetQuery(conn, "SELECT startYear, AVG(runtimeMinutes) as avgRuntime
FROM [imdb].[title_basics]
WHERE titleType = 'movie'
GROUP BY startYear
ORDER BY startYear DESC;")

# take a peek at the data
head(data)

# remove rows where the average is 'NA'
data <- data[!is.na(data$avgRuntime),]

# remove years after 2023
data <- data[data$startYear <= 2023,]

# find the year with the largest avg runtime
largestRuntimeYear = data[which.max(data$avgRuntime),]
```

In the `Environment` pane, we can see the resulting data frame and result variable. 

<ImageFrame src='./on-windows/resulting-data-frame.png' style="min-height:30vh" />

Now that data is inside of an R data frame, you can use R as you normally would to explore and analyze data. For example, below we are plotting avgRuntime and startYear into a line graph to visualize the trend in average run time of movies over time. 
```r
plot(data$startYear, data$avgRuntime, type = 'l')
```

<ImageFrame src='./on-windows/plot.png' />

## More Resources
You're now set up to query and analyze data with the tools in R. For more information on the R language and its features, visit the following resources: 
- [Manuals for R](https://cran.r-project.org/manuals.html)
- [W3Schools R Tutorial](https://www.w3schools.com/r/)

## Learn More SQL

To learn more about SQL and how to use it, visit the next article, [using SQL](/guides/using-sql).