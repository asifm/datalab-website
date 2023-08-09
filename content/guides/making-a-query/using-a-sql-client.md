---
next:
  text: Next Thing
  link: /guides/get-connected
---

<script setup>
import ActionButton from '../../../.vitepress/theme/components/ActionButton.vue'
import CenterLevel from '../../../.vitepress/theme/components/CenterLevel.vue'
</script>

# Query Using a SQL Client

:::: info Prerequisites
1. [Request access to the Data Lab](https://servicedesk.darden.virginia.edu/support/catalog/items/90?target=_blank) using your Darden Microsoft account. At this time, only the Darden faculty and select staff are eligible for access to the platform. Once you've been approved by administrators, you'll receive an email and gain the ability to log in. 
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

Note: If you encounter the error "User account [...] not found in MSAL cache...", please follow [these instructions](https://cosmic-slime-284.notion.site/Data-Lab-MSAL-Cache-Error-Fix-4227d2f42cd54544876c376460410546?pvs=4).