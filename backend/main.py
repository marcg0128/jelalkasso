import fastapi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn
from sib_api_v3_sdk.rest import ApiException
import sib_api_v3_sdk
import os
from dotenv import load_dotenv
import datetime



load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_NAME = os.getenv("SENDER_NAME")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")


app = fastapi.FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In Production: ["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = BREVO_API_KEY

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.post("/sendMail")
async def send_mail(contact: ContactRequest):
    try:
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))

        send_smtp_email_to_log = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": RECEIVER_EMAIL, "name": 'Jelal Kasso'}],
            sender={"email": SENDER_EMAIL, "name": contact.name},   # email beispeil: info@jelalkasso.de
            subject=f"Neue Anfrage von {contact.name}",
            html_content=f"""
                    <div style='font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#f9f9f9;border-radius:8px;'>
                        <h2 style='color:#222;margin-bottom:16px;'>Neue Anfrage</h2>
                        <table style='width:100%;border-collapse:collapse;'>
                            <tr><td style='padding:8px 0;'><strong>Vorname:</strong></td><td>{contact.name}</td></tr>
                            <tr><td style='padding:8px 0;'><strong>Email:</strong></td><td>{contact.email}</td></tr>
                            <tr>
                                <td style='padding:8px 0; vertical-align: top;'><strong>Kommentar:</strong></td>
                                <td style='padding:8px 0; white-space: pre-wrap;'>{contact.message}</td>
                            </tr>
                            <tr><td style='padding:8px 0;'><strong>Datum:</strong></td><td>{datetime.datetime.now().strftime("%d.%m.%Y %H:%M:%S")}</td></tr>
                        </table>
                    </div>
                """
        )

        api_instance.send_transac_email(send_smtp_email_to_log)
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


# @app.post("/sendMail")
# async def send_mail(contact: ContactRequest):
#     try:
#         # Email erstellen
#         msg = MIMEMultipart()
#         msg['From'] = SENDER_EMAIL
#         msg['To'] = RECEIVER_EMAIL
#         msg['Subject'] = f"Neue Kontaktanfrage von {contact.name}"
#
#         # Email Body
#         body = f"""
#         Neue Kontaktanfrage über die Website:
#
#         Name: {contact.name}
#         Email: {contact.email}
#
#         Nachricht:
#         {contact.message}
#         """
#
#         msg.attach(MIMEText(body, 'plain'))
#
#
#         # Email versenden
#         with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
#             server.ehlo()
#             server.starttls()
#             server.login(SENDER_EMAIL, SENDER_PASSWORD)
#             server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())
#             server.quit()
#
#         print(f"✅ Mail erfolgreich gesendet von {contact.name} ({contact.email})")
#         return {
#             "status": "success",
#             "message": "Mail sent successfully"
#         }
#
#     except Exception as e:
#         print(f"❌ Fehler beim Senden: {str(e)}")
#         raise fastapi.HTTPException(
#             status_code=500,
#             detail=f"Failed to send email: {str(e)}"
#         )


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