# Progress

> A flask react app that runs over https and utilizes [Google's sheets api](https://developers.google.com/sheets/api/).

## Install

### npm

Make sure [npm is installed](https://blog.teamtreehouse.com/install-node-js-npm-linux).

Then install all the needed dependencies for `progress.jsx`.

```bash
cd progress
npm install npm-install-all -g
npm-install-all src/ProgressApp.jsx
```

Then make a production build.

```bash
npm run build
```

### Docker

Make sure [Docker is installed](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce).

Then install [Docker Compose](https://docs.docker.com/compose/install/#install-compose).

## Setup

### Google Cred

Make some [google credentials](https://gspread.readthedocs.io/en/latest/oauth2.html) and save the json file you get as `credentials.json` and in the same directory as `progress.py`. While you're on the credentials page click `Create credentials` and make a Service account key, name it `token.json`, and store in the same directory of `credentials.json` and `progress.py`.

### Env config

Make a new file named `.env` in the same directory as `progress.py` and write the following in it replacing the comments with actual info:

```bash
SPREADSHEET_TOKEN=#The token the appears in the spreadsheet's API https://docs.google.com/spreadsheets/d/this_is_where_the_token_is/edit#gid=0
FUNDS_GOAL=#Enter the fundraising goal
SECRET_KEY=#Enter a secret key for flask
DEBUG=#Make this True for developing and False for production
MONEY_RANGE=#Enter the sheet formula specific to the elements you want sum
```

### Folders

Add `certs` and `challenge` folder like so:

``` bash
you@yourComputer:/path/to/cloned/repo$ ls
certs  challenge  progress
```

and change the volumes in `docker-compose.yml` accordingly.

## Usage

Firstly make an A dns record with your domain provider that points to the ip of the server you're running this on. If you don't have a server I'd recommend checking [digital ocean out](https://www.digitalocean.com/pricing/).

Once you have that bring it all up with this command.

```bash
docker-compose up --build
```

and you should be good! Add the `-d` command to have it run in the background.

## Notes

If you want to use `gspread` to access the spreadsheet check out [burnash's gspread repo](https://github.com/burnash/gspread)

## Contributing

PRs accepted.

## License

MIT © Jack Timmins