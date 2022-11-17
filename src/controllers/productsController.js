const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		//obtener listado de productos
		//devolver vista con todos los productos
		return res.render('products', {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productId= req.params.productId;
		const productTofind = products.find((product)=>{
			return product.id == productId
		})
	if (productTofind == undefined){
		return res.send('no existe el producto')
	}
	return res.render('detail',{
		product: productTofind	})
		},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		//Responde (/products/create)
		const createProduct= req.body
		createProduct.id=                                                      
		
		products.push(createProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,2));
	},

	// Update - Form to edit
	edit: (req, res) => {
		//OBTENER EL PRODUCTO
		const productId= req.params.productId;
		const productTofind = products.find((product)=> {return product.id == productId })
		//BUSCAR PRODUCTO
		if ( productTofind == undefined){
			return res.send('no existe el producto')
		}
		return res.render ('product-edit-form',{
			productTofind: productTofind
		})
	},
		// Update - Method to update
	update: (req, res) => {
		const dataToUpdate = req.body;
    dataToUpdate.price = Number(dataToUpdate.price);
    dataToUpdate.discount = Number(dataToUpdate.discount);

    // Obtener el indice del producto en el array productos
    // products[0] = nuevo producto 
    const productIndex = products.findIndex(
      (product) => {
        return product.id == req.params.id
      }
    )
    if (productIndex == -1) {
      return res.send('No existe el producto')
    }
    // Actualizo array en base al indice
    // Combinar producto existente con nuevos datos a actualizar
    products[productIndex] = {
      ...products[productIndex],
      ...dataToUpdate
    }
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    return res.send(products[productIndex])

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;