from flask import Flask, render_template, request, redirect
from predict import FlightPricePrediction
app = Flask(__name__)


@app.errorhandler(404)
def error404(error):
    return render_template('error.html')


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template("index.html")


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    return render_template("predict.html")


@app.route('/predict/price', methods=['GET', 'POST'])
def predict_price():
    if request.method == "POST":
        price = FlightPricePrediction(
            *list(request.form.to_dict().values())).predictPrice()
        print(price)
        return render_template("price.html", price=price)


if __name__ == '__main__':
    app.run(debug=True)
