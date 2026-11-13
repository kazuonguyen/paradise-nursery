import React, { useSyncExternalStore } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList, { Navbar } from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

function subscribe(onChange) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

export default function App() {
  const page = useSyncExternalStore(subscribe, () => window.location.hash);
  if (page === '#plants' || page === '#cart') {
    return <>
      <Navbar page={page} />
      {page === '#plants' ? <ProductList /> : <CartItem />}
    </>;
  }

  return <main>
    <section className="hero">
      <div>
        <h1>Paradise<br />Nursery</h1>
        <p>Find a houseplant for the space you call home.</p>
        <a className="button" href="#plants">Get Started</a>
      </div>
    </section>
    <AboutUs />
  </main>;
}
