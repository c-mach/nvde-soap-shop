const Gallery = (props) => {
    const { soapName, ingredients, price, picture } = props;
    return (
        <ul>
            <li>
                <div className="image-container">
                    <img src={picture} alt="A photo of hand crafted soap."/>
                </div>
                <div className="text-container">
                    <p>{soapName} {price}</p>
                    <p>{ingredients.join(", ")}</p>
                </div>
            </li>            
        </ul>
    )
}

export default Gallery;

