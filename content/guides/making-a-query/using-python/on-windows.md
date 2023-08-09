---
next:
  text: Using SQL
  link: /guides/using-sql
prev: 
  text: Query Using Python
  link: /guides/making-a-query/using-python/
---

<script setup>
import ActionButton from '../../../../.vitepress/theme/components/ActionButton.vue'
import CenterLevel from '../../../../.vitepress/theme/components/CenterLevel.vue'
import ImageFrame from '../../../../.vitepress/theme/components/ImageFrame.vue'
</script>

# Query Using Python on Windows

:::: info Prerequisites
1. [Request access to the Data Lab](https://servicedesk.darden.virginia.edu/support/catalog/items/90) using your Darden Microsoft account. At this time, only the Darden faculty and select staff are eligible for access to the platform. Once you've been approved by administrators, you'll receive an email and gain the ability to log in. 

2. Download and install a Python distribution, like [Anaconda Python](https://www.anaconda.com/download) (recommended). Anaconda comes with Python, Spyder IDE, Jupyter Notebooks, plus standard data analysis and visualizations libraries such as pandas, numpy, and matplotlib.
:::: 

## 1. Install the ODBC Driver Version 18
The ODBC driver is required to connect to the database from Python. Click the button below to follow the download and install instructions from Microsoft. Make sure to get the version that supports your hardware. 

<CenterLevel>
  <ActionButton href='https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16'>Download ODBC Driver</ActionButton>
</CenterLevel>


## 2. Install the `pyodbc` Package
The `pyodbc` package is the SQL adapter for Python. The `pandas` package is for data analysis. Use the following `pip` command to install the packages from the command line:

```bash
python -m pip install pyodbc pandas
```  

## 3. Connect and Query Data
To connect and query data from Python on Windows, you can use the following code template in a Python IDE (e.g. Spyder) or in a Jupyter notebook. When run, you will be prompted to login to your Microsoft account in a browser window. 

```python
import pyodbc
import pandas as pd

server = 'researchdatalab-ondemand.sql.azuresynapse.net'
database = 'production'
connection = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER={'+server+'};DATABASE={'+database+'};Authentication=ActiveDirectoryInteractive;Encrypt=yes;')

# query data into a dataframe
query = "SELECT TOP 5 * FROM [bls].[main]"
df = pd.read_sql(query, connection)

# print dataframe dimensions
df.shape

#print dataframe
print(df)

# close the connection once done
connection.close()
```
&nbsp;  

## Learn More 

To learn more about SQL and how to use it, visit the next article, [using SQL](/guides/using-sql).