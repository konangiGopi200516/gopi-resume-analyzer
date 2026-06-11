-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS resume_analyzer;
USE resume_analyzer;

-- Create the users table to store credentials
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Note: The Spring Boot backend uses BCrypt to hash the passwords before inserting them into this table.
