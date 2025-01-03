import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findone({isActive: true, userID: req.user._id});
        res.json(coupon || null);
    } catch (error) {
        console.log( "Error in get coupon controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const validateCoupon = async (req, res) => {
    try {
        const {couponCode} = req.body;
        const coupon = await Coupon.findOne({ code: couponCode, isActive: true, userID: req.user._id});
        if (coupon) {
            if (coupon.endDate < Date.now()) {
                coupon.isActive = false;
                await coupon.save();
                return res.status(400).json({ message: "Coupon expired" });
            }
            res.json({
                message: "Coupon applied successfully",
                code: coupon.code,
                discount: coupon.discount
            });
        } else {
            res.status(404).json({ message: "Coupon not found" });
        }

    } catch (error) {
        console.log( "Error in validate coupon controller", error.message);
        res.status(500).json({ message: error.message });
    }
}