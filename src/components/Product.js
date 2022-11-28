import React from 'react';

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div style={{marginLeft: '1rem', marginTop: '1rem'}}>
      <img className="small" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <div style={{color: '#4cbd79', marginLeft: '0.5rem', marginBottom: '0.5rem'}}>${product.price}</div>
      <div>
        {product.inStock && <button onClick={() => onAdd(product)}>Add To Cart</button>}
        {!product.inStock && <disbutton style={{color: '#808080'}}>Out of Stock</disbutton>}
      </div>
    </div>
  );
}