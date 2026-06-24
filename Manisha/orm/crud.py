# crud.py
# Hands On 6 - Task 2 & 3: CRUD operations and fixing N+1 with joinedload

from sqlalchemy.orm import sessionmaker, joinedload
from models import engine, Department, Student, Course, Enrollment, Professor
import time

Session = sessionmaker(bind=engine)
session = Session()

print("=" * 50)
print("CRUD OPERATIONS VIA SQLALCHEMY ORM")
print("=" * 50)

# =============================================
# Task 2: CRUD Operations
# =============================================

# READ: query all students in Computer Science department
print("\n--- Students in Computer Science ---")
cs_students = session.query(Student)\
    .join(Department)\
    .filter(Department.dept_name == 'Computer Science')\
    .all()

for student in cs_students:
    print(f"  {student.first_name} {student.last_name} - {student.email}")

# READ: query all enrollments with student and course name
# this is the N+1 version - watch echo=True output to count queries
print("\n--- All Enrollments (N+1 version) ---")
start = time.time()
enrollments = session.query(Enrollment).all()
for e in enrollments:
    # each access to e.student and e.course fires a separate query
    print(f"  {e.student.first_name} {e.student.last_name} -> {e.course.course_name} -> Grade: {e.grade}")
end = time.time()
print(f"N+1 version time: {round(end - start, 4)} seconds")

# UPDATE: find student by email and update enrollment year
print("\n--- Update Student enrollment year ---")
student = session.query(Student).filter_by(email='arjun.mehta@college.edu').first()
if student:
    print(f"  Before: {student.first_name} enrollment year = {student.enrollment_year}")
    student.enrollment_year = 2023
    session.commit()
    print(f"  After: {student.first_name} enrollment year = {student.enrollment_year}")

# =============================================
# Task 3: Fix N+1 with joinedload
# =============================================

# reset session to clear cache
session.close()
session = Session()

print("\n--- All Enrollments (joinedload version - fixes N+1) ---")
start = time.time()
# joinedload fetches everything in 1 SQL query using JOIN
enrollments = session.query(Enrollment)\
    .options(
        joinedload(Enrollment.student),
        joinedload(Enrollment.course)
    ).all()

for e in enrollments:
    print(f"  {e.student.first_name} {e.student.last_name} -> {e.course.course_name} -> Grade: {e.grade}")
end = time.time()
print(f"joinedload version time: {round(end - start, 4)} seconds")

print("\n--- Summary ---")
print("N+1 problem: 1 query for enrollments + 1 query per enrollment for student + 1 per enrollment for course")
print("joinedload fix: fetches all data in 1 single SQL query using JOIN")
print("With 10000 enrollments, N+1 would fire 20001 queries vs joinedload firing just 1")

session.close()
print("\nDone!")