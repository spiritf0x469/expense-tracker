from flask import Flask
from config import Config
from models import db
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from routes.expenses import expense_bp
from flask_cors import CORS
app=Flask(__name__)
CORS(app,origins=["http://localhost:5173","https://expense-tracker-spiritf0x.vercel.app"])
app.register_blueprint(auth_bp,url_prefix="/api/auth")
app.register_blueprint(expense_bp,url_prefix="/api/expenses")
app.config.from_object(Config)
jwt=JWTManager(app)
db.init_app(app)
@app.route("/")
def home():
    return{"message":"api running"}
with app.app_context():
    db.create_all()
if __name__=="__main__":
    app.run(debug=True)