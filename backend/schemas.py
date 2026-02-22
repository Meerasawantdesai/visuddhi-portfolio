from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

class AdminUserBase(BaseModel):
    username: str

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUser(AdminUserBase):
    id: int
    class Config:
        from_attributes = True

class CourseBase(BaseModel):
    title: str
    description: str
    benefits: str
    date: datetime
    price: float
    image_url: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class Course(CourseBase):
    id: int
    class Config:
        from_attributes = True

class RegistrationBase(BaseModel):
    course_id: int
    name: str
    email: EmailStr
    phone: str

class RegistrationCreate(RegistrationBase):
    pass

class Registration(RegistrationBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class ReviewBase(BaseModel):
    author_name: str
    content: str
    rating: int

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    is_approved: bool

class Review(ReviewBase):
    id: int
    is_approved: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
