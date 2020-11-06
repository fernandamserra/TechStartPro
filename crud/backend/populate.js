const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const { map } = require('./src/app');
const connection = require('./src/database/connection');

const fetchCategoriesFromCSV = async filename =>{
    const stream = await fs.readFileSync(filename).toString();

    const categoriesList = parse(stream, {
      columns: true,
      skip_empty_lines: true
    });
  
    return categoriesList.map(cat => ({
      name: cat.nome
    }));
}

const main = async()=>{
    const categories = await fetchCategoriesFromCSV('./src/test.csv');
    await connection('categories').insert(categories);
    return;    
}

main();