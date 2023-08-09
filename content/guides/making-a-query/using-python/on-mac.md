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

# Query Using Python on MacOS

:::: info Prerequisites
1. [Request access to the Data Lab](https://servicedesk.darden.virginia.edu/support/catalog/items/90) using your Darden Microsoft account. At this time, only the Darden faculty and select staff are eligible for access to the platform. Once you've been approved by administrators, you'll receive an email and gain the ability to log in. 

2. Download and install a Python distribution, like [Anaconda Python](https://www.anaconda.com/download) (recommended). Anaconda comes with Python, Spyder IDE, Jupyter Notebooks, plus standard data analysis and visualizations libraries such as pandas, numpy, and matplotlib.
::::


## 1. Install the ODBC Driver through the Terminal
The ODBC driver is required to connect to the database from Python. Paste the following commands into your Terminal app in order to install the ODBC Driver. 

1. Check for / install `brew`. When run, enter your password if prompted. This may take a few moments.
```bash
brew help || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```  
2. Install driver:
```bash
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
HOMEBREW_ACCEPT_EULA=Y brew install msodbcsql18 mssql-tools18
```  
3. Link the driver:
```bash
test -d /opt/homebrew && sudo ln -s /opt/homebrew/etc/obdcinst.ini /etc/odbcinst.ini
test -d /opt/homebrew && sudo ln -s /opt/homebrew/etc/odbc.ini /etc/odbc.ini
test -d /opt/homebrew || sudo ln -s /usr/local/etc/odbcinst.ini /etc/odbcinst.ini
test -d /opt/homebrew || sudo ln -s /usr/local/etc/odbc.ini /etc/odbc.ini
```  

## 2. Install the Azure CLI
The Azure CLI will handle logging in to your Microsoft account. Install it by running the following commands in the terminal.

```bash
brew install azure-cli
```
Once successfully installed, login with the following command. A browser window should open to a Microsoft login page. Choose the same Microsoft account used when registering for the Data Lab. 
```bash
az login
```

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