# Interview Solution Run Instructions

**_All commands were tested on linux._**

### Dependencies

- All .NET projects were developed using .NET Core 8.0
- The web app was developed using the next react framework on Node 22.12.0 and pnpm 9.15.4

```
# From solution root
dotnet restore

cd lis.webapp
pnpm i
```

### Tests

```shell
# From solution root
dotnet test
```

### Running the webapi

```shell
# From solution root
dotnet run --project LIS.WebAPI
```

### Running the web app

```shell
cd lis.webapp
pnpm dev
```

### Notes
- The web api uses a sqlite database to store the form entries. I have included a .db file in the repo that has already been migrated and has some data in it. If you would like to start with a fresh database modify the connection string in LIS.WebAPI/appsettings.json and run `dotnet ef database update --startup-project LIS.WebAPI --project LIS.DataContext` from the solution root.
- My testing was done with the webapi listening on http. If you receive api errors from the webapp check the .env file in lis.webapp to ensure the url is correct.
- Tests were not written for the webapp but I can add them if desired. I wanted to get this out sooner rather than later and bootstrapping the UI tests can be time consuming.