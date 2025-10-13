import fastapi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In Production: ["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic Model für die Request Body Validierung
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str


# Email Konfiguration (WICHTIG: Setze diese als Umgebungsvariablen!)
SMTP_SERVER = "smtp.gmail.com"  # Für Gmail
SMTP_PORT = 587
SENDER_EMAIL = "marcg010208@gmail.com"  # Deine Email
SENDER_PASSWORD = "autjltelqpxmhmiw"  # Gmail App-Passwort (nicht dein normales Passwort!)
RECEIVER_EMAIL = "marcg010208@gmail.com"  # Wohin die Kontaktanfragen gehen sollen


@app.post("/sendMail")
async def send_mail(contact: ContactRequest):
    try:
        # Email erstellen
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f"Neue Kontaktanfrage von {contact.name}"

        # Email Body
        body = f"""
        Neue Kontaktanfrage über die Website:

        Name: {contact.name}
        Email: {contact.email}

        Nachricht:
        {contact.message}
        """

        msg.attach(MIMEText(body, 'plain'))


        # Email versenden
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())
            server.quit()

        print(f"✅ Mail erfolgreich gesendet von {contact.name} ({contact.email})")
        return {
            "status": "success",
            "message": "Mail sent successfully"
        }

    except Exception as e:
        print(f"❌ Fehler beim Senden: {str(e)}")
        raise fastapi.HTTPException(
            status_code=500,
            detail=f"Failed to send email: {str(e)}"
        )


# Health Check Endpoint
@app.get("/")
async def root():
    return {"status": "API is running"}


# Test Endpoint
@app.get("/test")
async def test():
    return {"message": "FastAPI Backend is working!"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)