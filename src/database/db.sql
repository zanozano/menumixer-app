CREATE DATABASE menuescolar;

\c menuescolar;

CREATE TABLE schools (
    id INT PRIMARY KEY, 
    nombre VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL, 
    password VARCHAR(45) NOT NULL 
);

CREATE TABLE orders (
    id INT PRIMARY KEY, 
    date DATE, 
    is_rectified BOOLEAN, 
    observations TEXT,
    school_id INT,
    vegetarian INT,
    vegetarian_real INT,
    celiac INT,
    celiac_real INT,
    standard INT,
    standard_real INT,
    caloric INT,
    caloric_real INT,
    ethnic INT,
    ethnic_real INT,
    FOREIGN KEY (school_id) REFERENCES schools(id)
);

INSERT INTO schools (id, nombre, email, password) VALUES(1,'Escuela 1', 'admin@escuela1.cl', '12345678');
INSERT INTO schools (id, nombre, email, password) VALUES(2,'Escuela 2', 'admin@escuela2.cl', '12345678');
INSERT INTO schools (id, nombre, email, password) VALUES(3,'Escuela 3', 'admin@escuela3.cl', '12345678');
INSERT INTO schools (id, nombre, email, password) VALUES(4,'Escuela 4', 'admin@escuela4.cl', '12345678');
INSERT INTO schools (id, nombre, email, password) VALUES(5,'Escuela 5', 'admin@escuela5.cl', '12345678');
