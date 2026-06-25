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
            "website":expense.website,
            "created_at":expense.created_at,
            "updated_at":expense.updated_at
        })
    return jsonify(result),200
@expense_bp.route("/<int:id>",methods=["DELETE"])
@jwt_required()
def delete_expense(id):
    user_id=int(get_jwt_identity())
    expense=Expense.query.filter_by(id=id,user_id=user_id).first()
    if not expense:
        return jsonify({"message":"expense not found"}),404
    db.session.delete(expense)
    db.session.commit()
    return jsonify({"message":"expense deleted"}),200
@expense_bp.route("/<int:id>",methods=["PUT"])
@jwt_required()
def update_expense(id):
    user_id=int(get_jwt_identity())
    expense=Expense.query.filter_by(id=id,user_id=user_id).first()
    if not expense:
        return jsonify({"message":"expense not found"}),404
    data=request.get_json()
    expense.item_name=data.get("item_name",expense.item_name)
    expense.price=data.get("price",expense.price)
    expense.category=data.get("category",expense.category)
    expense.website=data.get("website",expense.website)
    db.session.commit()
    return jsonify({"message":"expense updated"}),200
@expense_bp.route("/summary",methods=["GET"])
@jwt_required()
def expense_summary():
    user_id=int(get_jwt_identity())
    expenses=Expense.query.filter_by(user_id=user_id).all()
    total_expenses=len(expenses)
    # new
    total_spent=sum(expense.price for expense in expenses)
    average_expense=0
    if total_expenses:
        average_expense=total_spent/total_expenses
    return jsonify({
        "total_expenses":total_expenses,
        "total_spent":total_spent,
        "average_expense":round(average_expense,2)
    }),200
@expense_bp.route("/category-summary",methods=["GET"])
@jwt_required()
def category_summary():
    user_id=int(get_jwt_identity())
    expenses=Expense.query.filter_by(user_id=user_id).all()
    categories={}
    for expense in expenses:
        if expense.category in categories:
            categories[expense.category]+=expense.price
        else:
            categories[expense.category]=expense.price
    return jsonify(categories),200
@expense_bp.route("/recent",methods=["GET"])
@jwt_required()
def recent_expenses():
    user_id=int(get_jwt_identity())
    expenses=Expense.query\
        .filter_by(user_id=user_id)\
        .order_by(Expense.created_at.desc())\
        .limit(5)\
        .all()
    result=[]
    for expense in expenses:
        result.append({
            "id":expense.id,
            "item_name":expense.item_name,
            "price":expense.price,
            "category":expense.category,
            "website":expense.website,
            "created_at":expense.created_at,
            "updated_at":expense.updated_at
        })
    return jsonify(result),200