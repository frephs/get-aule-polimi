from edifici import edifici
from flask import Flask, render_template, request
import datetime
from main import *
import requests as r

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
@app.route("/", methods = ['POST', 'GET'])
def home():
    t = datetime.datetime.now()
    datestr = str(t.day)+ "/" + str(t.month)+ "/" + str(t.year)+ " " + str(t.hour) + ":" + str(t.minute);
    return render_template('index.html', edifici=edifici, date=datestr)

@app.route('/results', methods = ['POST', 'GET'])
def data():
    if request.method == 'GET':
        return f"The URL /data is accessed directly. Try going to '/form' to submit form"
    if request.method == 'POST':
        form_data = request.form
        print(form_data)
        ed = request.form.get('edificio')
        strdate = request.form.get('date')
        date = datetime.datetime.strptime(strdate, '%d/%m/%Y %H:%M')
        threshold = request.form.get('hours')
        advice = getAdvice(ed, date.day, date.month, date.year, threshold);
        return render_template('results.html', advice =advice)

if __name__ == "__main__":
    app.run()
