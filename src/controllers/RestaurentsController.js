// RestaurentController.js
import {
  createRestaurent,
  getAllRestaurentes,
  deleteOneRestaurent,
  checkExistingRestaurent,
  getOneRestaurentWithDetails,
  updateOneResto,
  activateResto,
  deactivateResto,
  

} from "../services/restaurentService";
import imageUploader from "../helpers/imageUplouder";


import {
  updateUserWithRestaurant
} from "../services/userService";

export const addRestaurentController = async (req, res) => {
  try {
    if (req.user.role !== "restaurentadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not a restaurant admin",
      });
    }

    req.body.name = req.body.name.toUpperCase();

    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const existingRestaurant = await checkExistingRestaurent(req.body.name);
    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant with the same name already exists",
      });
    }
    req.body.status = "active";
    const newRestaurant = await createRestaurent(req.body);

    // Assuming req.user is the authenticated user
    // Update the user with the new restaurant information
    const updatedUser = await updateUserWithRestaurant(req.user.id, newRestaurant.id);

    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
      user: updatedUser,
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


export const RestaurentWithAllController = async (req, res) => {
  try {

  
    let data = await getAllRestaurentes();
    if (!data) {
      return res.status(404).json({
        message: "Restaurent not found",
      });
    }

    if(req.user.role==="restaurentadmin"){
      
      data= data.filter(res => res.id===req.user.restaurents)
    }
    return res.status(200).json({
      success: true,
      message: "Restaurent retrieved successfully",
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



export const getAllRestaurentesController = async (req, res) => {
  try {
    const Restaurentes = await getAllRestaurentes();
    return res.status(200).json({
      success: true,
      message: "Restaurentes retrieved successfully",
      Restaurentes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const deleteOneRestaurentController = async (req, res) => {
  try {
    if (req.user.role !== "restaurentadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not a restaurant admin",
      });
    }

    const Restaurent = await deleteOneRestaurent(req.params.id);
    if (!Restaurent) {
      return res.status(404).json({
        success: false,
        message: "Restaurent not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Restaurent deleted successfully",
      Restaurent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const updateOneRestoController = async (req, res) => {
  
  if (req.user.role !== "restaurentadmin") {
    return res.status(401).json({
      success: false,
      message: "Not authorized, you are not a restaurant admin",
    });
  }
  try {

    if (req.files) {
      const image = await imageUploader(req);
      req.body.image = image.url;
      console.log(req.body.image)
    }

    const updatedResto = await updateOneResto(req.user.restaurents, req.body);
    if (!updatedResto) {
      return res.status(404).json({
        success: false,
        message: "Resto not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Resto updated successfully",
      Resto: updatedResto,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const getOneRestaurentController = async (req, res) => {


  try {
    const { id } = req.params;
    const data = await getOneRestaurentWithDetails(id);
    if (!data) {
      return res.status(404).json({
        message: "Resto not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Resto retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const activateRestaurentController = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not a superadmin",
      });
    }

    const restaurant = await activateResto(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant activated successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const deactivateRestaurentController = async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, you are not a superadmin",
      });
    }

    const restaurant = await deactivateResto(req.params.id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant deactivated successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};