
exports.up = function(knex) 
{
    return knex.schema.createTable('categories', function (table) 
    {
        table.increments().primary();
        table.string('name');
    }).then(function(){
        return knex.schema.createTable('product', function (table) 
        {
            table.increments().primary();
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.float('value').notNullable();
        });
    }).then(function()
    {
        return knex.schema.createTable('product_categories', function (table) 
        {
        table.increments().primary();
        table.integer('prod_id').references('id').inTable('product');
        table.integer('cat_id').references('id').inTable('categories');
        });
    });
    

};

exports.down = function(knex) 
{
    return knex.schema.dropTable('categories') && knex.schema.dropTable('product') && knex.schema.dropTable('product_categories');
};
