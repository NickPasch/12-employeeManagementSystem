USE employees;

INSERT INTO department (name) VALUES ("Sales"), ("Product Development"), ("Global Support"), ("Marketing");

INSERT INTO role (title, salary, department_id) VALUES ("CSR Tier 3", "60000.00", "3"), ("SDET", "90000.00", "2"), ("MDR", "50000.00", "1"), ("Product Manager", "150000.00", "2"), ("Technical Transition Manager", "70000.00", "3"), ("Account Executive", "90000.00", "1");

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Hassan", "Mustafa", "3"), ("Selma", "Elgabalawy", "2"), ("Jasmine", "Wyrick", "1");


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Leanne", "White", "3", "3"), ("Koji", "Nakajima", "2", "2"), ("Nicholas", "Cousin", "1", "1");