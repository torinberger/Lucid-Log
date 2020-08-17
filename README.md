# Lucid Log
Dream journal and statistics app.
## Planning
### User Data
USERS
 - id: `serial`
 - username: `string` UNIQUE
 - password: `string`
 - tags: `string[]`
 - signup: `date`
DAYS
 - id: `serial`
 - userID: `int`
 - techniques: `string[]`
 - sleepLength: `time`
DREAMS
 - dayID: `int`
 - lucidity: `int`
 - clarity: `int`
 - length: `int`
 - description: `string`
 - tags: `string[]`
WBTBS
 - dayID: `int`
 - techniques: `string[]`,
 - time: `time`
### Data Presentation
GRAPHS
 - Dream recall, sleep length and WBTBs over time.
 - Lucidity, clarity and length over time.
 - Histogram of lucids by number to technique, as well as % success.
LISTS
 - Most common dream tags, number of times as well as % of dreams.
 - Summary with average number of lucids, average clarity, average length, average sleep length, days lucid dreaming.
## Prerequisites
 - Install postgresql & psql.
 - [Create a psql user](https://www.postgresql.org/docs/12/sql-createuser.html)
 - Create a database for the project in psql
```
CREATE DATABASE DATABASENAME WITH owner = YOURUSER;
```
 - Create a the tables needed in psql.
```
CREATE TABLE users (
  id serial,
  username varchar(20) UNIQUE,
  password varchar(50),
  signup DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY (id)
);

CREATE TABLE days (
  id serial,
  userID int,
  techniques text[],
  sleepLength time,
  PRIMARY KEY (id)
);

CREATE TABLE dreams (
  dayID int,
  lucidity int,
  clarity int,
  length int,
  description text,
  tags text[]
);

CREATE TABLE wbtbs (
  dayID int,
  techniques text[],
  time time
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
