-- 1. Jogadores da Partida 1
-- Lista os nomes e usernames dos jogadores que participaram da Partida 1.
SELECT j.nome, j.username
FROM Jogador j
JOIN JogadoresNaPartida jp ON j.id_jogador = jp.id_jogador
WHERE jp.id_partida = 1;

-- 2. Respostas da Partida 1, Rodada 1
-- Mostra as respostas da Partida 1, Rodada 1, incluindo nome do tema e username do jogador.
SELECT j.username, t.nome AS tema, r.resposta, r.valida, r.pontuacao
FROM Resposta r
JOIN Jogador j ON r.id_jogador = j.id_jogador
JOIN Tema t ON r.id_tema = t.id_tema
WHERE r.id_partida = 1 AND r.numero_rodada = 1;

-- 3. Ranking da Partida 1
-- Mostra o ranking final da Partida 1 com base na pontuação final.
SELECT j.username, jp.pontuacao_final
FROM Jogador j
JOIN JogadoresNaPartida jp ON j.id_jogador = jp.id_jogador
WHERE jp.id_partida = 1
ORDER BY jp.pontuacao_final DESC;

-- 4. Partidas por Jogador
-- Conta quantas partidas cada jogador participou.
SELECT j.username, COUNT(*) AS partidas_participadas
FROM Jogador j
JOIN JogadoresNaPartida jp ON j.id_jogador = jp.id_jogador
GROUP BY j.username
ORDER BY partidas_participadas DESC;

-- 5. Inventário de um jogador
-- Lista os itens e quantidades que um jogador (ex: 'caiogama') possui.
SELECT j.username, i.nome AS item, inv.quantidade
FROM Inventario inv
JOIN Jogador j ON inv.id_jogador = j.id_jogador
JOIN Item i ON inv.id_item = i.id_item
WHERE j.username = 'caiogama';

-- 6. Pontuação total por jogador
-- Mostra a pontuação total acumulada por jogador, somando todas as respostas válidas.
SELECT j.username, SUM(r.pontuacao) AS pontuacao_total
FROM Jogador j
JOIN Resposta r ON j.id_jogador = r.id_jogador
WHERE r.valida = TRUE
GROUP BY j.username
ORDER BY pontuacao_total DESC;

-- 7. Partidas criadas por Admins
-- Lista todas as partidas criadas por jogadores do tipo 'Admin'.
SELECT p.id_partida, j.username AS criador, p.estado
FROM Partida p
JOIN Jogador j ON p.id_criador = j.id_jogador
WHERE j.tipo = 'Admin';

-- 8. Temas da Partida 1
-- Mostra os temas utilizados na Partida 1.
SELECT t.nome
FROM Tema t
JOIN TemaPartida tp ON t.id_tema = tp.id_tema
WHERE tp.id_partida = 1;

-- 9. Jogadores com itens exclusivos
-- Lista os jogadores que possuem itens exclusivos para assinantes.
SELECT DISTINCT j.username
FROM Inventario inv
JOIN Item i ON inv.id_item = i.id_item
JOIN Jogador j ON inv.id_jogador = j.id_jogador
WHERE i.exclusivo_assinante = TRUE;

-- 10. Contagem de respostas por jogador e tema
-- Conta quantas respostas cada jogador deu em cada tema.
SELECT j.username, t.nome AS tema, COUNT(*) AS total_respostas
FROM Resposta r
JOIN Jogador j ON r.id_jogador = j.id_jogador
JOIN Tema t ON r.id_tema = t.id_tema
GROUP BY j.username, t.nome
ORDER BY j.username, t.nome;

