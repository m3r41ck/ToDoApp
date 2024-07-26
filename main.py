from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<ToDo {self.title}>'


@app.route("/")
def to_do_list():
    task_list = ToDo.query.filter_by(completed=False)
    return render_template("todo.html", tasks=task_list)

@app.route("/add", methods=["POST"])
def add_task():
    pass

# @app.route("/delete/<int:id>", methods=["POST"])
# def delete_task(id):
#     task = db.get_or_404(id)
#     pass

@app.route("/complete/<int:task_id>", methods=["POST"])
def complete_task(task_id):
    completed_task = ToDo.query.filter_by(id=task_id).first()
    print(completed_task)
    completed_task.completed = True
    db.session.commit()
    return redirect(url_for('to_do_list'))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)



# Create task
# Delete task
# Complete task
# Review old tasks
