# models.py
# Hands On 6 - Task 1: Define ORM models for college_db
# using SQLAlchemy to map Python classes to database tables

from sqlalchemy import create_engine, Column, Integer, String, Date, Numeric, ForeignKey, CHAR, Boolean
from sqlalchemy.orm import relationship, declarative_base, sessionmaker

# connect to college_db using pymysql driver
# format: mysql+pymysql://username:password@host/database
engine = create_engine(
    'mysql+pymysql://root:Manisha%40123@localhost/college_db',
    echo=True
)


Base = declarative_base()

# Department model
class Department(Base):
    __tablename__ = 'departments'
    
    department_id = Column(Integer, primary_key=True, autoincrement=True)
    dept_name = Column(String(100), nullable=False)
    head_of_dept = Column(String(100))
    budget = Column(Numeric(12, 2))
    
    # relationships
    students = relationship('Student', back_populates='department')
    professors = relationship('Professor', back_populates='department')
    courses = relationship('Course', back_populates='department')
    
    def __repr__(self):
        return f"Department(id={self.department_id}, name={self.dept_name})"


# Student model
class Student(Base):
    __tablename__ = 'students'
    
    student_id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    date_of_birth = Column(Date)
    department_id = Column(Integer, ForeignKey('departments.department_id'))
    enrollment_year = Column(Integer)
    is_active = Column(Boolean, default=True)

    # relationships
    department = relationship('Department', back_populates='students')
    enrollments = relationship('Enrollment', back_populates='student')
    
    def __repr__(self):
        return f"Student(id={self.student_id}, name={self.first_name} {self.last_name})"


# Course model
class Course(Base):
    __tablename__ = 'courses'
    
    course_id = Column(Integer, primary_key=True, autoincrement=True)
    course_name = Column(String(150), nullable=False)
    course_code = Column(String(20), unique=True)
    credits = Column(Integer)
    department_id = Column(Integer, ForeignKey('departments.department_id'))
    
    # relationships
    department = relationship('Department', back_populates='courses')
    enrollments = relationship('Enrollment', back_populates='course')
    
    def __repr__(self):
        return f"Course(id={self.course_id}, code={self.course_code})"


# Enrollment model - links students and courses
class Enrollment(Base):
    __tablename__ = 'enrollments'
    
    enrollment_id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey('students.student_id'))
    course_id = Column(Integer, ForeignKey('courses.course_id'))
    enrollment_date = Column(Date)
    grade = Column(CHAR(2))
    
    # relationships
    student = relationship('Student', back_populates='enrollments')
    course = relationship('Course', back_populates='enrollments')
    
    def __repr__(self):
        return f"Enrollment(id={self.enrollment_id}, student={self.student_id}, course={self.course_id})"


# Professor model
class Professor(Base):
    __tablename__ = 'professors'
    
    professor_id = Column(Integer, primary_key=True, autoincrement=True)
    prof_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    department_id = Column(Integer, ForeignKey('departments.department_id'))
    salary = Column(Numeric(10, 2))
    
    # relationships
    department = relationship('Department', back_populates='professors')
    
    def __repr__(self):
        return f"Professor(id={self.professor_id}, name={self.prof_name})"


# this runs only when you execute models.py directly
# it connects to the existing college_db (tables already exist from hands_on_1)
if __name__ == '__main__':
    print("Connecting to college_db...")
    # we dont call create_all here since tables already exist from SQL exercises
    # just testing the connection works
    with engine.connect() as conn:
        print("Connection successful!")
    print("All models defined successfully")