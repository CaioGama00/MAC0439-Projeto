// scripts/init_neo4j.cypher
// Criar constraints para garantir unicidade
// Criar índices
CREATE INDEX ON :Jogador(id);
CREATE INDEX ON :Jogador(nome);

// Criar constraints
CREATE CONSTRAINT ON (jogador:Jogador) ASSERT jogador.id IS UNIQUE;
CREATE CONSTRAINT ON (jogador:Jogador) ASSERT jogador.nome IS NOT NULL;