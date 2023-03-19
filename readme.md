# Welcome to the Anythink Market repo (powered by [Wilco](https://www.trywilco.com))

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## How to run in dev mode?

### Using Codespace
1.  run `docker-compose up`
### On your local machine
1. [Install Docker](https://docs.docker.com/get-docker/)
2. [Install Docker Compose](https://docs.docker.com/compose/install/)
3. Run `docker-compose up`. 

## Tests
Documentation about running the End to End test can be found under the `/tests` directory


First of all, to do this quest you must build a generator for users, items, and comments in seeds.rb. Look at what attributes each table has after creating an item on the website. Then run `docker exec -it anythink-backend-rails bash` in the terminal. Then cd into the backend folder. Then finally run `./seeds.sh` to fill the database with seed data.