import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice, removeItem, selectItems, updateQuantity } from './CartSlice.jsx';

export default function CartItem() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return <main className="shop cart">
    <h1>Shopping Cart</h1>
    {items.length === 0 && <p>Your cart is empty.</p>}
    <ul className="cart-list">
      {items.map(({ id, name, price, image, quantity }) => (
        <li key={id}>
          <img src={image} alt={name} />
          <div>
            <h2>{name}</h2>
            <p>{formatPrice(price)} each</p>
            <div className="quantity">
              <button aria-label={`Decrease ${name} quantity`} disabled={quantity === 1}
                onClick={() => dispatch(updateQuantity({ id, quantity: quantity - 1 }))}>−</button>
              <span>{quantity}</span>
              <button aria-label={`Increase ${name} quantity`}
                onClick={() => dispatch(updateQuantity({ id, quantity: quantity + 1 }))}>+</button>
            </div>
          </div>
          <div className="line-total">
            <strong>{formatPrice(price * quantity)}</strong>
            <button className="delete" aria-label={`Delete ${name}`}
              onClick={() => dispatch(removeItem(id))}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
    <div className="summary">
      <h2>Total <span>{formatPrice(total)}</span></h2>
      <div className="cart-actions">
        <a className="button secondary" href="#plants">Continue Shopping</a>
        <button disabled={!items.length} onClick={() => setCheckoutMessage('Coming Soon')}>Checkout</button>
      </div>
      {items.length > 0 && <p role="status">{checkoutMessage}</p>}
    </div>
  </main>;
}
