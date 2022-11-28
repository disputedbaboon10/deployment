import Header from './components/Header.js';
import Main from './components/Main.js';
import Basket from './components/Basket.js';
import data from './data.js';
import { useState, useRef } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

const defaultMax = 3000;

function App() {
  const [listed, setListed] = useState(data.products);
  const [allProd, setAllProd] = useState(data.products);
  const checkboxRef = useRef(null);
  const [check_stock, setStock] = useState(0);
  const [value_min, setMinValue] = useState(0);
  const [value_max, setMaxValue] = useState(defaultMax);

  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const sortLow = () => {
    const sorted = [...listed].sort((a, b) => (a.price > b.price) ? 1 : -1);
    const all_sorted = [...allProd].sort((a, b) => (a.price > b.price) ? 1 : -1);
    setListed(sorted);
    setAllProd(all_sorted);
  }

  const sortHigh = () => {
    const sorted = [...listed].sort((a, b) => (a.price < b.price) ? 1 : -1);
    const all_sorted = [...allProd].sort((a, b) => (a.price < b.price) ? 1 : -1);
    setListed(sorted);
    setAllProd(all_sorted);
  }

  const sizeBig = () => {
    const sorted = [...listed].sort((a, b) => (a.size < b.size) ? 1 : -1);
    const all_sorted = [...allProd].sort((a, b) => (a.size < b.size) ? 1 : -1);
    setListed(sorted);
    setAllProd(all_sorted);
  }
  const sizeSmall = () => {
    const sorted = [...listed].sort((a, b) => (a.size > b.size) ? 1 : -1);
    const all_sorted = [...allProd].sort((a, b) => (a.size > b.size) ? 1 : -1);
    setListed(sorted);
    setAllProd(all_sorted);
  }

  const sortPop = () => {
    const sorted = [...listed].sort((a, b) => (a.id > b.id) ? 1 : -1);
    const all_sorted = [...allProd].sort((a, b) => (a.id > b.id) ? 1 : -1);
    setListed(sorted);
    setAllProd(all_sorted);
  }

  const resetFilters = () => { 
    setMinValue(0);
    setMaxValue(defaultMax);
    checkboxRef.current.checked = false;
    setStock(0);
    setListed(allProd);
  }

  const setFilters = () => {
    var low = value_min;
    var high = value_max;
    var in_price = [];
    for (let i = 0; i < allProd.length; i++) {
      var cur_prod = allProd[i];
      if (cur_prod.price >= low && cur_prod.price <= high) {
        if (check_stock && cur_prod.inStock) {
          in_price.push(cur_prod);
        }
        else if (!check_stock) {
          in_price.push(cur_prod);
        }
      }
    }
    setListed(in_price);
  }

  return (
    <Container>
      <div className="App">
        <Header countCartItems={cartItems.length}></Header>
        <div className="row">
          <main className="block col-0.5">
            <div className='col'>
              <h2>
                Sort by...
              </h2>
              <Form style={{marginLeft: '1rem'}}>
                <div className="mb-3">
                  <Form.Check onClick={() => sortLow()} inline label="Price low to high" name="group1" type='radio' />
                  <Form.Check onClick={() => sortHigh()} inline label="Price high to low" name="group1" type='radio' />
                  <Form.Check onClick={() => sizeBig()} inline label="Size large to small" name="group1" type='radio' />
                  <Form.Check onClick={() => sizeSmall()} inline label="Size small to large" name="group1" type='radio' />
                  <Form.Check onClick={() => sortPop()} inline label="Popularity" name="group1" type='radio' />
                </div>
              </Form>
              <h2 style={{marginTop: '2rem'}}>
                Filters...
              </h2>
              <Form style={{marginLeft: '1rem', marginTop: '0.5rem', marginBottom: '2rem'}}>
                <Form.Group as={Row} style={{marginBottom: '0.75rem'}}>
                  <Col xs="10">
                    Min Price
                  </Col>
                  <Col xs="9">
                    <RangeSlider
                      value={value_min}
                      onChange={(e) => setMinValue(e.target.value)}
                      min={0}
                      max={3000}
                      step={50}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} style={{marginBottom: '0.75rem'}}>
                  <Col xs="10">
                    Max Price
                  </Col>
                  <Col xs="9">
                    <RangeSlider
                      value={value_max}
                      onChange={(e) => setMaxValue(e.target.value)}
                      min={0}
                      max={3000}
                      step={50}
                    />
                  </Col>
                </Form.Group>
                <Form.Check style={{marginBottom: '0.75rem'}} onChange={(e) => setStock(!check_stock)}
                  type="checkbox"
                  id="custom-switch"
                  label="In Stock"
                  ref= {checkboxRef}
                />
              </Form>
              <button onClick={() => resetFilters()}>Reset Filters</button>
              <button onClick={() => setFilters()}>Apply Filters</button>
            </div>
          </main>

          <Main products={listed} onAdd={onAdd}></Main>

          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
          ></Basket>

        </div>

      </div>
    </Container>
  );
}

export default App;