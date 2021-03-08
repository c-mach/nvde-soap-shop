import './styles/App.scss';
import firebase from './firebase.js';
import Header from './Header.js';
import Gallery from './Gallery.js'; 
import ShoppingCart from './ShoppingCart.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';


function App() {

  const [ soapProducts, setSoapProducts ] = useState([]);
  
  useEffect(() => {

    const dbRef = firebase.database().ref()

    // const inventory = {
    //     soap1: {
    //       name: 'soap1',
    //       title: 'Sage + Olive Oil',
    //       price: 10,
    //       ingredients: ['organic olive oil', 'organic coconut oil', 'clary sage essential oil', 'shea butter', 'love'],
    //       image: 'https://res.cloudinary.com/dhcw51nyl/image/upload/c_scale,h_250/v1615232522/IMG_8175_feevt4.jpg',
    //       inCart: 0
    //     },
    //     soap2: {
    //       name: 'soap2',
    //       title: 'Rose Petal + Hibiscus Tea',
    //       price: 10,
    //       ingredients: ['organic olive oil', 'organic coconut oil', 'rose petals', 'lemon zest', 'hibiscus tea', 'love'],
    //       image: 'https://res.cloudinary.com/dhcw51nyl/image/upload/c_scale,h_250/v1615232522/IMG_8174_fjwh1s.jpg',
    //       inCart: 0
    //     },
    //     soap3: {
    //       name: 'soap3',
    //       title: 'Earl Grey Tea + Shea Butter',
    //       price: 10,
    //       ingredients: ['organic olive oil', 'organic coconut oil', 'earl grey tea', 'castor oil', 'palm oil', 'shea butter', 'love'],
    //       image: 'https://res.cloudinary.com/dhcw51nyl/image/upload/c_scale,h_250/v1615232522/IMG_8177_a6ww1w.jpg',
    //       inCart: 0
    //     },
    //     soap4: {
    //       name: 'soap4',
    //       title: 'Charcoal + Honey + Milk',
    //       price: 10,
    //       ingredients: ['organic olive oil', 'organic coconut oil', 'honey & milk fragrance', 'charcoal', 'love'],
    //       image: 'https://res.cloudinary.com/dhcw51nyl/image/upload/c_scale,h_250/v1615232522/IMG_8176_fmgmwf.jpg',
    //       inCart: 0
    //     }
    // };
    
    // dbRef.set(inventory);
  
    dbRef.on('value', (data) => {
      const soapData = data.val();
      
      const copySoap = [];

      for (let soapKey in soapData) {

        copySoap.push(soapData[soapKey]);
        
      }

      setSoapProducts(copySoap);
  
    })     
  },[]);

  const handleClick = (event) => {
    const selectedSoap = event.target.id;
    const dbRef = firebase.database().ref(`${selectedSoap}`)

    dbRef.update({
      inCart: firebase.database.ServerValue.increment(1)
    })
  }

  const handleRemove = (event) => {
    const removeSoap = (event.target.id)
    const dbRef = firebase.database().ref(`${removeSoap}`)

    dbRef.update({
      inCart: firebase.database.ServerValue.increment(-1)
    })
  }

  return (
    <div className="App">
      <Header />

      <main>
        <div className='wrapper'>
          <h2>Available Soaps:</h2>

        <div className='soap-container'>
          {
            soapProducts.map((item, index) => {
              return (
                <Gallery 
                  key={`${index}-${item.name}`} 
                  ingredients={item.ingredients}
                  soapName={item.name}
                  soapTitle={item.title}
                  picture={item.image}
                  price={item.price}

                  amountInCart={item.inCart}
                  addToCart={handleClick}
                />
              )
            })
          }
          <button className="checkout">check out</button>
        </div>  


        <div className='shopping-cart'>
          {
            soapProducts.filter(item => item.inCart > 0)
              .map((soapInCart, index) => (
                <ShoppingCart 
                  key={`${index}-${soapInCart.name}`}
                  soapName={soapInCart.name}
                  soapTitle={soapInCart.title}
                  amountInCart={soapInCart.inCart}
                  price={soapInCart.price}
                  removeFromCart={handleRemove}
                />
  
              ))
          }
        </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
