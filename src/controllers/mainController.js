const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve('./src/data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		//filtrando por catergoria
		const visitedProducts = products.filter((product)=> product.category == 'visited')
		const inSaleProducts = products.filter((product)=> product.category == 'in-sale')
		//delvolver datos a la vista
		const viewData = {
			visitedProducts,
			inSaleProducts
		}
		//devolver a vista con datos 
		
		return	res.render('index', viewData)
	},
	search: (req, res) => {
		const palabraBuscada= req.body
		res.render ('products')
	},
};

module.exports = controller;
