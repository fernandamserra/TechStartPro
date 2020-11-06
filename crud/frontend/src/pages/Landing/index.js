import React from 'react';
import {Box, Button, Text, TextInput, Layer, CheckBoxGroup, Sidebar} from 'grommet';
import {FormEdit, FormSearch, Trash} from 'grommet-icons';
import api from '../../services/api.js'
import { useState, useEffect } from 'react';


function Landing(props) 
{
  const [show, setShow] = React.useState();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [cat_names, setCatNames] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [product, setProduct] = useState([]);
  const [s_name, setSearchName] = useState('');
  const [s_description, setSearchDescription] = useState('');
  const [s_value, setSearchValue] = useState(0);
  const [s_categories, setSearchCategories] = useState([]);

  function DeleteProduct(id)
  {
    api.get(`product/${id}`)
    .then(()=>{
      alert('Deletado');
      getProducts();
      return;
    })
    .catch((error)=>{
      alert(error);
      return;
    });
  
  }

  function searchProducts()
  {
    let command = ""
    if(s_name)
    {
      command = "name=" + s_name;
    }

    if(s_value)
    {
      if(command !== "")
      {
        command = command + "&value=" + s_value
      }else
      {
        command = "value=" + s_value
      }
    }

    if(s_description)
    {
      if(command !== "")
      {
        command = command + "&description=" + s_description
      }else
      {
        command = "description=" + s_description
      }
    }

    if(s_categories.length > 0)
    {
      if(command !== "")
      {
        s_categories.forEach((element, i)=>{
          command = command + `&categories[]=${element}`
        });
      }else 
      {

        s_categories.forEach((element, i)=>{
          if(i === 0) 
          {
            command = command + `categories[]=${element}`
          }else 
          {
            command = command + `&categories[]=${element}`
          }
        });
      }
    }

    api.get(`/product?${command}`)
    .then((response)=>{
      setProduct(response.data.products)
    })
    .catch((error)=>{
      alert(error);
    });
  }

  function getProducts()
  {
    api.get('product')
    .then((response)=>{
      setProduct(response.data.products)
    })
    .catch((error)=>{
      alert(error);
    })

  }

  function getCategories()
  {
    api.get('categories')
    .then((response)=>{
      setCatNames(response.data)
    })
    .catch((error)=>{
      alert(error);
    })
  }

  function createProduct()
  {
    if(name === '')
    {
      alert('Nome inválido.');
      return;
    }

    if(description === '')
    {
      alert('Nome inválido.');
      return;
    }

    if(value === 0)
    {
      alert('Nome inválido.');
      return;
    }

    if(categories.length === 0)
    {
      alert('Categorias inválido.');
      return;
    }

    api.post('product', {name, description, value, category:categories})
      .then(()=>{
        alert('Produto criado');
        setShow(false);
        getProducts();
        return;
      })
      .catch((error)=>{
        alert(error);
      });

  }


  useEffect(()=>{
    getProducts();
    getCategories();
  }, [])


  return (
  <>
    <Box> 
      <Box direction='row-responsive' justify='center' width='xxlarge'>
        <Sidebar margin='2%' pad='large' width='20%'>
          <TextInput icon={<FormSearch />} placeholder='Nome' onChange={(e)=>{
              setSearchName(e.target.value);
            }}>
          </TextInput>
          <TextInput icon={<FormSearch />} placeholder='Descrição' onChange={(e)=>{
              setSearchDescription(e.target.value);
            }}>
          </TextInput>
          <TextInput icon={<FormSearch />} placeholder='Valor' onChange={(e)=>{
              setSearchValue(e.target.value);
            }}>
          </TextInput>
          <CheckBoxGroup pad='small' onChange={(value, option)=>{
                    setSearchCategories(value.value);
                }} options={cat_names.map((element)=>{
                  return element.name;
                })} />
          <Button label="Buscar" onClick={() => searchProducts()} />
        </Sidebar>
        <Box>
     
      
          <Box alignSelf='center' basis='xsmall'
               fill='horizontal' justify='center'
          >
            <Button size='small' alignSelf='center' margin='medium' pad='5px' label="Criar Produto" onClick={() => setShow(true)} />
            {show && (
              <Layer onEsc={() => setShow(false)}
                    onClickOutside={() => setShow(false)} >
         
                <Box gap='medium' margin='small' pad='20px'style={{
                  maxHeight:'700px'
                }}>
          

                  <TextInput placeholder='Name' margin='medium' onChange={(e)=>{
                    setName(e.target.value)
                  }}/>

                  <TextInput placeholder='Description' margin='medium' onChange={(e)=>{
                    setDescription(e.target.value)
                  }}/>

                  <TextInput placeholder='Value' margin='medium' onChange={(e)=>{
                    setValue(e.target.value)
                  }}/>

                  <Box>
                      <CheckBoxGroup onChange={(value, option)=>{
                          setCategories(value.value)
                      }} options={cat_names.map((element)=>{
                        return {label:element.name, value:element.id};
                      })} />
                  </Box>
                  <Box pad='10px' gap='small'>
                    <Button label="save" onClick={() => createProduct()} />
                    <Button label='Cancelar' fill color='red' onClick={() => setShow(false)} />
                  </Box>
                </Box>
              </Layer>
            )}
          </Box>

          <Box fill='horizontal' alignSelf='end' margin='5px' >
          {
            product.length>0?
            product.map((element, i)=>(
              <ProductContainer onDelete={DeleteProduct} product={element} key={i} />
            ))
            :
            <></>
          }
          </Box>

        </Box>
      </Box>
    </Box>
  </>
  );
}

