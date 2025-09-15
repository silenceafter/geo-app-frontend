CREATE DATABASE geo;

--categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,  -- 'museum', 'concert', 'festival', 'park', 'monument'
    display_name TEXT NOT NULL         -- 'Музей', 'Концерт', 'Фестиваль', 'Парк', 'Памятник'
);

--places
CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category_id INT REFERENCES categories(id),
    location GEOMETRY(Point, 4326) NOT NULL,  -- долгота, широта
    address VARCHAR(255),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_places_location ON places USING GIST (location);

--events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category_id INT REFERENCES categories(id),
    location GEOMETRY(Point, 4326),  -- если проходит в определённом месте
    venue_name VARCHAR(200),         -- например, "Ледовый дворец"
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    is_recurring BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    ticket_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индекс по времени и локации
CREATE INDEX idx_events_time ON events (start_time, end_time);
CREATE INDEX idx_events_location ON events USING GIST (location);