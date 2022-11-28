import React from 'react';

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const totalPrice = itemsPrice

  return (
    <aside className="block col-1">
      <h2 style={{marginLeft: '0rem '}}>Items</h2>
      <div style={{marginLeft: '0.5rem '}}>
        {cartItems.length === 0 && <div style={{marginLeft: '1rem'}}>No items in cart</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>
            <div className="col-5 text-left">
            {item.qty} 
            </div>
            <div className="col-1 text-right">
            x
            </div>

            <div className="col-2 text-right">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => alert('Please ship payment to: 123 Sesame Street')}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}