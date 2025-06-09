// Criar a coleção
db.createCollection("partidas");

// Inserir um documento
db.partidas.insertOne({
  "id_partida": "abc123",
  "host": {
    "id_jogador": "jog001",
    "username": "caio123"
  },
  "ganhador": {
    "id_jogador": "jog005",
    "username": "natalya777"
  },
  "data_hora_inicio": "2025-05-01T14:30:00Z",
  "data_hora_fim": "2025-05-01T14:45:00Z",
  "temas": [
    { "nome": "Frutas" },
    { "nome": "Animais" }
  ],
  "letras_sorteadas": ["A", "B", "C"],
  "jogadores": [
    {
      "id_jogador": "jog001",
      "username": "caio123",
      "pontuacao_total": 85,
      "respostas": [
        {
          "numero_rodada": 1,
          "letra": "A",
          "respostas_por_tema": [
            { "tema": "Frutas", "resposta": "Abacaxi", "valida": true },
            { "tema": "Animais", "resposta": "Anta", "valida": true }
          ]
        },
        {
          "numero_rodada": 2,
          "letra": "B",
          "respostas_por_tema": [
            { "tema": "Frutas", "resposta": "Banana", "valida": true },
            { "tema": "Animais", "resposta": "Bicho-preguiça", "valida": false }
          ]
        }
      ]
    },
    {
      "id_jogador": "jog002",
      "username": "natalya777",
      "pontuacao_total": 100,
      "respostas": [
        {
          "numero_rodada": 1,
          "letra": "A",
          "respostas_por_tema": [
            { "tema": "Frutas", "resposta": "Amora", "valida": true },
            { "tema": "Animais", "resposta": "Arraia", "valida": true }
          ]
        },
        {
          "numero_rodada": 2,
          "letra": "B",
          "respostas_por_tema": [
            { "tema": "Frutas", "resposta": "Bergamota", "valida": true },
            { "tema": "Animais", "resposta": "Bicho-preguiça", "valida": true }
          ]
        }
      ]
    },
    {
      "id_jogador": "jog003",
      "username": "miqlima",
      "pontuacao_total": 70,
      "respostas": [
        {
          "numero_rodada": 1,
          "letra": "A",
          "respostas_por_tema": [
            { "tema": "Frutas", "resposta": "Acerola", "valida": true },
            { "tema": "Animais", "resposta": "Abelha", "valida": true }
          ]
        },
        {
          "numero_rodada": 2,
          "letra": "B",
          "respostas_por_tema": [
            { "tema": "Frutas", "resposta": "Blueberry", "valida": false },
            { "tema": "Animais", "resposta": "Bicho-geográfico", "valida": false }
          ]
        }
      ]
    }
  ]
});