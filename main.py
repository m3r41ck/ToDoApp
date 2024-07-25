from flask import Flask, render_template
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
    return render_template("todo.html")

# @app.route("/add", methods=["POST"])
# def add_task():
#     pass

# @app.route("/delete/<int:id>", methods=["POST"])
# def delete_task(id):
#     task = db.get_or_404(id)
#     pass


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)



# Create task
# Delete task
# Complete task
# Review old tasks
