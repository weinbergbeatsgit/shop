

const formatPrice = (price) => {
    let tmpPrice = (price + "").split(".");
    if (tmpPrice[1] === null || tmpPrice[1] === undefined) {
        tmpPrice[1] = "0";
    }

    return tmpPrice[0] + "," + tmpPrice[1] + '0';
}

const CartItem = ({ cartItem, productName }) => {
    return (
        <div className="flex-row justify-space-between cart-item margin-top-10">
            <label className="text-overflow-ellipsis flex-grow">{cartItem.name}</label>
            <label> {cartItem.anzahl}  x <label className="price-label">{formatPrice(cartItem.price)}</label> €</label>
        </div>
    )
}

export default CartItem