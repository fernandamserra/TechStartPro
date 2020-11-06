const connection = require('../database/connection');

const knex = require('knex');

module.exports = 
{

    async create(req, resp)
    {
        const{name, description, value, category} = req.body;

        const [response] = await connection('product').insert({
            name,
            description,
            value
        }).returning('*');
        console.log(category);
        const categories_to_create = category.map((cat_id)=>(
            {
                prod_id:response.id,
                cat_id
            }
        ));
        console.log(categories_to_create);
        const response2 = await connection('product_categories').insert(categories_to_create);
        console.log(response);
        return resp.json(response);
    },

    async index(req, resp)
    {
        const{page = 1, name, description, value, categories} = req.query;

        const [count] = await connection('product').count();
        let command = "";

        if(name)
        {   
            command =  `WHERE product.name like '%${name}%' `;
        }

        if(description)
        {
            if(command != "") 
            {
                command = command + `OR product.description like '%${description}%' `;
            }else
            {
                command =  `WHERE product.description like '%${description}%' `;
            }
        }

        if(value)
        {
            if(command != "") 
            {
                command = command + `OR product.value = '%${value}%' `;
            }else
            {
                command =  `WHERE product.value = '%${value}%' `;
            }
        }

        if(categories)
        {
            let list = "";

            categories.forEach((element, i) => {
                if(i == 0 )  list = list + `'${element}'`;
                else list = list + `,'${element}'`;
            }); 

            if(command != "") 
            {
                command = command + `OR categories.name in (${list}) `;
                //command = command + `OR categories.name in (${categories.map((element)=>(`\'${element}\'`))}) `;
            }else
            {
                command = command + `WHERE categories.name in (${list}) `;
                //command = command + `WHERE categories.name in (${categories.map((element)=>(`\'${element}\'`))}) `;
            }
            console.log(categories, list);
        
        }
        const products = await connection.raw(`select STRING_AGG(categories.name, ',' ORDER BY categories.id) as prod_cat,
                                                product.id, product.name,
                                                product.value, product.description
                                                from product 
                                                LEFT JOIN product_categories ON product.id = product_categories.prod_id
                                                LEFT JOIN categories ON categories.id = product_categories.cat_id
                                                `+ command + 'GROUP BY product.id;');

            
        resp.header('X-Total-Count', count['count(*)']);

        /*
        const products = await connection('product')
            .leftJoin('product_categories', 'product.id', '=', 'product_categories.prod_id')
            .leftJoin('categories', 'categories.id', '=', 'product_categories.cat_id')
            .groupBy('product.id')
            //.limit(20)
            //.offset((page-1)*20)
            .select(["product.id",
                    "product.name as prod_name", 
                    "product.description",
                    "product.value",
                    "categories.name as cat_name",
                    connection.raw('STRING_AGG(categories.name, ',' ORDER BY categories.id)')]);        

            resp.header('X-Total-Count', count['count(*)']);
*/
        return resp.json({products:products.rows});
    },

    async delete(req, resp)
    {
        const {id} = req.params;
        await connection('product').where('id',id).delete();
        
        // Cód. 204: No Content - resposta de sucesso sem corpo
        return resp.status(204).send();
    }


}