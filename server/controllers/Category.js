const Category = require('../models/Category');
const Course = require('../models/Event');
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
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
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      console.log("KAY hua")
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "event",
          match: { status: "Published" },
          populate: {
            path: "organizer",
        },
        })
        .exec()

      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.event.length === 0) {
        console.log("No event found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No event found for the selected category.",
        })
      }
      console.log("Selected category Event", selectedCategory)
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "event",
          match: { status: "Published" },
          populate: {
            path: "organizer",
        },
        })
        .exec()
        console.log("Different Event", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "event",
          match: { status: "Published" },
          populate: {
            path: "organizer",
        },
        
        })
        .exec()
        console.log("allCategories: ",allCategories)   

      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }