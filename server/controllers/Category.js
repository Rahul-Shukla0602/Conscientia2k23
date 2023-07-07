const Category = require('../models/Category');
const Course = require('../models/Event');
//create Category
exports.createCategory = async (req,res)=>{
    try{
         const {name,description} = req.body;
         if(!name || !description){
            return res.status(403).json({
                success:false,
                message:"All field are required"
            });
        }
        const categoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log("Category Data: ",categoryDetails);
        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"issuse while creating Category"
        })
    }
}
exports.showAllCategories = async (req,res)=>{
    try{
        const allCategory = await Category.find({},{name:true,description:true});
        console.log("all_Category: ",allCategory);
        return res.status(200).json({
            success:true,
            message:"All Category reutrned successfully",
            allCategory
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
exports.categoryPageDetails = async (req,res)=>{
    try{
        const {category_id} = req.body;
        const selectedCategory = await Category.findById(category_id)
                                               .populate("event")
                                               .exec();
        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"this Category is not present"
            });
        }
        const differentCategory = await Category.find({
            _id:{$ne:category_id},
        })
        .populate("event")
        .exec();
        const category = await Category.findById({_id:category_id}).populate("event");

        const topEvents = await Course.aggregate([
            {$match:{_id:{$in:category.event}}},
            {$project:{ eventName: 1, participantCount:{ $size: "$participantEnrolled" }}},
            {$sort:{participantCount: -1}},
            {$limit:5}
        ]);
        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                topEvents,
            },
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}