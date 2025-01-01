import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"], // required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"], // required: true,
        trim: true,
        minLength: [6, "Password must be at least 6 characters"],
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    }

}, {
    timestamps: true,
});


// password encryption hook
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }

});

// create a user
const User = mongoose.model("User", userSchema);


// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default User;
