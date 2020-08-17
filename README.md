# Lucid Log
Dream journal and statistics app.
## Planning
### User Data
 - username: `string` UNIQUE
 - password: `string`
 - signup: `date`
 - days: `[]`
   - techniques: `string[]`
   - sleepLength: `date`
   - dreams: `[]`
     - description: `string`
     - tags: `string[]`
   - wbtbs: `[]`
     - techniques: `string[]`,
     - time: `date`
## Prerequisites
 - Install postgresql & psql.
 - [Create a psql user](https://www.postgresql.org/docs/12/sql-createuser.html)
 - Create a database for the project in psql
```
CREATE DATABASE DATABASENAME WITH owner = YOURUSER;
```
 - Create a table in psql for 'appuser'
```
CREATE TABLE appuser (
  username varchar(20) UNIQUE,
  password varchar(30),
);
```
 - Create a `.env` file in `/server` and set the database authentication variables.
```
PGUSER=YOURUSERNAME
PGHOST=localhost # if db on remote server put ip here
PGPASSWORD=YOURPASSWORD
PGDATABASE=YOURDATABASENAME
PGPORT=5432 # if not localhost use correct db port
```
 - Run `npm install` both frontend and backend.
## Running the application
### Development
Frontend, in command line run `npm run dev`.
Backend, in the command line run `npm run dev`.
### Production
Frontend, in the command line run `npm run build`, take the compiled distribution files and upload them to a static website host or wherever you need them.

Backend, in the command line on your server run 'npm run start' and the sever will start.
