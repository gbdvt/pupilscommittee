const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    order: Array,
    author: Object,
    authorData: Object,
    amount: Number,
    color: String,
    status: {
        type: String,
        default: "Ordered"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    shipment: Object,
    charge: Object
});

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order