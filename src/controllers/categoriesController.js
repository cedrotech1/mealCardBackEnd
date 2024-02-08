import {
  // Update the necessary imports for Category services here
  createCategory,
  getAllCategories,
  deleteOneCategory,
  checkExistingCategory,
  getOneCategoryWithDetails,
  updateOneCategory,
  activatecategorys,
  diactivatecategorys,
  getcategory
} from "../services/categoriesService";
import imageUploader from "../helpers/imageUplouder";

export const addCategoryController = async (req, res) => {
  try {
    if (req.user.role !== "restaurentadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not a restaurant admin",
      });
    }

    req.body.restaurent=req.user.restaurents;
    req.body.status='active';


    // req.body.restaurent ==  req.user.restaurents
     
    const newCategory = await createCategory(req.body);

    // TODO: Handle any additional logic related to Category creation

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      Category: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const CategoryWithAllController = async (req, res) => {
  try {
    const data1 = await getAllCategories();
    if (!data1) {
      return res.status(404).json({
        message: "Categories not found",
      });
    }

    let data;

    if(req.user.role=='employee'){

    
        if (Array.isArray(data1)) {
          data = data1.filter(cat => cat.restaurent == req.user.restaurents && cat.status=='active');
        } else {
          data = data1;
        }
    }
    // restaurentadmin

    if(req.user.role=='restaurentadmin'){
        // let data;
        if (Array.isArray(data1)) {
          data = data1.filter(cat => cat.restaurent == req.user.restaurents);
        } else {
          data = data1;
        }
   }

 

    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const deleteOneCategoryController = async (req, res) => {
  try {
    // if (req.user.role !== "superadmin") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized, you are not superadmin",
    //   });
    // }

    const deletedCategory = await deleteOneCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      Category: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const updateOneCategoryController = async (req, res) => {
  try {
    if (req.user.role !== "restaurentadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not superadmin",
      });
    }
    if (req.files) {
      const image = await imageUploader(req);
      req.body.image = image.url;
      console.log(req.body.image)
    }
    // req.body.name = req.body.name.toUpperCase();
    
    const updatedCategory = await updateOneCategory(req.params.id,req.user.restaurents,req.body);
    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      Category: updatedCategory,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const getOneCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOneCategoryWithDetails(id);
    if (!data) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const activatecategory = async (req, res) => {
  
  try {

    let role = req.user.role;
    if (role !== "restaurentadmin") {
    
        return res.status(400).json({
          success: false,
          message: "you are not allowed to add superadmin or restaurentadmin ",
        });
      }

    const existingcategory = await getcategory(req.params.id);
    if (!existingcategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
 


    const user = await activatecategorys(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "category activated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const diactivatecategory= async (req, res) => {
  
  try {

    let role = req.user.role;
    if (role !== "restaurentadmin") {
    
        return res.status(400).json({
          success: false,
          message: "you are not allowed to add superadmin or restaurentadmin ",
        });
      }


    const existingUser = await getcategory(req.params.id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
 


    const user = await diactivatecategorys(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "category disactivated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};