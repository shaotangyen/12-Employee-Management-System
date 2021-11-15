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

INSERT INTO
    employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Alpha", "Zex", 1, null),
    ("Betty", "Laxon", 2, null),
    ("Charlie", "Li", 3, null),
    ("Delta", "Singh", 4, null),
    ("Echo", "Simmons", 5, null),
    ("Foxtrot", "Owen", 6, null);