function ProductContainer(props)
{
  const [show, setShow] = React.useState();
  const [a_name, setAlteredName] = React.useState('');
  const [a_value, setAlteredValue] = React.useState(0);
  const [a_description, setAlteredDescription] = React.useState('');
  const [a_categories, setAlteredCategories] = React.useState([]);
  
  function updateProduct()
  {

  }

  return(
    <>
      <Box alignSelf='center' border
            round='small' width='large'
            margin='xsmall' align='center'
            direction='row' justify='between'
            >
        <Box alignSelf='center' width='large'
              margin='xsmall' align='center'
        >      
          <Text margin='small' size='large'
                color='brand'>
            {props.product.name}
          </Text>
          <Text>
            {props.product.description}
          </Text>
          <Text >
            {props.product.value}
          </Text>
          <Text>
            {props.product.prod_cat}
            
          </Text>
        </Box>
        <Box pad='20px' onClick={()=>{
            props.onDelete(props.product.id)
        }}>
          <Trash color='red' />
        </Box>

        <Box pad='20px' onClick={()=>{
          setShow(true);
          }}>
          {show && (
            <Layer onEsc={() => setShow(false)}
                  onClickOutside={() => setShow(false)} >
       
              <Box gap='medium' margin='small' pad='20px'style={{
                maxHeight:'700px'
              }}>
  
                <TextInput value={props.product.name}  margin='medium' onChange={(e)=>{
                  setAlteredName(e.target.value)
                }}/>

                <TextInput value={ props.product.description} margin='medium' onChange={(e)=>{
                  setAlteredDescription(e.target.value)
                }}/>

                <TextInput value={props.product.value} margin='medium' onChange={(e)=>{
                  setAlteredValue(e.target.value)
                }}/>

                <Box>
                  {
                    console.log([props.product.prod_cat])
                  }
                    <CheckBoxGroup onChange={(value, option)=>{
                        setAlteredCategories(value.value)
                    }} options={[props.product.prod_cat].map((element)=>{
                      console.log(element)
                      const splits = element.split(',')
                      console.log(splits)
                      return {label:element, value:element.id};
                    })} />
                </Box>
                <Box pad='10px' gap='small'>
                  <Button label="save" onClick={() => updateProduct()} />
                  <Button label='Cancelar' fill color='red' onClick={() => setShow(false)}/>
                </Box>
              </Box>
            </Layer>
          )}

          <FormEdit />
        </Box>
    </Box>
  </>
  );
}


export default Landing;
