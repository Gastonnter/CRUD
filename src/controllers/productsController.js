const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productId= req.params.id;
		const productTofind = products.find((product)=>{
			product.id ==productId
		})
		if(!productTofind){
			return res.send('no exista el producto')
		}
		const viewData = {
			product:productTofind
		}
			return res.render('detail', viewData)
		},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		const productId= req.params.id;
		const productTofind = products.find((product)=>{
			product.id ==productId
		})
		if(!productTofind){
			return res.send('no exista el producto')
		}
		return res .render ('product-edit-form',{
			product: productTofind
		})
	},
	// Update - Method to update
	update: (req, res) => {
		//obtener el indice del producto a actualiczar
		//productos[i]=req.body;

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;