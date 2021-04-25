INSERT INTO departments (
    id,
    dept
)

VALUES (
    1, 'Applesauce'
),
(
    2, 'Bakersville'
);



INSERT INTO roles (
    id,
    title,
    salary,
    dept_id
)

VALUES (
    1, 'Database', 25000, 1
),
(
    2, 'Manager', 50000, 1
);



INSERT INTO employees (
    id,
    first_name,
    last_name,
    role_id,
    manager_id
)

VALUES (
    1, 'Kayla', 'Smith', 2, NULL
),
(
    2, 'Dennis', 'Michaels', 1, 1
);

-- (
--     3, 'Louis', 'Brown', roles, NULL    
-- )


