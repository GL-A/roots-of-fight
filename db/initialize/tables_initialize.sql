
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  info VARCHAR,
  price VARCHAR,
  sku VARCHAR,
  collections VARCHAR,
  type VARCHAR
);

CREATE TABLE if NOT EXISTS images (
  product_id INTEGER REFERENCES products(id),
  img_url VARCHAR
);
CREATE TABLE if NOT EXISTS description (
  product_id INTEGER REFERENCES products(id),
  description VARCHAR
)
