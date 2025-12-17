const foodModel = require('../models/foodModel')
const orderModel = require('../models/orderModel')

const createFoodController = async(req,res)=>{
    try {
        const data = req.body;
        
        //validation
         if (!data.title || !data.price || !data.discription) {
          return res.status(400).json({
            success:false,
             message: 'Name, price and discription are required' });
         }

          const existingFood = await foodModel.findOne({
         title: { $regex: new RegExp(`^${data.title}$`, "i") }, // ignore case
         });

    if (existingFood) {
      return res.status(400).json({
        success: false,
        message: "Failed, this food already exists",
      });
    }
        const newfood = new foodModel(data);

        const response = await newfood.save();

        res.status(201).json({
            success : true,
        message: 'Food created successfully',
         response
        });
    } catch (error) {
         res.status(500).json({
            success : false,
        message: 'error in server',});
    }
}

const GetAllfoodControlller = async(req,res)=>{
      try {
        const foods = await foodModel.find({})
        if(!foods){
            res.status(201).json({
            message: 'No food was found',
        });
        }
         res.status(200).send({
            success : true,totalfoods : foods.length,foods,
         })
      } catch (error) {
         console.log(error)
         res.status(500).send({message: ' error in getall food api'})
      }
}

const GetSinglefoodController= async(req,res)=>{
    try {
        const foodid = req.params.id
        const food = await foodModel.findById(foodid)
        if(!food ){
            res.status(404).send({message:' no found with this id'})
        }
        if(!foodid ){
            res.status(404).send({message:' please provide id'})
        }
        res.status(200).send({
            food
        })

    } catch (error) {
         console.log(error)
         res.status(500).send({message: ' error in get food by id api'})
    }
}

const getFoodbyresturentController= async(req,res)=>{
    try {
        const resturentid = req.params.id
        if(!resturentid ){
            res.status(404).send({message:' please provide id'})
        }

        const food = await foodModel.find({resturent:resturentid});
        if(!food ){
            res.status(404).send({message:' no resturent found with this id'})
        }
        res.status(200).send({
            message:'food base on returent',
            totalFooditems:food.length,
            food
        })

    } catch (error) {
         console.log(error)
         res.status(500).send({message: ' error in get food by id api'})
    }
}

const updateFoodController = async(req,res)=>{
        try {
            const foodid = req.params.id
            if(!foodid ){
            res.status(404).send({message:' provide food id food'})
            }

        const food = await foodModel.findById(foodid)
         if(!food ){
            res.status(404).send({message:' no food is found'})
            }

         const updatedfooddata = req.body;   

         const response = await foodModel.findByIdAndUpdate(foodid , updatedfooddata,{
             new:true, // return updated document
            runValidators:true, // run mongoose validation
         });

        console.log('data updated of candidate:', response.title);
        res.status(200).json({message :" food data updated"});
        } catch (error) {
         console.log(error)
         res.status(500).send({message: ' error in update food id '})
    
        }
}

const deleteFoodController = async(req,res)=>{
    try {
        const foodid = req.params.id
         if(!foodid ){
            res.status(404).send({message:' please provide id'})
        }

        const food = await foodModel.findById(foodid);
        if(!food ){
            res.status(404).send({message:' no food found with this id'})
        }

        await foodModel.findByIdAndDelete(foodid)
         res.status(200).send({
            message: ' food item deleted ',
            fooddeleted:food.title})

    } catch (error) {
         console.log(error)
         res.status(500).send({message: ' error in delete food id '})
    }
}

//ordercontrollers

//all order for admin
const getallordersControlller = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("food.foodId", "title price");

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in get all order api" });
  }
};

//all order for user

const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel
      .find({ buyer: userId })
      .populate("food.foodId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user orders" });
  }
};




