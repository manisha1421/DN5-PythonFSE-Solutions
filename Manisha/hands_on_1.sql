-- Hands On 1: Schema Design and DDL
-- Creating college_db from scratch with all tables and constraints

-- Task 1: Create Database and Tables

CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

-- departments table first bcoz other tables reference it
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    budget DECIMAL(12,2)
);

-- students table references departments
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    department_id INT,
    enrollment_year INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- courses also references departments
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(150) NOT NULL,
    course_code VARCHAR(20) UNIQUE,
    credits INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- enrollments links students and courses
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- professors references departments
CREATE TABLE professors (
    professor_id INT PRIMARY KEY AUTO_INCREMENT,
    prof_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Task 2: Normalization Analysis
-- 1NF: all columns have atomic values, no repeating groups
-- for eg if we stored multiple phones in one field like "9999,8888" that would break 1NF
-- all our tables pass 1NF check

-- 2NF: checked enrollments table specifically
-- enrollment_id is the PK, student_id and course_id are FKs
-- grade depends on both student AND course together, not just one of them
-- so no partial dependency issue here, 2NF is satisfied

-- 3NF: no transitive dependencies found
-- eg: storing dept_name in students would be a 3NF violation
-- because dept_name depends on department_id, not directly on student_id
-- we avoided this by using department_id as FK instead of copying dept_name

-- Task 3: Alter and Extend Schema

-- adding phone number column
ALTER TABLE students ADD COLUMN phone_number VARCHAR(15);

-- adding max_seats to courses
ALTER TABLE courses ADD COLUMN max_seats INT DEFAULT 60;

-- adding check constraint on grade
ALTER TABLE enrollments ADD CONSTRAINT chk_grade 
CHECK (grade IN ('A','B','C','D','F') OR grade IS NULL);

-- rename hod_name to head_of_dept (MySQL syntax)
ALTER TABLE departments CHANGE hod_name head_of_dept VARCHAR(100);

-- dropping phone_number (schema rollback simulation)
ALTER TABLE students DROP COLUMN phone_number;