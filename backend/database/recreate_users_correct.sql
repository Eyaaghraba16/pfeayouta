-- Suppression des tables avec des clés étrangères d'abord
DROP TABLE IF EXISTS request_comments;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS password_reset_tokens;
DROP TABLE IF EXISTS professional_info;
DROP TABLE IF EXISTS personal_info;
DROP TABLE IF EXISTS users;

-- Recréation de la table users avec la bonne structure
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Création du compte administrateur
INSERT INTO users (email, password, firstname, lastname, role) 
VALUES (
    'admin@aya.com',
    '$2a$10$XFE/UQjM8HLrWYz0Z4q1IeN1r3MQRhlBFNBp8YJ/qYuEBOBvERB46',
    'Admin',
    'System',
    'admin'
);

-- Création d'un compte utilisateur test
INSERT INTO users (email, password, firstname, lastname, role) 
VALUES (
    'test@example.com',
    '$2a$10$XFE/UQjM8HLrWYz0Z4q1IeN1r3MQRhlBFNBp8YJ/qYuEBOBvERB46',
    'Test',
    'User',
    'user'
);
