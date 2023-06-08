from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from datetime import datetime #날짜, 시간 가져오는 라이브러리

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.n0opkcs.mongodb.net/?retryWrites=true&w=majority',tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')


@app.route("/delete", methods=["POST"]) #삭제 메서드!
def delete_post():
    id_receive = request.form['id_give']
    id = int(id_receive)
    dbid = list(db.comment.find({}, {'_id': False}))
    for a in dbid :
        if id < a['id'] :
            db.comment.update_one({'id':a['id']},{'$set':{'id':a['id']-1}})
        else : 
            db.comment.delete_one({'id':id})

@app.route("/update", methods=["POST"]) #수정 메서드

def update_post():
    ucomment_receive = request.form['ucomment_give']
    id_receive = request.form['id_give']
    db.comment.update_one({'id': int(id_receive)},{'$set':{'comment':ucomment_receive}})
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