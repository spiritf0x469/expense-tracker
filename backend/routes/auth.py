from flask import Blueprint,request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from models import db,User
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity
auth_bp=Blueprint("auth",__name__)
@auth_bp.route("/register",methods=["POST"])
def register():
    data=request.get_json()
    username=data.get("username")
    email=data.get("email")
    password=data.get("password")
    existing_user=User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message":"user already exists!"}),400
    hashed_password=generate_password_hash(password)
    user=User(
        username=username,
        email=email,
        password_hash=hashed_password
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message":"user registered successfully"}),201
@auth_bp.route("/login",methods=["POST"])
def login():
    data=request.get_json()
    email=data.get("email")
    password=data.get("password")
    user=User.query.filter_by(email=email).first()
    if user:
        if check_password_hash(user.password_hash,password):
            token=create_access_token(identity=str(user.id))
            return jsonify({
                "message":"log in successful",
                "token":token
                }),200
        else:
            return jsonify({"message":"incorrect password!"}),400
    else:
        return jsonify({"message":"user doesn't exist!"}),400
@auth_bp.route("/profile",methods=["GET"])
@jwt_required()
def profile():
    user_id=get_jwt_identity()
    return jsonify({
        "message":"access granted",
        "user_id":user_id
    }),200