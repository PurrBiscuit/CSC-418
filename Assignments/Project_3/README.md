# Project 3

## Overview

A simple express application to allow for a user to input a contact and have it displayed in list of contacts in another tab.

## Development

Enter `npm install` to install all dependencies before proceeding to the subsections below.

The examples listed below are ways to run the application on your host machine directly.  It's recommended to use Docker to run this locally however since the configurations are all in place for it already and it makes for a repeatable, predictable development environment.  Please see the [Docker Instructions](#docker) for ways to run this application through our Docker configurations.

### Running Program

Enter the `MONGODB_URL=<url_to_mongodb> npm run start` command to start the program itself.  This will start the express server locally on port 3000 - visit http://localhost:3000 to access the app.

### Docker

If you want to run any of the commands with docker instead of locally, you can do so with the following steps:

#### Run App

**The `docker compose` commands below require [Docker Desktop version 3.0.0](https://docs.docker.com/docker-for-mac/release-notes/#docker-desktop-300) or greater to work**

1. Start up the docker containers with `docker compose up`.
2. Navigate to http://localhost:3000 to see the running application.
3. Navigate to http://localhost:8081 to see an admin console for the running `mongo` container.

#### Connecting into `mongo` container

**The `docker compose exec` command is available in [Docker Desktop versions 3.2.0](https://docs.docker.com/docker-for-mac/release-notes/#docker-desktop-320) or greater**

After the containers have been started successfully with `docker compose up`, you can enter into the `mongo` container directly.  If you wanted to get into the `mongo` container and run the `mongo` command line you can use:

`docker compose exec mongo mongo`

Once you are in the container and running the `mongo` command line you can enter normal `mongo` commands like `show dbs`, `use <db_name>`, `show collections`, etc.

### Mongo

This project uses [mongodb](https://www.mongodb.com/2) as its data store.

#### Useful `mongo` CLI commands

Listed below are some helpful `mongo` CLI commands that can be used after `exec`ing into the `mongo` container or connecting remotely to your mongodb instance.

- `show dbs` - show all dbs.
- `use dbName` - connect to a database by name. (ie. `use students_db`)
- `db.collectionName.find()` - return the first 20 records from that collection in the database you're currently connected to. (ie. `db.students.find()`)
