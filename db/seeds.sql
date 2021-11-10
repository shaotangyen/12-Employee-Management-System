INSERT INTO
    departments (name)
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
    ("Jr. Marketing", "110000", "3");
    ("Sr. Marketing", "130000", "3");

INSERT INTO
    emploees (first_name, last_name, role_id, manager_id)
VALUES
    ("Alpha", "Zex", "1", "2"),
    ("Beta", "Yen", "2", "null"),
    ("Charlie", "Li", "3", "4"),
    ("Delta", "Singh", "4", "null"),
    ("Echo", "Simmons", "5", "6"),
    ("Foxtrot", "Owen", "6", "null");