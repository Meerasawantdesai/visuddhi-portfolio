from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models, auth
from datetime import datetime, timedelta

def seed():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Create Admin User
    admin = db.query(models.AdminUser).filter(models.AdminUser.username == "admin").first()
    if not admin:
        hashed_pw = auth.get_password_hash("admin123")
        admin = models.AdminUser(username="admin", hashed_password=hashed_pw)
        db.add(admin)
        print("Admin user created: admin / admin123")

    # Create Example Courses for Dr. Yogesh Warke
    if db.query(models.Course).count() == 0:
        courses = [
            models.Course(
                title="Ayurvedic Wellness & Mindfulness",
                description="Discover the harmony of Ayurveda and meditation for a balanced life.",
                benefits="Physical detoxification, mental clarity, spiritual growth.",
                date=datetime.utcnow() + timedelta(days=14),
                price=250.0
            ),
            models.Course(
                title="Visuddhi Meditation Intensive",
                description="A deep dive into the meditation practices of Visuddhi Foundation.",
                benefits="Inner peace, self-realization, advanced mindfulness.",
                date=datetime.utcnow() + timedelta(days=30),
                price=300.0
            )
        ]
        db.add_all(courses)
        print("Example courses added for Dr. Yogesh Warke.")

    # Create Example Approved Review
    if db.query(models.Review).count() == 0:
        review = models.Review(
            author_name="John Doe",
            content="Dr. Harmony's workshop changed my life. I feel much more peaceful now.",
            rating=5,
            is_approved=True
        )
        db.add(review)
        print("Example review added.")

    db.commit()
    db.close()

if __name__ == "__main__":
    seed()
