-- scripts/init_postgres.sql
-- Criar tabela Jogador
CREATE TABLE Jogador (
  id_jogador SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  é_assinante BOOLEAN DEFAULT FALSE,
  créditos INT DEFAULT 0
);

-- Criar tabela Amizade
CREATE TABLE Amizade (
  id_jogador1 INT REFERENCES Jogador(id_jogador),
  id_jogador2 INT REFERENCES Jogador(id_jogador),
  status VARCHAR(20) DEFAULT 'pendente',
  é_favorito BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id_jogador1, id_jogador2)
);

-- Criar tabela Tema
CREATE TABLE Tema (
  id_tema SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descrição TEXT
);

-- Criar tabela Partida
CREATE TABLE Partida (
  id_partida SERIAL PRIMARY KEY,
  id_host INT REFERENCES Jogador(id_jogador),
  id_ganhador INT REFERENCES Jogador(id_jogador),
  estado VARCHAR(20) DEFAULT 'ativa',
  data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela Tema-Partida (relacionamento muitos-para-muitos)
CREATE TABLE Tema_Partida (
  id_partida INT REFERENCES Partida(id_partida),
  id_tema INT REFERENCES Tema(id_tema),
  PRIMARY KEY (id_partida, id_tema)
);

-- Criar tabela Rodada
CREATE TABLE Rodada (
  id_partida INT REFERENCES Partida(id_partida),
  numero_rodada INT,
  stop_jogador INT REFERENCES Jogador(id_jogador),
  letra_sorteada CHAR(1),
  PRIMARY KEY (id_partida, numero_rodada)
);

-- Criar tabela Resposta
CREATE TABLE Resposta (
  id_partida INT REFERENCES Partida(id_partida),
  numero_rodada INT,
  id_tema INT REFERENCES Tema(id_tema),
  id_jogador INT REFERENCES Jogador(id_jogador),
  resposta TEXT,
  válida BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (id_partida, numero_rodada, id_tema, id_jogador)
);

-- Criar tabela Histórico
CREATE TABLE Histórico (
  id_partida INT REFERENCES Partida(id_partida),
  id_jogador INT REFERENCES Jogador(id_jogador),
  pontuação INT,
  data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_partida, id_jogador)
);

-- Criar tabela Item
CREATE TABLE Item (
  id_item SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  raridade VARCHAR(50),
  preço INT,
  exclusivo_assinante BOOLEAN DEFAULT FALSE
);

-- Criar tabela Inventário
CREATE TABLE Inventário (
  id_jogador INT REFERENCES Jogador(id_jogador),
  id_item INT REFERENCES Item(id_item),
  data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_jogador, id_item)
);

-- Inserir dados iniciais (opcional)
INSERT INTO Jogador (username, nome, email, senha) VALUES
('jogador1', 'Jogador Um', 'jogador1@example.com', 'senha123'),
('jogador2', 'Jogador Dois', 'jogador2@example.com', 'senha123');

INSERT INTO Tema (nome, descrição) VALUES
('Times de Futebol', 'Nomes de times de futebol'),
('Bandas', 'Nomes de bandas musicais');

-- Exibir todas as tabelas (para verificação)
\dt;