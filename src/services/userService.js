import bcrypt from "bcryptjs";
import db from "../database/models/index.js";
const users = db["Users"];
const RestaurentModel = db["Restaurents"];
import Sequelize from "sequelize";


export const updateUserWithRestaurant = async (userId, restaurantId) => {
  try {
    const userToUpdate = await users.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (userToUpdate) {
      await userToUpdate.update({ restaurents: restaurantId });
      const updatedUser = await users.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      return updatedUser;
    }
    

    return null;
  } catch (error) {
    console.error("Error updating user with restaurant:", error);
    throw error;
  }
};
export const createUser = async (user) => {
  // hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser = await users.create(user);
  return newUser;
};



export const createUserCustomer = async (user) => {
  // hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser = await users.create(user);
  return newUser;
};

export const getUser = async (id) => {
  const user = await users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  return user;
};
export const GetUserPassword = async (id) => {
  const user = await users.findByPk(id, {
    attributes: ['password'],
  });
  return user ? user.password : null;
};


export const getUserByEmail = async (email) => {
  try {
    const user = await users.findOne({
      where: { email },
      include: [
        {
          model: RestaurentModel,
          as: "restusers", // Assuming this is the alias used for the Campus association
        },
      ],
    });

    return user;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching user:", error);
    throw error;
  }
};


export const getUserByPhone = async (phone) => {
  try {
    const user = await users.findOne({
      where: { phone }

    });

    return user;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getUsers = async (restaurents, id) => {
  const allUsers = await users.findAll({
    where: {
      restaurents,
      id: {
        [Sequelize.Op.not]: id,
      },
    },
    attributes: { exclude: ["password"] },
  });
  return allUsers;
};


export const getallUsers = async () => {
  const allUsers = await users.findAll({
    // where: { restaurents },
    attributes: { exclude: ["password"] },
  });
  return allUsers;
};



export const updateUser = async (id, user) => {
  const userToUpdate = await users.findOne(
    { where: { id } },
    { attributes: { exclude: ["password"] } }
  );
  if (userToUpdate) {
    await users.update(user, { where: { id } });
    return user;
  }
  return null;
};

export const deleteUser = async (id) => {
  const userToDelete = await users.findOne({ where: { id } });
  if (userToDelete) {
    await users.destroy({ where: { id } });
    return userToDelete;
  }
  return null;
};

export const activateUser = async (id) => {
  const userToActivate = await users.findOne(
    { where: { id } },
    { attributes: { exclude: ["password"] } }
  );
  if (userToActivate) {
    await users.update({ status: "active" }, { where: { id } });
    return userToActivate;
  }
  return null;
};

export const deactivateUser = async (id) => {
  const userToDeactivate = await users.findOne(
    { where: { id } },
    { attributes: { exclude: ["password"] } }
  );
  if (userToDeactivate) {
    await users.update({ status: "inactive" }, { where: { id } });
    return userToDeactivate;
  }
  return null;
};
