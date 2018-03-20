--
-- USERS
--

INSERT INTO
    user (id, email, password, creationDate)
VALUES
    (1, 'hector@email.com', '$2a$10$/fji/bbJEXWG9coxcx47jeSQPak5NySs.28W5MmV4k.B0aU2L2BGu', '2018-03-07'),
    (2, 'raul@email.com', '$2a$10$/fji/bbJEXWG9coxcx47jeSQPak5NySs.28W5MmV4k.B0aU2L2BGu', '2018-03-07'),
    (3, 'javier@email.com', '$2a$10$/fji/bbJEXWG9coxcx47jeSQPak5NySs.28W5MmV4k.B0aU2L2BGu', '2018-03-07'),
    (4, 'cesar@email.com', '$2a$10$/fji/bbJEXWG9coxcx47jeSQPak5NySs.28W5MmV4k.B0aU2L2BGu', '2018-03-07'),
    (5, 'senmao@email.com', '$2a$10$/fji/bbJEXWG9coxcx47jeSQPak5NySs.28W5MmV4k.B0aU2L2BGu', '2018-03-07'),
    (6, 'michal@email.com', '$2a$10$/fji/bbJEXWG9coxcx47jeSQPak5NySs.28W5MmV4k.B0aU2L2BGu', '2018-03-07');


--
-- USERS <---> USERS
--

INSERT INTO
    friendrequest (creation_date, review_date, accepted, orig_author_id, dest_author_id)
VALUES
    ('2018-03-07', '2018-03-07', 1, 1, 2),
    ('2018-03-08', '2018-03-09', 0, 1, 3),
    ('2018-03-08', NULL, NULL, 1, 6),
    ('2018-03-08', NULL, NULL, 2, 3),
    ('2018-03-10', NULL, NULL, 4, 1);


--
-- RESOURCES
--

INSERT INTO
    resources (id, name, creationDate, releaseDate, author_id)
VALUES
    (1, 'Blade Runnner 2049', '2018-03-07', '2017-10-06', 1),
    (2, 'Inception', '2018-03-07', '2010-07-16', 4),
    (3, 'Citizen Ken', '2018-03-07', '1941-09-04', 3),
    (4, 'The Godfather', '2018-03-07', '1972-03-11', 2),
    (5, 'Moonlight', '2018-03-07', '2016-10-21', 4),
    (6, 'Manchester by the sea', '2018-03-07', '2016-11-18', 1),
    (7, 'True Fiction', '2018-03-07', '2018-04-01', 5),
    (8, 'Hell''s Princess', '2018-03-07', '2018-04-01', 6),
    (9, 'The lord of the rings', '2018-03-07', '1954-07-24', 6);

INSERT INTO
    movie (director, resource_id)
VALUES
    ('Denis Villeneuve', 1),
    ('Christopher Nolan', 2),
    ('Orson Welles', 3),
    ('Francis Ford Coppola', 4),
    ('Barry Jenkins', 5),
    ('Kenneth Lonergan', 6);

INSERT INTO
    book (edition, writer, resource_id)
VALUES
    (3, 'Lee Goldberg', 7),
    (5, 'Harold Schechter', 8),
    (1, 'J. R. R. Tolkien', 9);

INSERT INTO
    comment (creationDate, author_id, resource_id, comment)
VALUES
    ('2018-03-11', 1, 1, '🚀'),
    ('2018-03-11', 2, 1, '👏'),
    ('2018-03-13', 3, 1, '👎'),
    ('2018-03-15', 2, 1, '🔥'),
    ('2018-03-11', 1, 4, '🤔');


--
-- USERS <---> RESOURCES
--

INSERT INTO
    wishlist (author_id, resource_id)
VALUES
    (1, 1),
    (1, 6),
    (1, 8),
    (2, 7),
    (2, 8),
    (4, 9),
    (5, 2),
    (5, 5),
    (6, 7);

INSERT INTO
    marked (author_id, resource_id)
VALUES
    (1, 2),
    (1, 4),
    (1, 9),
    (2, 1),
    (2, 2),
    (3, 7),
    (3, 8),
    (5, 4),
    (6, 6);
