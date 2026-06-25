from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash,check_password_hash
db=SQLAlchemy()
class User(db.Model):
    __tablename__="users"
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(100),nullable=False)
    email=db.Column(db.String(120),unique=True,nullable=False)
    password_hash=db.Column(db.String(255),nullable=False)
class Expense(db.Model):
    __tablename__="expenses"
    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey("users.id"),nullable=False)
    item_name=db.Column(db.String(100),nullable=False)
    price=db.Column(db.Float,nullable=False)
    category=db.Column(db.String(50),nullable=False)
    website=db.Column(db.String(100))