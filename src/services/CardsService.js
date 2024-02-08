import db from "../database/models/index.js";
const CardsModel = db["Cards"];
const RestaurentModel = db["Restaurents"];
const CategoryModel = db["Categories"];
const users = db["Users"];
const cardReports = db["cardReports"];


// createCardsReport


export const createCards = async (CardsData) => {
  try {
    return await CardsModel.create(CardsData);
  } catch (error) {
    throw new Error(`Error creating Cards: ${error.message}`);
  }
};

export const createCardsReport = async (CardsData) => {
  try {
    return await cardReports.create(CardsData);
  } catch (error) {
    throw new Error(`Error creating Cards: ${error.message}`);
  }
};

export const checkExistingCards = async (name) => {
  return await CardsModel.findOne({
    where: {
      name,
    },
  });
};

export const Cardsfor1x = async (rest, id) => {
  try {
    const cards = await CardsModel.findAll({
      include: [
        {
          model: users,
          as: "cardUser",
          where: { role: "customer", },
          attributes: ["id", "firstname", "lastname", "email", "phone"],
          required: false, 
        },
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
     
       
      ],
    });
// console.log(id)
// console.log(rest)     &&  rest.categories.restaurent == Number(rest)
const ResArray = Array.isArray(cards) ? cards : [];
const filteredRes = ResArray.find(rest => rest.userid === Number(id));
    return filteredRes;
  } catch (error) {
    console.error("Error fetching all cards with categories:", error);
    throw error;
  }
};





export const getAllCardses = async () => {
  try {
    const cards = await CardsModel.findAll({
      include: [
        {
          model: users,
          as: "cardUser",
          where: { role: "customer" },
          attributes: ["id", "firstname", "lastname", "email", "phone"],
          required: false, 
        },
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
          model: cardReports,
          as: "report",

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


export const deleteOneCards = async (id) => {
  const restToDelete = await CardsModel.findOne({ where: { id } });
  if (restToDelete) {
    await CardsModel.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await CardsModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await CardsModel.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

export const useCard = async (id, resto) => {
  const restoToUpdate = await CardsModel.findOne({ where: { id } });
  if (restoToUpdate) {
    await CardsModel.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

export const getOneCardsWithDetails = async (id) => {
  try {
    return await CardsModel.findByPk(id,{
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
          attributes: ["id", "firstname", "lastname", "email", "phone","image"],
          required: false, 
        },
        {
          model: cardReports,
          as: "report",

          required: false, 
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching campus details:", error);
    throw error; 
  }
};

export const getreport = async (restaurent) => {
  try {
    const reports = await cardReports.findAll();

    return reports; 
  } catch (error) {
    console.error('Error fetching card reports:', error);
    throw error; 
  }
};