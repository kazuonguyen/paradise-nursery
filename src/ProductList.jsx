import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, formatPrice, selectCartCount, selectItems } from './CartSlice.jsx';

const images = import.meta.glob('./plants/*.webp', { eager: true, query: '?url', import: 'default' });
const categories = [
  ['Easy-care plants', [
    ['Snake Plant', 1800, 'Upright foliage that tolerates dry soil.'],
    ['Golden Pothos', 1600, 'Trailing vines with gold-flecked leaves.'],
    ['Spider Plant', 1400, 'Arching leaves and dangling baby plants.'],
    ['ZZ Plant', 2400, 'Glossy stems that handle lower light.'],
    ['Cast Iron Plant', 2600, 'Broad green leaves for shadier corners.'],
    ['Jade Plant', 1700, 'A sun-loving succulent with thick oval leaves.'],
  ]],
  ['Statement plants', [
    ['Monstera', 3200, 'Large leaves that develop distinctive splits.'],
    ['Rubber Plant', 2800, 'Deep green leaves with a polished sheen.'],
    ['Fiddle Leaf Fig', 3800, 'Broad, violin-shaped leaves for a bright room.'],
    ['Bird of Paradise', 4200, 'Tall stems and paddle-shaped foliage.'],
    ['Spineless Yucca', 3300, 'An upright cane topped with pointed leaves.'],
    ['Croton', 2500, 'Colorful foliage that thrives in bright light.'],
  ]],
  ['Humidity lovers', [
    ['Calathea', 2400, 'Patterned leaves that prefer steady moisture.'],
    ['Peace Lily', 2200, 'Shiny green leaves and white blooms.'],
    ['Boston Fern', 2100, 'Feathery fronds that arch over the pot.'],
    ['Nerve Plant', 1500, 'Compact foliage with finely veined leaves.'],
    ['Maidenhair Fern', 2300, 'Delicate fan-shaped leaflets on dark stems.'],
    ['Anthurium', 3000, 'Heart-shaped foliage and bright red spathes.'],
  ]],
];

export function Navbar({ page }) {
  const count = useSelector(selectCartCount);
  return <header>
    <a className="brand" href="#home">Paradise Nursery</a>
    <nav aria-label="Main navigation">
      <a href="#home">Home</a>
      <a href="#plants" aria-current={page === '#plants' ? 'page' : undefined}>Plants</a>
      <a href="#cart" aria-current={page === '#cart' ? 'page' : undefined}>
        <span aria-hidden="true">🛒</span> Cart <span className="count">{count}</span>
      </a>
    </nav>
  </header>;
}

export default function ProductList() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  return <main className="shop">
    <h1>Shop houseplants</h1>
    {categories.map(([category, plants], row) => (
      <section key={category}>
        <h2>{category}</h2>
        <div className="grid">
          {plants.map(([name, price, description], column) => {
            const id = row * 6 + column + 1;
            const image = images[`./plants/${id}.webp`];
            const inCart = items.some(item => item.id === id);
            return <article className="card" key={id}>
              <img src={image} alt={name} loading="lazy" />
              <div className="card-body">
                <h3>{name}</h3>
                <p>{description}</p>
                <div className="card-actions">
                  <strong>{formatPrice(price)}</strong>
                  <button disabled={inCart} onClick={() => dispatch(addItem({ id, name, price, image }))}>
                    {inCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </article>;
          })}
        </div>
      </section>
    ))}
  </main>;
}
