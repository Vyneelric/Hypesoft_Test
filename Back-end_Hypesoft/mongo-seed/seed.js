db = db.getSiblingDB("HypersoftDB");

db.categories.drop();
db.products.drop();

db.categories.insertMany([
  { _id: "a82a1e75-1608-4a6e-aab5-552722bd97d3", nome: "Eletrônicos",   descricao: "Produtos eletrônicos e tecnologia" },
  { _id: "042e798a-41f3-4017-9f01-c6d44d0d059c", nome: "Celulares",     descricao: "Smartphones, acessórios e dispositivos móveis" },
  { _id: "f3bfb522-0165-4a0f-adf0-b47d3f7203e1", nome: "Informática",   descricao: "Computadores, notebooks e acessórios" },
  { _id: "55275308-10d7-4f0b-9fa7-72dfc2cb56e9", nome: "Armazenamento", descricao: "HDs, SSDs, pen drives e cartões de memória" },
  { _id: "ac99a522-216d-4365-8b01-ade8acb536f9", nome: "Escritório",    descricao: "Equipamentos e acessórios para escritório" },
]);

db.products.insertMany([
  { _id: "b1a2c3d4-e5f6-7890-abcd-ef1234567890", nome: "Notebook Dell G15",                descricao: "Notebook Dell G15, 16GB RAM, 512GB SSD, RTX 3050",         preco: NumberDecimal("5799.90"), quantidade_estoque: 8,  categoria_id: "f3bfb522-0165-4a0f-adf0-b47d3f7203e1" },
  { _id: "c2b3d4e5-f6a7-8901-bcde-f12345678901", nome: "Notebook Lenovo LOQ",              descricao: "Notebook Lenovo LOQ, 16GB RAM, 1TB SSD, RTX 4050",          preco: NumberDecimal("6499.00"), quantidade_estoque: 15, categoria_id: "f3bfb522-0165-4a0f-adf0-b47d3f7203e1" },
  { _id: "d3c4e5f6-a7b8-9012-cdef-123456789012", nome: "Smartphone Samsung Galaxy S23",    descricao: "Samsung Galaxy S23, 256GB, 8GB RAM",                       preco: NumberDecimal("3999.99"), quantidade_estoque: 5,  categoria_id: "042e798a-41f3-4017-9f01-c6d44d0d059c" },
  { _id: "e4d5f6a7-b8c9-0123-def0-234567890123", nome: "iPhone 14",                        descricao: "Apple iPhone 14, 128GB, 6GB RAM",                          preco: NumberDecimal("5299.00"), quantidade_estoque: 12, categoria_id: "042e798a-41f3-4017-9f01-c6d44d0d059c" },
  { _id: "f5e6a7b8-c9d0-1234-ef01-345678901234", nome: "Monitor LG UltraGear 24",          descricao: "Monitor Gamer LG 24 polegadas, 144Hz, Full HD",             preco: NumberDecimal("1299.90"), quantidade_estoque: 20, categoria_id: "a82a1e75-1608-4a6e-aab5-552722bd97d3" },
  { _id: "a6f7b8c9-d0e1-2345-f012-456789012345", nome: "Teclado Mecânico Redragon Kumara", descricao: "Teclado Mecânico Redragon Kumara RGB, switch azul",         preco: NumberDecimal("249.90"),  quantidade_estoque: 7,  categoria_id: "ac99a522-216d-4365-8b01-ade8acb536f9" },
  { _id: "b7a8c9d0-e1f2-3456-0123-567890123456", nome: "Mouse Gamer Logitech G203",        descricao: "Mouse Gamer Logitech G203, 8000 DPI, RGB",                  preco: NumberDecimal("149.90"),  quantidade_estoque: 30, categoria_id: "ac99a522-216d-4365-8b01-ade8acb536f9" },
  { _id: "c8b9d0e1-f2a3-4567-1234-678901234567", nome: "Headset HyperX Cloud Stinger",     descricao: "Headset HyperX Cloud Stinger, som estéreo",                preco: NumberDecimal("299.90"),  quantidade_estoque: 9,  categoria_id: "a82a1e75-1608-4a6e-aab5-552722bd97d3" },
  { _id: "d9c0e1f2-a3b4-5678-2345-789012345678", nome: "SSD Kingston NV2 1TB",             descricao: "SSD Kingston NV2, 1TB, NVMe M.2",                          preco: NumberDecimal("399.00"),  quantidade_estoque: 25, categoria_id: "55275308-10d7-4f0b-9fa7-72dfc2cb56e9" },
  { _id: "e0d1f2a3-b4c5-6789-3456-890123456789", nome: "Placa de Vídeo RTX 4060",          descricao: "Placa de Vídeo NVIDIA RTX 4060, 8GB GDDR6",                preco: NumberDecimal("2599.90"), quantidade_estoque: 4,  categoria_id: "f3bfb522-0165-4a0f-adf0-b47d3f7203e1" },
  { _id: "f1e2a3b4-c5d6-7890-4567-901234567890", nome: "Tablet Samsung Galaxy Tab S9",     descricao: "Tablet Samsung Galaxy Tab S9, 128GB, 8GB RAM",             preco: NumberDecimal("3499.90"), quantidade_estoque: 6,  categoria_id: "042e798a-41f3-4017-9f01-c6d44d0d059c" },
  { _id: "a2f3b4c5-d6e7-8901-5678-012345678901", nome: "Notebook ASUS Vivobook",           descricao: "Notebook ASUS Vivobook, 8GB RAM, 256GB SSD",               preco: NumberDecimal("3299.00"), quantidade_estoque: 13, categoria_id: "f3bfb522-0165-4a0f-adf0-b47d3f7203e1" },
  { _id: "b3a4c5d6-e7f8-9012-6789-123456789012", nome: "HD Externo Seagate 2TB",           descricao: "HD externo portátil Seagate, 2TB, USB 3.0",                preco: NumberDecimal("499.90"),  quantidade_estoque: 18, categoria_id: "55275308-10d7-4f0b-9fa7-72dfc2cb56e9" },
  { _id: "c4b5d6e7-f8a9-0123-7890-234567890123", nome: "Pendrive Sandisk 64GB",            descricao: "Pendrive Sandisk 64GB, USB 3.1",                           preco: NumberDecimal("59.90"),   quantidade_estoque: 50, categoria_id: "55275308-10d7-4f0b-9fa7-72dfc2cb56e9" },
  { _id: "d5c6e7f8-a9b0-1234-8901-345678901234", nome: "Impressora HP DeskJet 2774",       descricao: "Impressora multifuncional HP com Wi-Fi",                   preco: NumberDecimal("399.90"),  quantidade_estoque: 7,  categoria_id: "ac99a522-216d-4365-8b01-ade8acb536f9" },
  { _id: "e6d7f8a9-b0c1-2345-9012-456789012345", nome: "Cadeira de Escritório Ergonômica", descricao: "Cadeira ergonômica com ajuste de altura e apoio lombar",   preco: NumberDecimal("899.90"),  quantidade_estoque: 11, categoria_id: "ac99a522-216d-4365-8b01-ade8acb536f9" },
  { _id: "f7e8a9b0-c1d2-3456-0123-567890123456", nome: "Caixa de Som JBL Flip 6",          descricao: "Caixa de som portátil JBL, Bluetooth, resistente à água", preco: NumberDecimal("699.90"),  quantidade_estoque: 9,  categoria_id: "a82a1e75-1608-4a6e-aab5-552722bd97d3" },
  { _id: "a8f9b0c1-d2e3-4567-1234-678901234567", nome: "Smartwatch Xiaomi Mi Band 8",      descricao: "Smartband Xiaomi com monitoramento de atividades",         preco: NumberDecimal("249.90"),  quantidade_estoque: 22, categoria_id: "042e798a-41f3-4017-9f01-c6d44d0d059c" },
]);
