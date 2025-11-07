import fastapi
from fastapi import Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn
from sib_api_v3_sdk.rest import ApiException
import sib_api_v3_sdk
import os
from dotenv import load_dotenv
import datetime
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

import helper



load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_NAME = os.getenv("SENDER_NAME")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")


app = fastapi.FastAPI()
db = helper.database.Database()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In Production: ["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key['api-key'] = BREVO_API_KEY

@app.get("/")
async def root():
    return {"status": "API is running"}

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

# ================ Authentication Section ================

SECRET_KEY = os.environ.get("SECRET_AUTH_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set!")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta=None):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + (expires_delta or datetime.timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    users = db.get_user(form_data.username)
    if  not verify_password(form_data.password, users["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": form_data.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/protected")
def read_protected(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"message": f"Hello, {payload['sub']}"}

# ========================= Other =================

@app.post("/add_user")
def add_user(username: str, password: str):
    hashed_password = pwd_context.hash(password)
    db.add_user(username, hashed_password)
    return {"status": "user added"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)