from flask import Flask, render_template, request, redirect, flash
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USERNAME='your_email@gmail.com',
    MAIL_PASSWORD='your_app_password',
    MAIL_USE_TLS=True,
    MAIL_USE_SSL=False
)
mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    subject = request.form['subject']
    message = request.form['message']
    msg = Message(subject=f"Message from {name}: {subject}",
                  sender=email,
                  recipients=['prayash16377488@email.com'],
                  body=f"Name: {name}\nEmail: {email}\n\n{message}")
    try:
        mail.send(msg)
        flash("Thanks, I'll reach out soon!", "success")
    except Exception as e:
        flash(f"Error: {e}", "danger")
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
