import db from "../database/models/index.js";
const CategoryModel = db["Categories"];
const RestaurentModel = db["Restaurents"];
const users = db["Users"];


export const createCategory = async (categoryData) => {
  try {
    return await CategoryModel.create(categoryData);
  } catch (error) {
    throw new Error(`Error creating Category: ${error.message}`);
  }
};

export const checkExistingCategory = async (name) => {
  return await CategoryModel.findOne({
    where: {
      name,
    },
  });
};

export const getAllCardses = async () => {
  try {
    const cards = await CardsModel.findAll({
      include: [
        {
          model: CategoryModel,
          as: "categories",
          include: [
            {
              model: RestaurentModel,
              as: "resto",
            },

          ],

        },

        {
          model: users,
          as: "cardUser",
          where: { role: "customer" },
          attributes: ["id", "firstname", "lastname", "email", "phone"],
          required: false,
        },
      ],
    });

    return cards;
  } catch (error) {
    console.error("Error fetching all cards with categories:", error);
    throw error;
  }
};


export const getAllCategories = async () => {
  try {
    const cards = await CategoryModel.findAll({
      include: [

        {
          model: RestaurentModel,
          as: "resto",
          include: [
            {
              model: users,
              as: "restaurentadmin",
              where: { role: "restaurentadmin" },
              attributes: ["id", "firstname", "lastname", "email", "phone"],
              required: false,
            },
          
            {
              model: users,
              as: "employee",
              where: { role: "employee" },
              attributes: ["id", "firstname", "lastname", "email", "phone","role"],
              required: false,
            },

          ],
        },
      ],
    });

    return cards;
  } catch (error) {
    console.error("Error fetching all cards with categories:", error);
    throw error;
  }
};

export const deleteOneCategory = async (id) => {
  const categoryToDelete = await CategoryModel.findOne({ where: { id } });
  if (categoryToDelete) {
    await CategoryModel.destroy({ where: { id } });
    return categoryToDelete;
  }
  return null;
};

export const updateOneCategory = async (id, restaurent, category) => {
  const categoryToUpdate = await CategoryModel.findOne({ where: { id, restaurent } });
  if (categoryToUpdate) {
    await CategoryModel.update(category, { where: { id } });
    return category;
  }
  return null;
};


export const getOneCategoryWithDetails = async (id) => {
  try {
    const cards = await CategoryModel.findByPk(id,{
      include: [

        {
          model: RestaurentModel,
          as: "resto",
          include: [
            {
              model: users,
              as: "restaurentadmin",
              where: { role: "restaurentadmin" },
              attributes: ["id", "firstname", "lastname", "email", "phone"],
              required: false,
            },
          
            {
              model: users,
              as: "employee",
              where: { role: "employee" },
              attributes: ["id", "firstname", "lastname", "email", "phone","role"],
              required: false,
            },

          ],
        },
      ],
    });

    return cards;
  } catch (error) {
    console.error("Error fetching all cards with categories:", error);
    throw error;
  }
};

export const activatecategorys = async (id) => {
  const categoryToActivate = await CategoryModel.findOne(
    { where: { id } }
 
  );
  if (categoryToActivate) {
    await CategoryModel.update({ status: "active" }, { where: { id } });
    return categoryToActivate;
  }
  return null;
};

export const diactivatecategorys = async (id) => {
  const categoryToActivate = await CategoryModel.findOne(
    { where: { id } }
 
  );
  if (categoryToActivate) {
    await CategoryModel.update({ status: "inactive" }, { where: { id } });
    return categoryToActivate;
  }
  return null;
};


export const getcategory = async (id) => {
  const allcategory = await CategoryModel.findAll({
    where: {
      id,
    
    }
 
  });
  return allcategory;
};

// activatecategory