-- Use the database
USE chapel_seminar_db;

-- Create the Users table

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);
-- Add PRIMARY KEY constraint for user_id
ALTER TABLE Users
ADD PRIMARY KEY (user_id);
-- Add UNIQUE constraint for email
ALTER TABLE Users
ADD CONSTRAINT unique_email UNIQUE (email);

-- Create the Seminars table
-- Create Seminars table without Primary Key constraint
CREATE TABLE IF NOT EXISTS Seminars (
    seminar_id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    speaker_name VARCHAR(255) NOT NULL
);
-- Add PRIMARY KEY constraint for seminar_id
ALTER TABLE Seminars
ADD PRIMARY KEY (seminar_id);

-- Create the Registrations table
-- Create Registrations table without Foreign Key constraints
CREATE TABLE IF NOT EXISTS Registrations (
    registration_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    seminar_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Add PRIMARY KEY constraint for registration_id
ALTER TABLE Registrations
ADD PRIMARY KEY (registration_id);
-- Add FOREIGN KEY constraint for user_id referencing Users
ALTER TABLE Registrations
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(user_id);
-- Add FOREIGN KEY constraint for seminar_id referencing Seminars
ALTER TABLE Registrations
ADD CONSTRAINT fk_seminar FOREIGN KEY (seminar_id) REFERENCES Seminars(seminar_id);

