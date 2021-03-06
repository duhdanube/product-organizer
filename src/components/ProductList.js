import React from 'react';
import ReactDOM from 'react-dom';
import CurrentList from './CurrentList';
import AddProduct from './AddProduct';
import Totals from './Totals';

const ProductList = React.createClass({
  getInitialState() {
    try {
      var products = JSON.parse(localStorage.products);
    } catch(err) {
      var products = [];
    }
    return {products};
  },
  componentDidUpdate() {
    localStorage.products = JSON.stringify(this.state.products);
  },
  addProduct(product) {
    this.setState({products: this.state.products.concat(product)});
  },
  deleteProduct(productId) {
    let deleteArr = this.state.products.filter(product => {
      return product.id != productId;
    });
    this.setState({products: deleteArr});
  },
  updateProduct(productId, newName, newPrice, newDescription) {
    let updateProducts = this.state.products;
    let updateProduct = {
      name: newName,
      price: newPrice,
      description: newDescription,
      id: productId
    };
    for (let i = 0; i < updateProducts.length; i++) {
      if (updateProducts[i].id === productId) {
        updateProducts[i] = updateProduct;
      }
    }
    this.setState({products: updateProducts});
  },
  render() {
    return (
      <div className="container">
        <h1>ProductList</h1>
        <div>
          <Totals products={this.state.products}/>
        </div>
        <div>
          <AddProduct add={this.addProduct}/>
        </div>
        <hr/>
        <p>Please click on column headings to sort results</p>
        <div>
          <CurrentList currProducts={this.state.products} delete={this.deleteProduct} update={this.updateProduct} />
        </div>
      </div>
    )
  }
})

export default ProductList;
