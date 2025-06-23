-- Criar o banco de dados
CREATE DATABASE adedonha;

-- Conectar ao banco de dados
\c adedonha

-- Criar as tabelas

-- Tabela Jogador
CREATE TABLE Jogador (
  id_jogador SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('Gratuito', 'Premium', 'Admin'))
);

-- Tabela Item
CREATE TABLE Item (
  id_item SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  exclusivo_assinante BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabela Inventario
CREATE TABLE Inventario (
  id_inventario SERIAL PRIMARY KEY,
  id_jogador INTEGER NOT NULL,
  id_item INTEGER NOT NULL,
  quantidade INTEGER NOT NULL,
  data_aquisicao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_jogador) REFERENCES Jogador (id_jogador),
  FOREIGN KEY (id_item) REFERENCES Item (id_item)
);

-- Tabela Tema
CREATE TABLE Tema (
  id_tema SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(255) NOT NULL
);

-- Tabela Partida
CREATE TABLE Partida (
  id_partida SERIAL PRIMARY KEY,
  id_criador INTEGER NOT NULL,
  id_ganhador INTEGER,
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('iniciada', 'finalizada')),
  data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_criador) REFERENCES Jogador (id_jogador),
  FOREIGN KEY (id_ganhador) REFERENCES Jogador (id_jogador)
);

-- Tabela TemaPartida
CREATE TABLE TemaPartida (
  id_partida INTEGER NOT NULL,
  id_tema INTEGER NOT NULL,
  PRIMARY KEY (id_partida, id_tema),
  FOREIGN KEY (id_partida) REFERENCES Partida (id_partida),
  FOREIGN KEY (id_tema) REFERENCES Tema (id_tema)
);

-- Tabela JogadoresNaPartida
CREATE TABLE JogadoresNaPartida (
  id_partida INTEGER NOT NULL,
  id_jogador INTEGER NOT NULL,
  pontuacao_final INTEGER NOT NULL,
  PRIMARY KEY (id_partida, id_jogador),
  FOREIGN KEY (id_partida) REFERENCES Partida (id_partida),
  FOREIGN KEY (id_jogador) REFERENCES Jogador (id_jogador)
);

-- Tabela Rodada com chave primária composta (id_partida, numero_rodada)
CREATE TABLE Rodada (
  id_partida INTEGER NOT NULL,
  stop_jogador INTEGER,
  numero_rodada INTEGER NOT NULL,
  letra_sorteada CHAR(1) NOT NULL,
  tempo_limite INTEGER NOT NULL,
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('iniciada', 'finalizada')),
  total_respostas INTEGER NOT NULL DEFAULT 0,
  respostas_validas INTEGER NOT NULL DEFAULT 0,
  votos_contestacao INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id_partida, numero_rodada),
  FOREIGN KEY (id_partida) REFERENCES Partida (id_partida),
  FOREIGN KEY (stop_jogador) REFERENCES Jogador (id_jogador) ON DELETE SET NULL
);

-- Tabela Resposta com chave composta
CREATE TABLE Resposta (
  id_partida INTEGER NOT NULL,
  numero_rodada INTEGER NOT NULL,
  id_jogador INTEGER NOT NULL,
  id_tema INTEGER NOT NULL,
  resposta VARCHAR(255) NOT NULL,
  valida BOOLEAN NOT NULL,
  pontuacao INTEGER NOT NULL,
  PRIMARY KEY (id_partida, numero_rodada, id_jogador, id_tema),
  FOREIGN KEY (id_partida, numero_rodada) REFERENCES Rodada (id_partida, numero_rodada),
  FOREIGN KEY (id_jogador) REFERENCES Jogador (id_jogador),
  FOREIGN KEY (id_tema) REFERENCES Tema (id_tema)
);

-- Jogadores
INSERT INTO Jogador (nome, username, email, senha, tipo)
VALUES 
  ('Caio Gama', 'caiogama','caio@usp.br', 'hash123', 'Gratuito'),
  ('Natalya Aragão', 'nataragao', 'natalya@usp.br', 'hash456', 'Premium'),
  ('Miqueias Lima', 'miqvlima','miqueias@usp.br', 'hash789', 'Admin'),
  ('Lucas Ferreira', 'lucasferreira', 'lucas@usp.br', 'hashabc', 'Gratuito'),
  ('Bruna Oliveira', 'brunaoliveira', 'bruna@usp.br', 'hashdef', 'Premium'),
  ('Rafael Costa', 'rafaelcosta', 'rafael@usp.br', 'hashghi', 'Gratuito'),
  ('Juliana Martins', 'jumartins','juliana@usp.br', 'hashjkl', 'Premium'),
  ('André Souza', 'andresouza', 'andre@usp.br', 'hashmno', 'Gratuito');

