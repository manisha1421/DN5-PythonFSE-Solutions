-- Hands On 3: Advanced SQL - Subqueries, Views and Transactions
USE college_db;

-- =============================================
-- Task 1: Subqueries
-- =============================================

-- students enrolled in more courses than average
SELECT s.first_name, s.last_name, COUNT(e.course_id) AS course_count
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id
HAVING COUNT(e.course_id) > (
    SELECT AVG(course_count) FROM (
        SELECT COUNT(course_id) AS course_count 
        FROM enrollments 
        GROUP BY student_id
    ) AS avg_table
);

-- courses where all enrolled students got A
-- using NOT EXISTS to check no student got something other than A
SELECT c.course_name
FROM courses c
WHERE NOT EXISTS (
    SELECT 1 FROM enrollments e
    WHERE e.course_id = c.course_id
    AND e.grade != 'A'
);

-- professor with highest salary in each department (correlated subquery)
SELECT p.prof_name, p.salary, d.dept_name
FROM professors p
JOIN departments d ON p.department_id = d.department_id
WHERE p.salary = (
    SELECT MAX(p2.salary) 
    FROM professors p2
    WHERE p2.department_id = p.department_id
);

-- departments where avg salary exceeds 85000 using derived table
SELECT dept_name, avg_salary
FROM (
    SELECT d.dept_name, AVG(p.salary) AS avg_salary
    FROM departments d
    JOIN professors p ON d.department_id = p.department_id
    GROUP BY d.dept_name
) AS dept_avg
WHERE avg_salary > 85000;

-- =============================================
-- Task 2: Views
-- =============================================

-- view showing student name, dept, course count and GPA
CREATE OR REPLACE VIEW vw_student_enrollment_summary AS
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS full_name,
    d.dept_name,
    COUNT(e.course_id) AS courses_enrolled,
    ROUND(AVG(
        CASE 
            WHEN e.grade = 'A' THEN 4
            WHEN e.grade = 'B' THEN 3
            WHEN e.grade = 'C' THEN 2
            WHEN e.grade = 'D' THEN 1
            WHEN e.grade = 'F' THEN 0
            ELSE NULL
        END
    ), 2) AS gpa
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN departments d ON s.department_id = d.department_id
GROUP BY s.student_id, s.first_name, s.last_name, d.dept_name;

-- view for course stats
CREATE OR REPLACE VIEW vw_course_stats AS
SELECT 
    c.course_name,
    c.course_code,
    COUNT(e.enrollment_id) AS total_enrollments,
    ROUND(AVG(
        CASE 
            WHEN e.grade = 'A' THEN 4
            WHEN e.grade = 'B' THEN 3
            WHEN e.grade = 'C' THEN 2
            WHEN e.grade = 'D' THEN 1
            WHEN e.grade = 'F' THEN 0
            ELSE NULL
        END
    ), 2) AS avg_gpa
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name, c.course_code;

-- query the view to find students with GPA above 3.0
SELECT * FROM vw_student_enrollment_summary
WHERE gpa > 3.0;

-- check course stats view
SELECT * FROM vw_course_stats;

-- trying to update through a multi-table view will fail
-- UPDATE vw_student_enrollment_summary SET dept_name = 'IT' WHERE student_id = 1;
-- multi-table views are not updatable in MySQL because MySQL cant determine
-- which base table to update when the view spans multiple tables

-- drop and recreate as single table view with CHECK OPTION
DROP VIEW IF EXISTS vw_student_enrollment_summary;

CREATE VIEW vw_student_enrollment_summary AS
SELECT student_id, first_name, last_name, enrollment_year
FROM students
WHERE enrollment_year = 2022
WITH CHECK OPTION;

-- =============================================
-- Task 3: Stored Procedures and Transactions
-- =============================================

-- stored procedure to enroll a student (checks for duplicates)
DELIMITER $$

CREATE PROCEDURE sp_enroll_student(
    IN p_student_id INT,
    IN p_course_id INT,
    IN p_enrollment_date DATE
)
BEGIN
    -- check if already enrolled
    IF EXISTS (
        SELECT 1 FROM enrollments 
        WHERE student_id = p_student_id 
        AND course_id = p_course_id
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Student is already enrolled in this course';
    ELSE
        INSERT INTO enrollments (student_id, course_id, enrollment_date)
        VALUES (p_student_id, p_course_id, p_enrollment_date);
        SELECT 'Enrollment successful' AS status;
    END IF;
END$$

DELIMITER ;

-- create log table for department transfers
CREATE TABLE IF NOT EXISTS department_transfer_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    old_department_id INT,
    new_department_id INT,
    transfer_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- stored procedure to transfer student between departments
DELIMITER $$

CREATE PROCEDURE sp_transfer_student(
    IN p_student_id INT,
    IN p_new_dept_id INT
)
BEGIN
    DECLARE old_dept INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Transfer failed, rolled back' AS status;
    END;
    
    START TRANSACTION;
    
    SELECT department_id INTO old_dept 
    FROM students WHERE student_id = p_student_id;
    
    UPDATE students SET department_id = p_new_dept_id 
    WHERE student_id = p_student_id;
    
    INSERT INTO department_transfer_log 
    (student_id, old_department_id, new_department_id)
    VALUES (p_student_id, old_dept, p_new_dept_id);
    
    COMMIT;
    SELECT 'Transfer successful' AS status;
END$$

DELIMITER ;

-- test sp_enroll_student
CALL sp_enroll_student(1, 3, '2022-08-01');

-- test duplicate enrollment (should give error message)
CALL sp_enroll_student(1, 1, '2022-08-01');

-- test transfer student
CALL sp_transfer_student(1, 2);

-- verify transfer log
SELECT * FROM department_transfer_log;

-- SAVEPOINT demo
START TRANSACTION;

INSERT INTO enrollments (student_id, course_id, enrollment_date, grade)
VALUES (2, 4, '2022-08-01', 'B');

SAVEPOINT after_first_insert;

-- this insert will fail because student 2 is already in course 4
-- so we rollback to savepoint
INSERT INTO enrollments (student_id, course_id, enrollment_date, grade)
VALUES (9, 1, '2022-08-01', 'A');

ROLLBACK TO SAVEPOINT after_first_insert;

COMMIT;

-- verify only first insert survived
SELECT * FROM enrollments WHERE student_id IN (2, 9);