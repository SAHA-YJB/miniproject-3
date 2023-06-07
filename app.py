from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from datetime import datetime #날짜, 시간 가져오는 라이브러리

from pymongo import MongoClient
client = MongoClient('내 mongoDB URL')
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')

@app.route("/update", methods=["POST"]) #수정 메서드
def update_post():
    ucomment_receive = request.form['ucomment_give']
    num_receive = request.form['num_give']
    db.comment.update_one({'num': int(num_receive)},{'$set':{'comment':ucomment_receive}})
    return {'msg' : '수정 완료!'}

@app.route("/guestbook", methods=["POST"])
def guestbook_post():
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    now = datetime.now()
    date= "%d년%d월%d일%d시" % (now.year, now.month, now.day, now.hour)
    comment_list = list(db.comment.find({}, {'_id': False}))
    count = len(comment_list) + 1
    print(count)
    doc ={

        "id" : count,
        "name" : name_receive,
        "comment" : comment_receive,
        "date" : date
    }
    db.comment.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})

@app.route("/guestbook", methods=["GET"])
def guestbook_get():
    findComments = list(db.comment.find({},{'_id':False}))
    return jsonify({'result': findComments})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)