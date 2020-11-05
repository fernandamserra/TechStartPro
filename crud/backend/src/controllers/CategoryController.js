const connection = require('../database/connection');

module.exports = 
{

    async create(req, resp)
    {
        const{name} = req.body;

        const response = await connection('categories').insert({
            name
        }).returning('*');
        return resp.json(response);
    },

    async index(req, resp)
    {
        const categories = await connection('categories').select('*');
        return resp.json(categories);
    },

    async delete(req, resp)
    {
        const {id} = request.params;

        const categories = await connection('categories')
            .where('id',id)
            .select('*')
            .first();

        await connection('categories').where('id',id).delete();
        
        // Cód. 204: No Content - resposta de sucesso sem corpo
        return resp.status(204).send();
    }


}