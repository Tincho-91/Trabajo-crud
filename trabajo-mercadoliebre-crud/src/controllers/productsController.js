const fs = require('fs');
const path = require('path');
const { title } = require('process');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const getjson = () => {
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products
}


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let products = getjson();
		res.render("products",{products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		const products = getjson();
		const product = products.find (product => product.id == id);
		res.render("detail",{title:product.name, product, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		let productCreateForm = getjson();
		res.render("product-create-form", {productCreateForm})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const producto = req.body;
		producto.id = Date.now();
		const products = getjson();
		products.push(producto)
		

		const json= JSON.stringify(products);
		fs.writeFileSync(productsFilePath,json, "utf-8");
		res.redirect(`/`);
	},


	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const products = getjson();
		const product = products.find (product => product.id == id);
		res.render("product-edit-form",{title:product.name, product, toThousand})
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		const {name,price,discount,category,description,image} = req.body;
		const products = getjson();
		const nuevoArray = products.map(product =>{
			if(product.id == id ){
				return{
					id: +id,
					name:name.trim(),
					price:+price,
					discount: +discount,
					category,
					description:description.trim(),
					image: image ? image : product.image
				}
			}
			return product
		});
		const json= JSON.stringify(nuevoArray);
		fs.writeFileSync(productsFilePath,json, "utf-8");
		res.redirect(`/products/detail/${id}`);
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {	
		const {id} = req.params;
		const productos = getjson();
		const nuevaLista = productos.filter(elemento => elemento.id != id)
		const json= JSON.stringify(nuevaLista);
		fs.writeFileSync(productsFilePath,json, "utf-8");
	    res.redirect("/products")	
	}
};

module.exports = controller;