const placeOrdercontroller = async (req, res) => {
  try {
    const { cart } = req.body;
     console.log("🛒 CART RECEIVED:", cart);

    if (!cart || cart.length === 0) {
      return res.status(400).send({ message: "Cart is empty" });
    }

    let total = 0;

    const foodItems = cart.map((item) => {
  if (!item.foodId) {
    throw new Error("Food ID missing in cart item");
  }

  total += item.price * (item.quantity || 1);

  return {
     foodId: item.foodId,
    quantity: item.quantity || 1,
    price: item.price,
  };
});


    const newOrder = new orderModel({
      food: foodItems,
      buyer: req.user.id,   
      payment: total,
    });

    await newOrder.save();

    res.status(200).send({
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in place order API" });
  }
};

const updateOrderStatusController = async(req,res)=>{
    try {
        const orderid = req.params.id
        if(!orderid){
            return res.status(404).send({message:'pleaseprovide valid orderid'});
        }

        const{status} = req.body
       const order = await orderModel.findByIdAndUpdate(
            orderid,
            { status },
            { new: true }
        );
        res.status(200).send({
            mesaage:"order Status updated",
            updatedorder:order.id
        })
    } catch (error) {
         console.log(error)
         res.status(500).send({message: ' error in updateorder api '})
    }

}



const analyticsDashboardController = async (req, res) => {
  try {
    const now = new Date();

    //DAILY SALES
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const dailySalesAgg = await orderModel.aggregate([
      { $match: { createdAt: { $gte: startOfDay } } },
      { $group: { _id: null, total: { $sum: "$payment" } } }
    ]);

    const dailySales = dailySalesAgg[0]?.total || 0;

    // MONTHLY SALES 
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlySalesAgg = await orderModel.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$payment" } } }
    ]);

    const monthlySales = monthlySalesAgg[0]?.total || 0;

    //TOTAL ORDERS
    const totalOrders = await orderModel.countDocuments();

    //MOST SOLD ITEM
    const mostSoldItemAgg = await orderModel.aggregate([
  { $unwind: "$food" },
  {
    $group: {
      _id: "$food.foodId",
      totalQty: { $sum: "$food.quantity" },
    },
  },
  { $sort: { totalQty: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "foods",
      localField: "_id",
      foreignField: "_id",
      as: "food",
    },
  },
  { $unwind: "$food" },
  {
    $project: {
      _id: 0,
      title: "$food.title",
      totalQty: 1,
    },
  },
]);


  let mostSoldItem = mostSoldItemAgg.length
    ? {
        title: mostSoldItemAgg[0].title,
        quantity: mostSoldItemAgg[0].totalQty,
      }
    : null;

  // SALES LINE CHART (LAST 7 DAYS) 
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 6);
  last7Days.setHours(0, 0, 0, 0);

  const salesChartAgg = await orderModel.aggregate([
    { $match: { createdAt: { $gte: last7Days } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        total: { $sum: "$payment" }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const salesChart = salesChartAgg;

res.status(200).json({
  success: true,
  data: {
    dailySales,
    monthlySales,
    totalOrders,
    mostSoldItem, 
    salesChart,
  },
});


  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching analytics data"
    });
  }
};

const usersAnalyticsController = async (req, res) => {
  try {
    const usersAnalytics = await orderModel.aggregate([
      {
        $group: {
          _id: "$buyer",
          totalOrders: { $sum: 1 },
          totalValue: { $sum: "$payment" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.username",
          email: "$user.email",
          phone: "$user.phone",
          totalOrders: 1,
          totalValue: 1,
        },
      },
      { $sort: { totalValue: -1 } },
    ]);

    res.status(200).json({
      success: true,
      users: usersAnalytics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching users analytics",
    });
  }
};





module.exports ={
    createFoodController,
    GetAllfoodControlller,
    GetSinglefoodController,
    getFoodbyresturentController,
    updateFoodController,
    deleteFoodController,
    placeOrdercontroller,
    updateOrderStatusController,
    getallordersControlller,
    getUserOrdersController,
    analyticsDashboardController,
    usersAnalyticsController
}