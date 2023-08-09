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

# Query Using Python on Linux

:::: info Prerequisites
1. [Request access to the Data Lab](https://servicedesk.darden.virginia.edu/support/catalog/items/90) using your Darden Microsoft account. At this time, only the Darden faculty and select staff are eligible for access to the platform. Once you've been approved by administrators, you'll receive an email and gain the ability to log in. 

2. Download and install a Python distribution, like [Anaconda Python](https://www.anaconda.com/download) (recommended). Anaconda comes with Python, Spyder IDE, Jupyter Notebooks, plus standard data analysis and visualizations libraries such as pandas, numpy, and matplotlib.
::::


## 1. Install the ODBC Driver 
The ODBC driver is required to connect to the database from Python. Click the button below to follow the download and install instructions from Microsoft. Make sure to get the version that supports your hardware. 

<CenterLevel>
  <ActionButton href='https://learn.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver16&tabs=alpine18-install%2Calpine17-install%2Cdebian8-install%2Credhat7-13-install%2Crhel7-offline'>Install ODBC Driver</ActionButton>
</CenterLevel>

## 2. Install the Azure CLI
The Azure CLI will handle logging in to your Microsoft account. Click the button below to follow the download and install instructions from Microsoft. Make sure to get the version that supports your hardware. 


<CenterLevel>
  <ActionButton href='https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt'>Install Azure CLI</ActionButton>
</CenterLevel>



## 3. Install Python Packages
The `pyodbc` package is the SQL adapter for Python, and `azure-identity` is used to authenticate. Use the following commands to install the packages from the terminal:

```bash
pip install --no-binary :all: pyodbc
pip install azure-identity pandas
```  

Note: Your **`pip`** command may be under a different name. Try replacing **`pip`** with **`pip3`**, **`python3 -m pip`**, or **`conda`** in the command if it doesn't work. 

## 4. Connect and Query Data 
Use the following code to connect and make a query: 

```python
from azure.identity import AzureCliCredential
import struct
import pyodbc 
import pandas as pd

# use the Azure CLI to get a credential
tokenb = bytes(AzureCliCredential().get_token('https://database.windows.net/')[0], "UTF-16-LE")
tokenstruct = struct.pack("=i", len(tokenb)) + tokenb

connection = pyodbc.connect("""
    DRIVER={ODBC Driver 18 for SQL Server};
    SERVER={researchdatalab-ondemand.sql.azuresynapse.net};
    DATABASE={production};""",
    attrs_before = {1256:tokenstruct}
    )

# query data into a dataframe
query = "select top 5 * from [bls].[main]"
df = pd.read_sql(query, connection)

# print dataframe dimensions
df.shape

#print dataframe
print(df)

# close the connection once done
connection.close()
```

## Learn More 

To learn more about SQL and how to use it, visit the next article, [using SQL](/guides/using-sql).