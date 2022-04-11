from sqlalchemy import Column, String
from orm_interface.base import Base

class User(Base):
    __tablename__ = "user"

    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, primary_key=True)
    password = Column(String)

    def __init__(self, firstname, lastname, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
