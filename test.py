import smtplib
from email.message import EmailMessage

SENDER_EMAIL = "marcg010208@gmail.com"
SENDER_PASSWORD = "autjltelqpxmhmiw"

msg = EmailMessage()
msg["From"] = SENDER_EMAIL
msg["To"] = SENDER_EMAIL
msg["Subject"] = "SMTP Test"
msg.set_content("Testnachricht von Python")

with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
    server.login(SENDER_EMAIL, SENDER_PASSWORD)
    server.send_message(msg)

print("✅ Test-Mail erfolgreich gesendet!")
