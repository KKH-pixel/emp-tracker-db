INSERT INTO departments (
    id,
    dept
)

VALUES (
    1, 'Code Poltergeists'
),
(
    2, 'Data Pirates'
);




INSERT INTO roles (
    id,
    title,
    salary,
    dept_id
)

VALUES (
    1, 'Full Stack Development', 80000, 2
),
(
    2, 'Manager', 100000, 2
),
(
    3, 'Front End Development', 60000, 1
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
),
(
    3, 'Ricardo', 'Hernandez', 2, NULL    
),
(
    4, 'Clara', 'Browning', 1, 1
),
(
    5, 'Domiique', 'Freeman', 3, 3
),
(
    6, 'Aarav', 'Shere', 3, 3
);


