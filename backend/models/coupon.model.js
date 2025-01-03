import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    code: {
        type: String,
        required: [true, "Please add a code"],
    },
    discount: {
        type: Number,
        required: [true, "Please add a discount"],
        min: [0, "Discount cannot be negative"],
        max: [50, "Discount cannot be more than 50%"],
    },
    endDate: {
        type: Date,
        required: [true, "Please add an end date"],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        uniquwe: true
    }
},{ timestamps: true});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;