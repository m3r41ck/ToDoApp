from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
genai.configure(api_key=os.environ['BARD_API'])


# DB Schema Logic
class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<ToDo {self.title}>'

class ChatMessages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String, nullable=False)
    message = db.Column(db.Text, nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f'<User: {self.user}, Message: {self.message}, Created on: {self.created}>'


@app.route("/")
def to_do_list():
    return render_template('todo.html')

@app.route("/gettasks")
def get_tasks():
    task_list = ToDo.query.all()
    tasks_data = [{'id': task.id, 'title': task.title, 'completed': task.completed} for task in task_list]
    return jsonify(tasks_data)


#Logic for ToDo List Manipulation
@app.route("/add", methods=["POST"])
def add_task():
    data = request.get_json()
    new_task = ToDo(title=data['title'], completed=False)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'id': new_task.id, 'title': new_task.title, 'completed': new_task.completed})

    
@app.route("/complete/<int:task_id>", methods=["POST"])
def complete_task(task_id):
    completed_task = ToDo.query.filter_by(id=task_id).first()
    if completed_task:
        completed_task.completed = True
        db.session.commit()
    return '', 204

@app.route("/unarchive/<int:task_id>", methods=["POST"])
def unarchive_task(task_id):
    completed_task = ToDo.query.filter_by(id=task_id).first()
    if completed_task:
        completed_task.completed = False
        db.session.commit()
    return redirect(url_for('to_do_list'))

@app.route("/delete/<int:task_id>", methods=['DELETE'])
def delete_task(task_id):
    task_to_be_deleted = ToDo.query.filter_by(id=task_id).first()
    db.session.delete(task_to_be_deleted)
    db.session.commit()
    return '', 204


#Logic for ChatBot Actions
@app.route('/getmessages', methods=['GET'])
def getmessages():
    message_list = ChatMessages.query.all()
    messages_data = [{'id': message.id, 'message': message.message, 'user': message.user, 'created_on': message.created} for message in message_list]
    return jsonify(messages_data)

@app.route('/submit_message', methods=['POST'])
def submit_message():
    data = request.get_json()
    new_message = ChatMessages(user=data['user'], message=data['message'])
    db.session.add(new_message)
    db.session.commit()
    print("Message submitted successfully!")
    return jsonify({'user': new_message.user, 'message': new_message.message})


# @app.route('/clear_messages')
# def clear_messages():
#     pass

# @app.route('get_response')
# def get_response():
#     pass


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)



# Create JS logic for chatbot
# Determine what ML model to use and integrate with it
# Test
