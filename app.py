from edifici import edifici
from flask import Flask, render_template, request, redirect
import datetime
from main import *
import requests as r
import sys

app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True
def visitcount():
	with open("visitors.log", "r+") as f:
		fileContent = f.read()
		if fileContent == "":
			count = 1
		else:
			count = int(fileContent) + 1
		f.seek(0)
		f.write(str(count))
		f.truncate()
		return int(str(count))

@app.route("/", methods = ['GET'])
def home():
    return "Hello world"

@app.route("/aule/", methods = ['POST', 'GET'])
@app.route("/aule", methods = ['POST', 'GET'])
def aule():
    t = datetime.datetime.now()
    datestr = str(t.day)+ "/" + str(t.month)+ "/" + str(t.year)+ " " + str(t.hour) + ":" + ("0" + str(t.minute))[-2:];
    return render_template('index.html', edifici=edifici, date=datestr)

@app.route('/aule/results/', methods = ['POST', 'GET'])
@app.route('/aule/results', methods = ['POST', 'GET'])
def data():
    if request.method == 'GET':
        return redirect("/aule")
    if request.method == 'POST':
        form_data = request.form
        print(form_data)
        ed = request.form.get('edificio')
        strdate = request.form.get('date')
        now  = datetime.datetime.today()
        date = datetime.datetime.strptime(strdate, '%d/%m/%Y %H:%M')
        threshold = request.form.get('hours')
        map = "0"
        if (ed[:3] == "MIA"):
            map = "1"
        elif (ed[:3] == "MIB"):
            map = "2"
        try:
            return render_template('results.html', advice=getAdvice(ed, date.day, date.month, date.year, float(threshold), (now.hour+now.minute/60)), location = map, info = [edifici[ed], date.day, date.month, date.year, float(threshold), (now.hour+now.minute/60), visitcount()])
        except Exception as e:
            return render_template('error.html', e=e)



if __name__ == "__main__":
    if '--secure' in sys.argv:
		app.config['TESTING'] = False;
		app.config['PREFERRED_URL_SCHEME'] = 'https'
        @app.before_request
        def before_request():
            if not request.is_secure:
                url = request.url.replace('http://', 'https://', 1)
                code = 301
                return redirect(url, code=code)

        app.run(host="0.0.0.0", ssl_context=('certificates/fullchain1.pem', 'certificates/privkey1.pem'))
    else:
        print("Running Locally")
        app.run(host="0.0.0.0")
