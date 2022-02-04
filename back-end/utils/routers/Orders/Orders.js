var express = require('express')
var router = express.Router()
const { nonAdminAuth, AdminAuth } = require('../../Middleware/Auth')
const Order = require('../../db/Models/Order')
const Item = require('../../db/Models/Item')
const User = require('../../db/Models/User')



router.post('/buy', nonAdminAuth, async (req, res) => {
  try {
    const user_id = req.user.data
    const data = req.body
    const docs = await Promise.all([User.findById(user_id).select(" -__v -password").exec(), Item.find({'_id': { $in: data.order.map(order => order.item) }}).exec()])

    const user = docs[0]
    const items = docs[1]

    const amount =  items.reduce((acc, item) => acc + item.price * data.order.find(order => order.item == item._id).quantity, 0)
    order = new Order({ order: data.order, author: req.user.data, authorData: user, amount, shipment: data.addresses, charge: {id: payment.id, amount: payment.amount, createdAt: payment.created} })
    await order.save()
    res.status(200)
    res.send(order._id)


  } catch (e) {
    console.log(e)
    res.status(400)
    res.send(e)
  }
})


router.post('/buyInPerson', nonAdminAuth, async (req, res) => {
  try {
    const user_id = req.user.data
    const data = req.body
    console.log(data)
    const docs = await Promise.all([User.findById(user_id).select(" -__v -password").exec(), Item.find({'_id': { $in: data.order.map(order => order.item) }}).exec()])

    const user = docs[0]
    const items = docs[1]

    const amount =  items.reduce((acc, item) => acc + item.price * data.order.find(order => order.item == item._id).quantity, 0)
    order = new Order({ order: data.order, author: req.user.data, authorData: user, amount, shipment: "In Person", charge: "In Person" })
    await order.save()
    res.status(200)
    res.send(order._id)


  } catch (e) {
    console.log(e)
    res.status(400)
    res.send(e)
  }
})



router.post('/loadMyOrders', nonAdminAuth, async (req, res) => {
  const orders = await Order.find({ author: req.user.data })
    .select(" -__v -author -payment")

  res.send(orders)
})

router.post('/loadAllOrders', AdminAuth, async (req, res) => {

  if (req.body == {}) {
    const orders = await Order.find()
    res.status(200)
    return res.send(orders)

  } else {

    let options = {}

    if (req.body.name) {
      options['authorData.name'] = {$regex: new RegExp(req.body.name, 'i')}
    }

    if (req.body.email) {
      options['authorData.email'] = {$regex: new RegExp(req.body.email, 'i')}
    }

    if (req.body.status) {
      options['status'] = req.body.status
    }
    const orders = await Order.find(options)
    res.status(200)
    return res.send(orders)
  }
})

router.get('/deliver', AdminAuth, async (req, res) => {
  const id = req.query.id
  const order = await Order.findByIdAndUpdate(id, { status: "Delivered" })

  res.status(200)
  res.send("Order has been delivered")

  // const items = await Item.find({'_id': { $in: order.order.map(order => order.item) }}).exec()
})

router.get('/pay', AdminAuth, async (req, res) => {
  const id = req.query.id
  const order = await Order.findByIdAndUpdate(id, { status: "Paid" })

  res.status(200)
  res.send("Order has been Paid")

  // const items = await Item.find({'_id': { $in: order.order.map(order => order.item) }}).exec()
})

router.get('/return', AdminAuth, async (req, res) => {
  try {
    id = req.query.id
  const order = await Order.findById(id)

  order.status = "Returned"
  await order.save()

  res.status(200)
  res.send("Order has been returned")

  const items = await Item.find({'_id': { $in: order.order.map(order => order.item) }}).exec()


  } catch (e) {
    console.log(e)
    res.status(400)
    res.send("There was a problem processing the return")
  }
})

router.get('/cancel', nonAdminAuth, async (req, res) => {
  try {
    user_id = req.user.data
    id = req.query.id

  const [user, order] = await Promise.all([User.findById(user_id), Order.findById(id)])
  

  if (order.author !== user_id && !user.isAdmin) {
    res.status(400)
    res.send("Not Authorized")
  }

  order.status = "Cancelled"
  await order.save()

  res.status(200)
  res.send("Cancelled Order")

  const items = await Item.find({'_id': { $in: order.order.map(order => order.item) }}).exec()


  } catch (e) {
    console.log(e)
    res.status(400)
    res.send("There was a problem processing the cancellation")
  }
})


router.get('/fetchOrder', nonAdminAuth, async (req, res) => {
  user_id = req.user.data
  id = req.query.id
  const order = await Order.findById(id).select(" -__v -payment").exec();
  if (order.author == req.user.data) {
    res.status(200)
    return res.send(order)
  }
  const user = await User.findById(user_id)

  if (user.isAdmin) {
    res.status(200)
    return res.send(order)
  } else {
    res.status(401)
    res.send("Not authorized to fetch this order")
  }
})



module.exports = router