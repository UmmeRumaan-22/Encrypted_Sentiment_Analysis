CREATE DATABASE encrypted_sentiment;

USE encrypted_sentiment;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255) DEFAULT 'user'
);

CREATE TABLE predictions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    message TEXT,
    positive FLOAT,
    neutral FLOAT,
    negative FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sentiments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT,
    sentiment VARCHAR(50)
);

SELECT * FROM encrypted_sentiment.predictions p ;

SELECT * FROM encrypted_sentiment.users u ;
