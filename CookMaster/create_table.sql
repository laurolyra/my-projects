CREATE DATABASE IF NOT EXISTS cook_master;

USE cook_master;

CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL,
    pass VARCHAR(30),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Recipes (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_name VARCHAR(30) NOT NULL,
    ingredients VARCHAR(100) NOT NULL,
    how_to_prepare VARCHAR(350) NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (author_id) REFERENCES Users(id)
);

INSERT INTO Users (email, pass, first_name, last_name)
VALUES
    ('laurolyra@gmail.com', '123456', 'Lauro', 'Lyra'),
    ('lucas@mail.com', '654321', 'Lucas', 'Lyra');
    
INSERT INTO Recipes (recipe_name, ingredients, how_to_prepare, author_id)
VALUES
    ('Pipoca de microondas', 'pipoca', 'Colocar no microondas', '1'),
    ('miojo facil', 'miojo', 'cozinhe por 3 minutos na água', '2');