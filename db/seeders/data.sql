-- INSERT USERS			
insert into users (user_id, user_name) values (1, 'Eray Aslan');
insert into users (user_id, user_name) values (2, 'Enes Faruk Meniz');
insert into users (user_id, user_name) values (3, 'Sefa Eren Şahin');
insert into users (user_id, user_name) values (4, 'Kadir Mutlu');

-- INSERT BOOKS			
insert into books (book_id, book_name) values (1, 'The Hitchhiker''s Guide to the Galaxy');
insert into books (book_id, book_name) values (2, 'I, Robot');
insert into books (book_id, book_name) values (3, 'Dune');
insert into books (book_id, book_name) values (4, '1984');
insert into books (book_id, book_name, is_available) values ('5', 'Brave New World', FALSE);

-- INSERT USERS_BOOKS
insert into borrow_stats (borrow_id, user_id, book_id, is_returned, book_score) values (1, 1, 1, TRUE, 7);
insert into borrow_stats (borrow_id, user_id, book_id, is_returned, book_score) values (2, 1, 2, TRUE, 9);
insert into borrow_stats (borrow_id, user_id, book_id, is_returned, book_score) values (3, 2, 2, TRUE, 4);
insert into borrow_stats (borrow_id, user_id, book_id, is_returned, book_score) values (4, 2, 3, TRUE, 7);
insert into borrow_stats (borrow_id, user_id, book_id, is_returned, book_score) values (5, 3, 4, TRUE, 9);
insert into borrow_stats (borrow_id, user_id, book_id, is_returned, book_score) values (6, 3, 5, FALSE, -1);
insert into borrow_stats (borrow_id, user_id, book_id, is_returned, book_score) values (7, 4, 2, TRUE, 2);
insert into borrow_stats (borrow_id, user_id, book_id, is_returned, book_score) values (8, 4, 3, TRUE, 8);
