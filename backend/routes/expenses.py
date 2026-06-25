from flask import Blueprint,request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from models import db,Expense
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity
expense_bp=Blueprint("expenses",__name__)
@expense_bp.route("/",methods=["POST"])
@jwt_required()
def add_expense():
    data=request.get_json()
    expense=Expense(
        user_id=int(get_jwt_identity()),
        item_name=data.get("item_name"),
        price=data.get("price"),
        category=data.get("category"),
        website=data.get("website")
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify({"message":"expense added"}),201
@expense_bp.route("/",methods=["GET"])
@jwt_required()
def get_expenses():
    user_id=int(get_jwt_identity())
    expenses=Expense.query.filter_by(user_id=user_id).all()
    result=[]
    for expense in expenses:
        result.append({
            "id":expense.id,
            "item_name":expense.item_name,
            "price":expense.price,
            "category":expense.category,
            "website":expense.website
        })
    return jsonify(result),200