const knex = require('knex');
const configuration = require('../../knexfile.js');

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development

// Abre a conexão do ambiente de dev
const connection = knex(config);

// Exporta a conexão com o banco
module.exports = connection;