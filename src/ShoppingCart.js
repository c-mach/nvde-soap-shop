const ShoppingCart = ({ soapName, soapTitle, amountInCart, price, removeFromCart }) => {

    const totalCost = price * amountInCart;

    return (
        <ul className='soap-in-cart'>
            <li>
                <p>{soapTitle} quantity: {amountInCart} total: {totalCost}</p>
                <button>remove</button>
            </li>

        </ul>
    )
}

export default ShoppingCart;