-- Itens
INSERT INTO Item (nome, descricao, preco, exclusivo_assinante)
VALUES
  ('Chapéu Azul', 'Acessório para o avatar', 100.00, FALSE),
  ('Fundo Espacial', 'Plano de fundo exclusivo', 200.00, TRUE),
  ('Emoji Raro', 'Reação animada especial', 50.00, FALSE),
  ('Óculos de Sol', 'Estilo no visual do personagem', 75.00, FALSE),
  ('Camisa Gamer', 'Roupa exclusiva para premium', 150.00, TRUE),
  ('Fundo Tropical', 'Plano de fundo temático de praia', 120.00, FALSE);

-- Inventário
INSERT INTO Inventario (id_jogador, id_item, quantidade)
VALUES
  (1, 1, 1), (1, 3, 2),
  (2, 2, 1), (2, 4, 1),
  (3, 5, 1),
  (4, 6, 1),
  (5, 1, 1),
  (6, 3, 3),
  (7, 2, 1),
  (8, 4, 2);

-- Temas
INSERT INTO Tema (nome, descricao)
VALUES
  ('Animal', 'Animais do mundo'),
  ('Fruta', 'Frutas diversas'),
  ('País', 'Nomes de países'),
  ('Cidade', 'Cidades do mundo'),
  ('Objeto', 'Coisas em geral'),
  ('Nome Próprio', 'Nomes de pessoas');

-- Partidas
INSERT INTO Partida (id_criador, estado, id_ganhador)
VALUES 
  (1, 'finalizada', 2), 
  (2, 'finalizada', 2), 
  (3, 'iniciada', NULL),    
  (4, 'finalizada', 1), 
  (1, 'iniciada', NULL);

-- Temas nas partidas
INSERT INTO TemaPartida (id_partida, id_tema)
VALUES
  (1, 1), (1, 2), (1, 3),
  (2, 1), (2, 4), (2, 5),
  (3, 2), (3, 3), (3, 6),
  (4, 1), (4, 2), (4, 5);

-- Jogadores nas partidas
INSERT INTO JogadoresNaPartida (id_partida, id_jogador, pontuacao_final)
VALUES
  (1, 1, 30), (1, 2, 30), (1, 3, 30), (1, 4, 20),
  (2, 5, 25), (2, 6, 15), (2, 7, 20),
  (3, 2, 28), (3, 4, 18), (3, 8, 22),
  (4, 1, 30), (4, 5, 25), (4, 6, 20);

-- Rodadas
INSERT INTO Rodada (id_partida, numero_rodada, letra_sorteada, tempo_limite, estado, stop_jogador)
VALUES
  (1, 1, 'C', 60, 'finalizada', 1),
  (1, 2, 'A', 60, 'finalizada', 2),
  (2, 1, 'B', 60, 'finalizada', 2),
  (3, 1, 'M', 60, 'iniciada', NULL),
  (4, 1, 'P', 60, 'finalizada', 4),
  (4, 2, 'L', 60, 'finalizada', 1),
  (5, 1, 'S', 60, 'iniciada', NULL);

-- Respostas para partida 1, rodada 1, tema Animal
INSERT INTO Resposta (id_partida, numero_rodada, id_jogador, id_tema, resposta, valida, pontuacao)
VALUES
  (1, 1, 1, 1, 'Cachorro', TRUE, 10),
  (1, 1, 2, 1, 'Camelo', TRUE, 10), 
  (1, 1, 3, 1, 'Cavalo', TRUE, 5),
  (1, 1, 4, 1, 'Cabra', TRUE, 5);
  
-- Respostas para rodada 1, tema Fruta
INSERT INTO Resposta (id_partida, numero_rodada, id_jogador, id_tema, resposta, valida, pontuacao)
VALUES
  (1, 1, 1, 2, 'Caju', TRUE, 10),
  (1, 1, 2, 2, 'Cereja', TRUE, 10),
  (1, 1, 3, 2, 'Caqui', TRUE, 10),
  (1, 1, 4, 2, 'Cupuaçu', TRUE, 10);

-- Respostas para rodada 1, tema País
INSERT INTO Resposta (id_partida, numero_rodada, id_jogador, id_tema, resposta, valida, pontuacao)
VALUES
  (1, 1, 1, 3, 'Canadá', TRUE, 10),
  (1, 1, 2, 3, 'Chile', TRUE, 10),
  (1, 1, 3, 3, 'Croácia', TRUE, 10),
  (1, 1, 4, 3, 'Colômbia', TRUE, 10);

-- Mais respostas para outras partidas/rodadas
-- Partida 2, Rodada 1, Tema Cidade
INSERT INTO Resposta (id_partida, numero_rodada, id_jogador, id_tema, resposta, valida, pontuacao)
VALUES
  (2, 1, 5, 4, 'Barcelona', TRUE, 10),
  (2, 1, 6, 4, 'Berlim', TRUE, 10),
  (2, 1, 7, 4, 'Bruxelas', TRUE, 10);

-- Partida 3, Rodada 1, Tema Nome Próprio
INSERT INTO Resposta (id_partida, numero_rodada, id_jogador, id_tema, resposta, valida, pontuacao)
VALUES
  (3, 1, 2, 6, 'Maria', TRUE, 10),
  (3, 1, 4, 6, 'Miguel', TRUE, 10),
  (3, 1, 8, 6, 'Melissa', TRUE, 10);
