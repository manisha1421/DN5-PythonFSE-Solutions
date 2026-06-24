-- Hands On 4: Query Optimization - Indexes, EXPLAIN and N+1 Problem
USE college_db;

-- =============================================
-- Task 1: Baseline Performance - No Indexes
-- =============================================

-- running EXPLAIN before adding any indexes to see baseline query plan
EXPLAIN SELECT s.first_name, s.last_name, c.course_name 
FROM enrollments e 
JOIN students s ON s.student_id = e.student_id 
JOIN courses c ON c.course_id = e.course_id 
WHERE s.enrollment_year = 2022;

-- the above shows full table scan on enrollments and students
-- no indexes = MySQL has to check every row to find matches
-- for small data its fine but with 10000+ rows this gets slow

-- =============================================
-- Task 2: Add Indexes and Compare Plans
-- =============================================

-- B-Tree index on enrollment_year to speed up year filtering
CREATE INDEX idx_enrollment_year ON students(enrollment_year);

-- composite unique index on enrollments to prevent duplicates
-- also speeds up lookups by student and course together
CREATE UNIQUE INDEX idx_enrollment_unique 
ON enrollments(student_id, course_id);

-- index on course_code for faster course lookups
CREATE INDEX idx_course_code ON courses(course_code);

-- partial index concept (MySQL doesnt support partial indexes like PostgreSQL)
-- but we can simulate it with a regular index on grade
CREATE INDEX idx_grade ON enrollments(grade);

-- now run EXPLAIN again after indexes to compare
-- should show index scan instead of full table scan
EXPLAIN SELECT s.first_name, s.last_name, c.course_name 
FROM enrollments e 
JOIN students s ON s.student_id = e.student_id 
JOIN courses c ON c.course_id = e.course_id 
WHERE s.enrollment_year = 2022;

-- =============================================
-- Task 3: N+1 Problem Demo
-- =============================================

-- showing what N+1 looks like in SQL terms
-- bad approach: first fetch all enrollments
SELECT * FROM enrollments;
-- then for each row you'd run a separate query like this (N times):
SELECT first_name, last_name FROM students WHERE student_id = 1;
SELECT first_name, last_name FROM students WHERE student_id = 2;
-- this means 1 query + N separate queries = N+1 problem
-- with 10 enrollments = 11 total queries, with 10000 = 10001 queries

-- good approach: single JOIN query gets everything at once
-- this is 1 query instead of N+1
SELECT 
    e.enrollment_id,
    CONCAT(s.first_name, ' ', s.last_name) AS student_name,
    c.course_name,
    e.grade,
    e.enrollment_date
FROM enrollments e
JOIN students s ON e.student_id = s.student_id
JOIN courses c ON e.course_id = c.course_id;

-- with 10000 enrollments the N+1 version would fire 10001 queries
-- the JOIN version always fires just 1 query regardless of data size
-- this is why ORMs use eager loading (joinedload/select_related) to avoid N+1