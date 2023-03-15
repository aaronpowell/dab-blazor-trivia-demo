## Azure Static Web App Database Connections sample

This is a sample application on how to use the [Azure Static Web App Database Connections](https://aka.ms/swa/db/docs) feature to expose Azure SQL with GraphQL.

The application is written in Blazor and [Strawberry Shake](https://chillicream.com/docs/strawberryshake/v13) to query the GraphQL API.

You can learn more about it in the [companion blog post](https://www.aaron-powell.com/posts/2023-03-16-graphql-on-azure-part-14-using-dab-with-swa-and-blazor).

## Running the application

This repo contains a [VSCode devcontainer](https://code.visualstudio.com/docs/remote/containers) configuration, so you can open the repo in VSCode and have it provision a local MSSQL emulator instance for you. There is a script that can be used to setup the SQL database and seed it with data, you just need to run `npm run setup` after `npm install`.

Once the database is provisioned you can run `npm start` then navigate to http://localhost:4280.
