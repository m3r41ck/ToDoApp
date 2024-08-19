from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


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
    created = db.Column(db.DateTime, default=False)

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
    if request.method == 'POST':
        if request.form['new_task']:
            new_task = request.form['new_task']
            to_do_task = ToDo(title=new_task)
            db.session.add(to_do_task)
            db.session.commit()
        else:
            return redirect(url_for('to_do_list'))
    return redirect(url_for('to_do_list'))
    
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

# @app.route('/submit_message', methods=['POST'])
# def submit_message():
#     pass

# @app.route('/get_message', methods=['GET'])
# def get_messages():
#     pass

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


# Update ToDo logic to handle dynamic content
# Create JS logic for chatbot
# Create logic for manipulation of database
# Determine what ML model to use and integrate with it
# Test