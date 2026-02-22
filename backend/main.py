from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database, auth
from datetime import datetime

# Initialize database
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Doctor Portfolio API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.security import OAuth2PasswordRequestForm

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(db: Session = Depends(database.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(models.AdminUser).filter(models.AdminUser.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Courses
@app.get("/courses", response_model=List[schemas.Course])
def get_courses(db: Session = Depends(database.get_db)):
    return db.query(models.Course).all()

@app.post("/courses", response_model=schemas.Course)
def create_course(course: schemas.CourseCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_course = models.Course(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

# Registrations
@app.post("/registrations", response_model=schemas.Registration)
def create_registration(registration: schemas.RegistrationCreate, db: Session = Depends(database.get_db)):
    db_registration = models.Registration(**registration.dict())
    db.add(db_registration)
    db.commit()
    db.refresh(db_registration)
    return db_registration

# Reviews
@app.get("/reviews", response_model=List[schemas.Review])
def get_approved_reviews(db: Session = Depends(database.get_db)):
    return db.query(models.Review).filter(models.Review.is_approved == True).all()

@app.post("/reviews", response_model=schemas.Review)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(database.get_db)):
    db_review = models.Review(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@app.get("/admin/reviews", response_model=List[schemas.Review])
def get_all_reviews(db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    return db.query(models.Review).all()

@app.patch("/reviews/{review_id}", response_model=schemas.Review)
def update_review_status(review_id: int, review_update: schemas.ReviewUpdate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Review not found")
    db_review.is_approved = review_update.is_approved
    db.commit()
    db.refresh(db_review)
    return db_review
