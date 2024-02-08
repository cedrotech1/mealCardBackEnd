import { Sequelize } from 'sequelize';
import db from "../database/models/index.js";
const RestaurentModel = db["Restaurents"];
const CategoryModel = db["Categories"];
const users = db["Users"];
const CardsModel = db["Cards"];
export const getOneRestaurentWithDetails = async (id) => {
  try {
    const restaurent = await RestaurentModel.findByPk(id,{
      include: [
        {
          model: CategoryModel,
          as: "restaurantCategories",
          include: [
            {
              model: CardsModel,
              as: "cards",
              // where: { role: "restaurentadmin" },
              attributes: ["id", "times", "userid"],
              required: false,
              include: [
                {
                  model: users,
                  as: "cardUser",
                  where: { role: "customer" },
                  attributes: ["id", "firstname", "lastname", "email", "phone"],
                  required: false,
                },
              ],
            },


          ],



        },
        {
          model: users,
          as: "restaurentadmin",
          where: { role: "restaurentadmin" },
          attributes: ["id", "firstname", "lastname", "email", "phone", "role"],
          required: false,
        },
        {
          model: users,
          as: "employee",
          where: { role: "employee" },
          attributes: ["id", "firstname", "lastname", "email", "phone", "role"],
          required: false,
        },
      ],

    });

    return restaurent;
  } catch (error) {
    console.error("Error fetching all restaurants with users:", error);
    throw error;
  }
};

export const getAllRestaurentes = async () => {
  try {
    const restaurent = await RestaurentModel.findAll({
      include: [
        {
          model: CategoryModel,
          as: "restaurantCategories",
          include: [
            {
              model: CardsModel,
              as: "cards",
              // where: { role: "restaurentadmin" },
              attributes: ["id", "times", "userid"],
              required: false,
              include: [
                {
                  model: users,
                  as: "cardUser",
                  where: { role: "customer" },
                  attributes: ["id", "firstname", "lastname", "email", "phone"],
                  required: false,
                },
              ],
            },


          ],



        },
        {
          model: users,
          as: "restaurentadmin",
          where: { role: "restaurentadmin" },
          attributes: ["id", "firstname", "lastname", "email", "phone", "role"],
          required: false,
        },
        {
          model: users,
          as: "employee",
          where: { role: "employee" },
          attributes: ["id", "firstname", "lastname", "email", "phone", "role"],
          required: false,
        },
      ],

    });

    return restaurent;
  } catch (error) {
    console.error("Error fetching all restaurants with users:", error);
    throw error;
  }
};



export const createRestaurent = async (RestaurentData) => {
  try {
    return await RestaurentModel.create(RestaurentData);
  } catch (error) {
    throw new Error(`Error creating Restaurent: ${error.message}`);
  }
};

export const checkExistingRestaurent = async (name) => {
  return await RestaurentModel.findOne({
    where: {
      name,
    },
  });
};

// export const getAllRestaurentes = async () => {
//   return await RestaurentModel.findAll();
// };

export const deleteOneRestaurent = async (id) => {
  const restToDelete = await RestaurentModel.findOne({ where: { id } });
  if (restToDelete) {
    await RestaurentModel.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await RestaurentModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await RestaurentModel.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

export const activateResto = async (id) => {
  const restoToUpdate = await RestaurentModel.findOne({ where: { id } });
  if (restoToUpdate) {
   const updatedone= await RestaurentModel.update({ status: 'active' }, { where: { id } });
    return updatedone;
  }
  return null;
};

export const deactivateResto = async (id) => {
  const restoToUpdate = await RestaurentModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await RestaurentModel.update({ status: 'inactive' }, { where: { id } });
    return restoToUpdate;
  }
  return null;
};

