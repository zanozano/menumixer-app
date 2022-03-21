--SCHOOLS

CREATE DATABASE menuescolar;

CREATE TABLE schools (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL, 
    password VARCHAR(45) NOT NULL 
    );

    CREATE TABLE schools (
    id INT PRIMARY KEY, 
    nombre VARCHAR(45) NOT NULL, 
    email VARCHAR(45) NOT NULL, 
    password VARCHAR(45) NOT NULL 
    );

CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    date DATE, 
    is_rectified INT, 
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


INSERT INTO schools (nombre, email, password) VALUES('Admin Junaeb', 'admin@junaeb.cl', '12345678');

SELECT * FROM schools;

SELECT * FROM orders;

DELETE FROM schools WHERE id = 2;


DROP TABLE schools;
DROP TABLE orders;


SELECT *
        FROM schools 
        FULL OUTER JOIN orders ON schools.id = orders.school_id


INSERT INTO schools (id, nombre, email, password) VALUES(1,'Escuela 1', 'admin@escuela1.cl', '12345678');
INSERT INTO schools (id, nombre, email, password) VALUES(2,'Escuela 2', 'admin@escuela2.cl', '12345678');
INSERT INTO schools (id, nombre, email, password) VALUES(3,'Escuela 3', 'admin@escuela3.cl', '12345678');
INSERT INTO schools (id, nombre, email, password) VALUES(4,'Escuela 4', 'admin@escuela4.cl', '12345678');
INSERT INTO schools (id, nombre, email, password) VALUES(5,'Escuela 5', 'admin@escuela5.cl', '12345678');



INSERT INTO orders (
    id,
    date, 
    is_rectified, 
    observations, 
    school_id,
    vegetarian,
    vegetarian_real,
    celiac,
    celiac_real,
    standard,
    standard_real,
    caloric,
    caloric_real,
    ethnic,
    ethnic_real
    ) VALUES(1, current_date, FALSE, 'Sin observaciones', 1, 10, NULL,10, NULL,10, NULL,10, NULL,10, NULL );

    INSERT INTO orders (
    id,
    date,
    is_rectified, 
    observations, 
    school_id,
    vegetarian,
    vegetarian_real,
    celiac,
    celiac_real,
    standard,
    standard_real,
    caloric,
    caloric_real,
    ethnic,
    ethnic_real
    ) VALUES(2, current_date, TRUE, 'Sin observaciones', 2, 10, NULL,10, NULL,10, NULL,10, NULL,10, NULL );

        INSERT INTO orders (
    id,
    date,
    is_rectified, 
    observations, 
    school_id,
    vegetarian,
    vegetarian_real,
    celiac,
    celiac_real,
    standard,
    standard_real,
    caloric,
    caloric_real,
    ethnic,
    ethnic_real
    ) VALUES(3, current_date, TRUE, 'Sin observaciones', 3, 10, NULL,50, NULL,50, NULL,50, NULL,50, NULL );

     INSERT INTO orders (
    id,
    date,
    is_rectified, 
    observations, 
    school_id,
    vegetarian,
    vegetarian_real,
    celiac,
    celiac_real,
    standard,
    standard_real,
    caloric,
    caloric_real,
    ethnic,
    ethnic_real
    ) VALUES(4, current_date, FALSE, 'Sin observaciones', 4, 10, NULL,50, NULL,50, NULL,50, NULL,50, NULL );


SELECT *
        FROM schools 
        FULL OUTER JOIN orders ON schools.id = orders.school_id
        AND schools.nombre = 'Escuela 1';




			
			UPDATE orders SET vegetarian = '2' , celiac = '2', standard = '2', caloric = '2', ethnic = '2', is_rectified = 'TRUE', observations = 'Hola' 
			WHERE school_id = '1' AND id = '9654'
			RETURNING *;
			
			