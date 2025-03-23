// src/utils/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro no console
  
    // Verifica se o erro tem uma mensagem personalizada
    const message = err.message || 'Ocorreu um erro interno no servidor.';
  
    // Define o status code padrão como 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
  
    // Retorna a resposta de erro
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  };
  
  module.exports = errorHandler;