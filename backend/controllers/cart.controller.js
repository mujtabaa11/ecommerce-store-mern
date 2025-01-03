import Product from "../models/product.model.js";

export const getCartItems = async (req, res) => {
    try { 
        const cartProducts = await Product.find({_id: { $in: req.user.cartItems }});

        // Get the quantity of each cart item
        const cartItems = cartProducts.map((product) => {
            const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id);
            return {
                ...product.toJSON(),
                quantity: item.quantity 
            };
        });

        res.status(200).json(cartItems);
    } catch (error) {
        console.log( "Error in get cart items controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const addToCart = async (req, res) => {
    try { 
        const {productId} = req.body;
        const user = req.user;

        const existingCartItem = user.cartItems.find(item => item.productId.toString() === productId);

        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            user.cartItems.push({ productId });
        }

        await user.save();

        res.status(200).json({ message: "Product added to cart successfully" }).json(user.cartItems);

    } catch (error) {
        console.log( "Error in add to cart controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const removeFromCart = async (req, res) => {
    try { 
        const {productId} = req.body;
        const user = req.user;

        user.cartItems = user.cartItems.filter(item => item.productId.toString() !== productId);
        await user.save();
        res.status(200).json({ message: "Product removed from cart successfully" }).json(user.cartItems);

    } catch (error) {
        console.log( "Error in remove from cart controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const updateCartItemQuantity = async (req, res) => {
    try {
        const {id:productId} = req.params;
        const {quantity} = req.body;
        const user = req.user;
        const existingCartItem = user.cartItems.find(item => item.productId.toString() === productId);

        if (existingCartItem) {
            if (quantity > 0) {
                existingCartItem.quantity = quantity;
            } else {
                user.cartItems = user.cartItems.filter(item => item.productId.toString() !== productId);
            }

            await user.save();
            res.status(200).json({ message: "Cart item quantity updated successfully" }).json(user.cartItems);
        } else {
            res.status(404).json({ message: "Cart item not found" });
        }

    } catch (error) {
        console.log( "Error in update cart item quantity controller", error.message);
        res.status(500).json({ message: error.message });
    }
}