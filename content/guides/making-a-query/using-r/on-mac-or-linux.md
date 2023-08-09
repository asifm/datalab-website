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

# Query Using R on MacOS or Linux

:::: info Prerequisites
1. [Request access to the Data Lab](https://servicedesk.darden.virginia.edu/support/catalog/items/90) using your Darden Microsoft account. At this time, only the Darden faculty and select staff are eligible for access to the platform. Once you've been approved by administrators, you'll receive an email and gain the ability to log in. 

2. [Download and install R](https://cloud.r-project.org/) (language) for your machine.

3. [Download and install RStudio](https://posit.co/download/rstudio-desktop/) for your machine.
::::

## 1. Install Java
Java is required to connect to the database from R on MacOS and Linux. Click the button below to download and install Java from Oracle. Make sure to get the version that supports your operating system and hardware. 


### How to Check if Java is installed
Open the **Terminal** app and enter the command `java -version`. If you see output like the following, Java is already installed, and you can continue to the next step.

```txt
java version "1.8.0_291"
Java(TM) SE Runtime Environment (build 1.8.0_291-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.291-b10, mixed mode)
```

<CenterLevel>
  <ActionButton href='https://www.java.com/en/download/'>Get Java</ActionButton>
</CenterLevel>

## 2. Install the `RJDBC` and `rJava` Packages
These packages are required to let R communicate with the server. 
1. Launch RStudio, then in the **Tools** menu, choose **Install Packages**. 
2. Search for `rJava` and `RJDBC` then click **Install**.


<ImageFrame src='./on-mac-or-linux/install-packages.png' style="min-height:35vh;" />
<ImageFrame src='./on-mac-or-linux/click-install.png' />

## 3. Download Java Dependencies 
1. Download the ZIP file with the button below.  

<CenterLevel>
  <ActionButton href='./on-mac-or-linux/dependency.zip' download="dependency.zip">Download ZIP File</ActionButton>
</CenterLevel>

2. Extract the folder to your current **working directory** in RStudio. If you have a project open, this will be your project folder.


:::: info Finding Your Working Directory
Tip: If you're not sure how to find your working directory, you can click **More** > **Go to Working Directory** in the Files pane. To open the folder in the system explorer, click  **Show Folder in New Window**. 
::::




<ImageFrame src='./on-mac-or-linux/working-directory.png' style="min-height:40vh;" />

## 4. Create the Database Connection 
To send queries to the database, we will need to connect through the `RJDBC` package after using `rJava` to load the dependencies. 

1. Create a new R script and paste the following code into the editor. This code will load the packages, load Java dependencies, then use the driver to connect to the database. 

```r
library(RJDBC)
library(rJava)
library(DBI)

.jinit()
lapply(list.files(path=getwd(), pattern="*.jar", recursive=TRUE, full.names = TRUE), function(x) {.jaddClassPath(x)})
conn <- dbConnect(
  JDBC("com.microsoft.sqlserver.jdbc.SQLServerDriver", list.files(path=getwd(),pattern="*mssql-jdbc-12.2.0.jre8.jar", recursive=TRUE)),
  "jdbc:sqlserver://researchdatalab-ondemand.sql.azuresynapse.net:1433;database=production;encrypt=true;trustServerCertificate=true;hostNameInCertificate=*.sql.azuresynapse.net;loginTimeout=30;Authentication=ActiveDirectoryInteractive"
  )
```  

2. **Run the script**. After a moment your browser should open, prompting you to sign in with your Microsoft account. Sign in with the same Darden email used when registering for the Research Data Lab. 

<ImageFrame src='./on-mac-or-linux/sign-in.png' />

You should see a message saying *"Authentication complete. You can close the browser and return to the application."* 

The `conn` variable seen in the **Environment** pane now holds the connection, which is used to make queries. This variable can be reused until the R session ends. **Save this R script to reconnect to the server in later R sessions.**

<ImageFrame src='./on-mac-or-linux/environment.png' style="min-height:30vh" />

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

<ImageFrame src='./on-mac-or-linux/resulting-data-frame.png' style="min-height:30vh" />

Now that data is inside of an R data frame, you can use R as you normally would to explore and analyze data. For example, below we are plotting avgRuntime and startYear into a line graph to visualize the trend in average run time of movies over time. 
```r
plot(data$startYear, data$avgRuntime, type = 'l')
```

<ImageFrame src='./on-mac-or-linux/plot.png' />

## More Resources
You're now set up to query and analyze data with the tools in R. For more information on the R language and its features, visit the following resources: 
- [Manuals for R](https://cran.r-project.org/manuals.html)
- [W3Schools R Tutorial](https://www.w3schools.com/r/)

## Learn More SQL

To learn more about SQL and how to use it, visit the next article, [using SQL](/guides/using-sql).