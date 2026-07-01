from flask import Blueprint,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
from models import Expense
analytics_bp=Blueprint("analytics",__name__)
@analytics_bp.route("",methods=["GET"])
@jwt_required()
def analytcis():
    user_id=get_jwt_identity()
    expenses=Expense.query.filter_by(user_id=user_id).all()
    total=sum(expense.price for expense in expenses)
    count=len(expenses)
    average=round(total/count,2) if count else 0
    highest=max(expenses,key=lambda x:x.price) if expenses else None
    categories={}
    for expense in expenses:
        categories[expense.category]=categories.get(expense.category,0)+expense.price
    return jsonify({
        "total":total,
        "count":count,
        "average":average,
        "highest_item":highest.item_name if highest else None,
        "highest_price":highest.price if highest else 0,
        "categories":categories
    })