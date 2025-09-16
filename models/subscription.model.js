import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Price must be greater than 0"]
    },
    currency: { //para birimi: USD, EUR, TRY...
        type: String,
        enum: ["USD", "EUR", "TRY"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics", "other"],
        required: [true, "Subscription category is required"]
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: (value) => value <= new Date(),
            message: "Start date must be in the past" //you cannot create subs in the future
        }
    },
    renewalDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function (value){
                return value > this.startDate
                },
            message: "Renewal date must be after the start date" 
        }
    },
/* `validator: (value) => value > this.startDate` BU NEDEN OLMADI?
    * => arrow function, kendi this’ini oluşturmaz.
    * this, bulunduğu dosyanın (modülün) üst scope’una bakar. Bu da Mongoose document değil; muhtemelen undefined veya module context.
    *Dolayısıyla this.startDate undefined olur → karşılaştırma çalışmaz.
*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true //user için otomatik bir index oluşturur, sorgu hızını artırır
    }

}, {timestamps: true});