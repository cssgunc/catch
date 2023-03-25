import React, {useState} from 'react'
import { Badge } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'

import './ShoppingCart.css'

function CartDisplay(props) {

}

export default function ShoppingCart(props) {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }
    const badgeStyle = { position: 'absolute', marginTop: '-3px', marginLeft: '-7px', fontSize: '10px', padding: '0.35em 0.5em 0.25em' };
    const orders = new Map([
        ['trex', 1],
        ['airplane', 2]
    ])
    
    return (
        open 
        ?  
        <CartDisplay
            order={orders} // props.order is a map with key toyName and value toyQuantity. Same order is to be stored in firestore 
        />
        : <button className='shopping-cart-button' onClick={handleClick}>
                <FaShoppingCart className='shopping-cart' color={props.alternate ? 'white' : 'black'} size={25}/>
                {props.quantity === 0 ? <></>:
                    <Badge pill bg="primary" 
                    style={badgeStyle}>
                        {props.quantity}
                    </Badge>
                }
            </button>
        
    )
}
