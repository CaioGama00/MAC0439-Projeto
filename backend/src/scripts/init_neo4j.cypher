// scripts/init_neo4j.cypher
// Criar constraints para garantir unicidade
CREATE CONSTRAINT ON (j:Jogador) ASSERT j.id_jogador IS UNIQUE;

// Criar nós de exemplo (opcional)
CREATE (j1:Jogador { id_jogador: 1, username: 'jogador1', nome: 'Jogador Um' });
CREATE (j2:Jogador { id_jogador: 2, username: 'jogador2', nome: 'Jogador Dois' });

// Criar relacionamentos de amizade (opcional)
MATCH (j1:Jogador { id_jogador: 1 }), (j2:Jogador { id_jogador: 2 })
CREATE (j1)-[:AMIGO_DE]->(j2);

// Exibir todos os nós e relacionamentos (para verificação)
MATCH (n) RETURN n;