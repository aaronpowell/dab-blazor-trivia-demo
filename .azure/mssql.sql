USE trivia;
CREATE TABLE question(
    id int IDENTITY(5001, 1) PRIMARY KEY,
    question varchar(max) NOT NULL,
    correct_answer varchar(max) NOT NULL,
    incorrect_answers varchar(max) NOT NULL CHECK ( isjson(incorrect_answers) = 1 )
);
