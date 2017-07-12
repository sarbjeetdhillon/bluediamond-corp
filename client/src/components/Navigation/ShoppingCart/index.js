import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-isomorphic-render';

import {connector, removeFromCart} from 'state/checkout';
import Button from '../../Button';
import ShoppingCartItem from '../../ShoppingCartItem';
import styles from './styles.module.css';

@connect(
    (state) => ({...connector(state.checkout)}),
    {removeFromCart}
)
export default class ShoppingCart extends Component {
    static propTypes = {
        children: PropTypes.node,
        checkout: PropTypes.object,
        onToggle: PropTypes.shape({
            show: PropTypes.func.isRequired,
            hide: PropTypes.func.isRequired
        }).isRequired,
        auth: PropTypes.object
    }

    handleRemoveItem = (id) => {
        this.props.removeFromCart({checkoutId: this.props.checkout.id, lineItemIds: [id]});
    }

    getImageUrl = (variant) => {
        if(!variant.image)
            return variant.product.images.edges[0].node.src;

        return variant.image.src;
    }

    render() {
        const {children, checkout, auth, onToggle} = this.props;
        const checkoutLink = auth ? `${checkout.webUrl}&auth=true` : checkout.webUrl;

        return (
            <div>
                <div className={styles.cart}>
                    {(!checkout.orderStatusUrl) &&
                      (checkout.lineItems && checkout.lineItems.edges.length) ? (
                        <div>
                            <h2>My Shopping Cart</h2>
                            {checkout.lineItems &&
                                checkout.lineItems.edges.map(({node: lineItem}) => (
                                <ShoppingCartItem
                                    key={lineItem.id}
                                    imageUrl={this.getImageUrl(lineItem.variant)}
                                    title={lineItem.title}
                                    description={lineItem.variant.title}
                                    quantity={lineItem.quantity}
                                    price={lineItem.variant.price}
                                    onRemoveItem={() => {
                                        this.handleRemoveItem(lineItem.id);
                                    }}
                                />
                            ))}
                            <div className={styles.subtotal}>
                                <h2>Subtotal</h2>
                                <div className={styles.price}>
                                    ${checkout.subtotalPrice}
                                </div>
                            </div>
                            <div className={styles.checkout}>
                                <Button layout="fw" href={checkoutLink}>
                                    Checkout
                                </Button>
                                <Link
                                    className={styles.continue}
                                    href="/store"
                                    onClick={() => {
                                        onToggle.hide();
                                    }}
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                            {children}
                        </div>
                    ) : 'Your shopping cart is empty'}
                </div>
            </div>
        );
    }
}
