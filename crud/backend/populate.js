const { map } = require('./src/app');
const connection = require('./src/database/connection');


const main = async()=>{
    const categories = ['Móveis', 'Decoração', 'Celular', 'Informática', 'Brinquedos'];
    await connection('categories').insert(categories.map((element)=>({
        name:element
    })));
    console.log('morte')
}

main();