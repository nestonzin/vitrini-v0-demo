create table stores (
    id serial primary key,
    name text not null,
    description text,
    logo text,
    banner text,
    user_id uuid references auth.users(id),
    slug text unique not null,
    phone text,
    address text,
    active boolean default true,
    created_at timestamp default current_timestamp
);

create table products (
    id serial primary key,
    store_id integer references stores(id) not null,
    name text not null,
    description text,
    price decimal(10,2) not null,
    image text not null,
    category text not null,
    active boolean default true,
    created_at timestamp default current_timestamp
);

create index idx_products_store_id on products(store_id);
create index idx_stores_user_id on stores(user_id);
create index idx_stores_slug on stores(slug);

insert into stores (name, description, logo, banner, slug, phone, address, active) values
('Smoke Paradise', 'Tabacaria especializada em produtos premium', '/logos/smoke-paradise.jpg', '/banners/smoke-banner.jpg', 'smoke-paradise', '11999887766', 'Rua das Nuvens, 420', true),
('Vintage Treasures', 'Brechó online com peças exclusivas', '/logos/vintage-treasures.jpg', '/banners/vintage-banner.jpg', 'vintage-treasures', '11998765432', 'Rua da Moda, 50', true);

insert into products (store_id, name, description, price, image, category, active) values
(1, 'Narguile Zeus', 'Narguile premium com base em cristal', 299.99, '/products/narguile-zeus.jpg', 'narguiles', true),
(1, 'Essência Premium', 'Essência sabor menta gelada 50g', 29.99, '/products/essencia-premium.jpg', 'essencias', true),
(1, 'Kit Carvão', 'Carvão natural para narguile - 1kg', 49.99, '/products/carvao.jpg', 'acessorios', true),
(1, 'Piteira Premium', 'Piteira reutilizável em alumínio', 39.99, '/products/piteira.jpg', 'acessorios', true),
(1, 'Bowl Cerâmica', 'Bowl artesanal para narguile', 89.99, '/products/bowl.jpg', 'acessorios', true);

insert into products (store_id, name, description, price, image, category, active) values
(2, 'Jaqueta Jeans 90s', 'Jaqueta jeans vintage anos 90', 159.99, '/products/jaqueta-vintage.jpg', 'roupas', true),
(2, 'Vestido Retrô', 'Vestido estilo pin-up anos 50', 129.99, '/products/vestido-retro.jpg', 'roupas', true),
(2, 'Bolsa Vintage', 'Bolsa de couro legítimo anos 70', 199.99, '/products/bolsa-vintage.jpg', 'acessorios', true),
(2, 'Tênis Converse 80s', 'All Star original década de 80', 249.99, '/products/tenis-vintage.jpg', 'calcados', true),
(2, 'Óculos Gatinho', 'Óculos estilo cat eye original', 89.99, '/products/oculos-vintage.jpg', 'acessorios', true);
