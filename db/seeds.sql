INSERT INTO
    departments (department_name)
VALUES
    ("Human Resource"),
    ("Production"),
    ("Marketing");

INSERT INTO
    roles (title, salary, department_id)
VALUES
    ("Jr. HR", "80000", "1"),
    ("Sr. HR", "90000", "1"),
    ("Jr. Producer", "70000", "2"),
    ("Sr. Producer", "75000", "2"),
    ("Jr. Marketing", "110000", "3"),
    ("Sr. Marketing", "130000", "3");

-- INSERT INTO
--     employees (first_name, last_name, role_id, manager_id)
-- VALUES
--     ("Alpha", "Zex", "1", "1"), 
--     ("Beta", "Yen", "2", "1"),
--     ("Charlie", "Li", "3", "1"),
--     ("Delta", "Singh", "4", "1"),
--     ("Echo", "Simmons", "5", "1"),
--     ("Foxtrot", "Owen", "6", "1");