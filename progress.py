from flask import Flask, render_template, jsonify, send_from_directory
import os
import pprint
from decouple import config
from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools
from re import sub
from decimal import Decimal

pp = pprint.PrettyPrinter(indent=4)

class Config(object):
	SECRET_KEY = config('SECRET_KEY') or 'sssh-its-a-secret'
	DEBUG = config('DEBUG') or 'True'

app = Flask(__name__, static_folder='progress/build')
app.config.from_object(Config)


SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'

store = file.Storage('token.json')
creds = store.get()
if not creds or creds.invalid:
    flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
    creds = tools.run_flow(flow, store)
service = build('sheets', 'v4', http=creds.authorize(Http()))


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
	if path != '' and os.path.exists('progress/build/' + path):
		return send_from_directory('progress/build', path)
	else:
		return send_from_directory('progress/build', 'index.html')


@app.route('/funds')
def funds():
	# Call the Sheets API
	SPREADSHEET_ID = config('SPREADSHEET_TOKEN')
	RANGE_NAME = config('MONEY_RANGE')
	result = service.spreadsheets().values().get(spreadsheetId=SPREADSHEET_ID,
				range=RANGE_NAME).execute()
	values = result.get('values', [])
	
	current = float(sum([Decimal(sub(r'[^\d.]', '', i[0])) for i in values]))
	goal = float(config('FUNDS_GOAL'))
	percentage = (current/goal) * 100.0
	return jsonify({'percentage': percentage, 'goal': goal, 'current': current})


@app.errorhandler(404)
def page_not_found(e):
	return render_template('404.html')


if __name__ == '__main__':
	app.run(debug=False, host='0.0.0.0', port=80)
