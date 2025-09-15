-- Добавим категории
INSERT INTO categories (name, display_name) VALUES
('museum', 'Музей'),
('concert', 'Концерт'),
('park', 'Парк'),
('festival', 'Фестиваль'),
('monument', 'Памятник');

-- Добавим место
INSERT INTO places (name, category_id, location, address)
VALUES (
  'Эрмитаж',
  (SELECT id FROM categories WHERE name = 'museum'),
  ST_SetSRID(ST_MakePoint(30.3158, 59.9343), 4326),
  'Дворцовая пл., 2, Санкт-Петербург'
);

-- Добавим мероприятие
INSERT INTO events (title, category_id, location, venue_name, start_time, end_time)
VALUES (
  'Рок-фестиваль «Нашествие»',
  (SELECT id FROM categories WHERE name = 'festival'),
  ST_SetSRID(ST_MakePoint(37.5, 55.75), 4326),
  'Тверская область',
  '2025-07-18T12:00:00+03:00',
  '2025-07-20T23:59:00+03:00'
);