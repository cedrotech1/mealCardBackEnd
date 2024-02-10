// CardsController.js
import {
  createCards,
  getAllCardses,
  deleteOneCards,
  checkExistingCards,
  getOneCardsWithDetails,
  updateOneResto,
  Cardsfor1x,
  useCard,
  createCardsReport,
  getreport
  
} from "../services/CardsService";
import {getallUsers} from "../services/userService";
import {getAllRestaurentes} from "../services/RestaurentService";
import {  getAllCategories} from "../services/categoriesService";



export const statistics = async (req, res) => {
  let countUser,resto,emp,cats,cads,rests,admin,activeEmp,disactiveEmp;

  try {
    let cards = await getAllCardses();
    let users = await getallUsers();
    let Restaurentes = await getAllRestaurentes();
    let categories = await getAllCategories();

    // Check if the user is unauthorized (customer or employee)
    if (req.user.role === "customer" || req.user.role === "employee") {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (req.user.role === "restaurentadmin") {
      

      let empls= users.filter(emp => emp.role==='employee' && emp.restaurents==req.user.restaurents)
      emp= empls.length;

      let fcats= categories.filter(cat => cat.restaurent==req.user.restaurents)
      cats= fcats.length;

      let filterCards= cards.filter(cards => cards.categories.restaurent==req.user.restaurents)
      cads= filterCards.length;

      let act= users.filter(emp => emp.status==='active' &&  emp.role==='employee' && emp.restaurents==req.user.restaurents)
      activeEmp= act.length;

      let dis= users.filter(emp => emp.status==='inactive' &&  emp.role==='employee' && emp.restaurents==req.user.restaurents)
      disactiveEmp= dis.length;  
    }


    if (req.user.role === "superadmin") {
      countUser= users.length;
      rests= Restaurentes.length;

      let act= users.filter(emp => emp.status==='active' &&  emp.role==='restaurentadmin')
      activeEmp= act.length;

      let dis= users.filter(emp => emp.status==='inactive' &&  emp.role==='restaurentadmin')
      disactiveEmp= dis.length;
    }

    resto = {
      employees: emp,
      categories: cats,
      cards: cads,
      actives: activeEmp,
      disactives: disactiveEmp,
    };

     admin = {
      users: countUser-1,
      restaurants: rests,
      actives: activeEmp,
      disactives: disactiveEmp,
 
    };

    return res.status(200).json({
      success: true,
      message: "Statistics retrieved successfully",
      data:{
        resto,
         admin,
      }
     
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};





export const useCardController = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getOneCardsWithDetails(id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    // if (!card.data || !card.data.categories) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid card data structure",
    //   });
    // }

    const { times, userid, data } = card;
    const { use } = req.body;

    if (times < use) {
      return res.status(404).json({
        success: false,
        message: `Your card cannot support ${use} plate(s)`,
      });
    }

    const updatedTimes = times - use;
    req.body.times = updatedTimes;
    req.body.userid = userid;

    // const resto = req.user.restaurants;
    let price;
    let unp=card.categories.price/60;
    price=Math.floor(unp*use);
    const customernames =  `${card.cardUser.firstname} ${card.cardUser.lastname}` ;
    const catname = card.categories.name;
    console.log(catname)

    
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12; 
    const formattedMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const formattedSeconds = currentDate.getSeconds().toString().padStart(2, '0');
    
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    

    const obj = {
      cardid: req.params.id,
      plates: use,
      date: formattedDate,
      time: formattedTime,
      restaurent: req.user.restaurents,
      categoryname: catname,
      price: price,
      customernames: customernames,
      status: 'used',
    };

    const updatedCard = await useCard(req.params.id, req.body);
    const report = await createCardsReport(obj);

    if (!updatedCard) {
      return res.status(404).json({
        success: false,
        message: "Resto not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Card Checked successfully",
      Resto: updatedCard,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const addCardsController = async (req, res) => {
  let role = req.user.role;

  if (!role === "employee") {
      return res.status(400).json({
        success: false,
        message: "you are not allowed to add card for customers ",
      });
    
  }



  
  try {
    // if (req.user.role !== "superadmin") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized, you are not superadmin",
    //   });
    // }

    // req.body.name = req.body.name.toUpperCase();

    if (!req.body.duration) {
      return res.status(400).json({
        success: false,
        message: "duration is required",
      });
    }

    // const existingCards = await checkExistingCards(req.body.name);
    // if (existingCards) {
    //   console.log("Cards with the same name already exists ");
    //   return res.status(400).json({
    //     success: false,
    //     message: "Cards with the same name already exists ",
    //   });
    // }
    
    

    const newCards = await createCards(req.body);
    return res.status(201).json({
      success: true,
      message: "Cards created successfully",
      Cards: newCards,
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

export const CardsWithAllController = async (req, res) => {
  try {
    const data1 = await getAllCardses();
    if (!data1) {
      return res.status(404).json({
        message: "Cards not found",
      });
    }
    let data= data1.filter(cards => cards.categories.restaurent==req.user.restaurents)

    return res.status(200).json({
      success: true,
      message: "Cards retrieved successfully",
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

// export const CustomerCards = async (req, res) => {
//   try {
//     const data = await CustomerCard(req.user.restaurents,id);
//     if (!data) {
//       return res.status(404).json({
//         message: "Cards not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Cards retrieved successfully",
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Something went wrong",
//       error,
//     });
//   }
// };



export const Cardsfor1 = async (req, res) => {
  // const { id } = req.params; req.user.restaurents,id
  try {
    const { id } = req.params;
    const Cardsesa = await getAllCardses();
    // const cardsForUserId5 = Cardses.filter(card => card.userid == id && card.categories.restaurent==req.user.restaurents );
    const Cardses1= Cardsesa.filter(card => card.userid == id );
  let Cardses;
if(req.user.role=='employee'){

  if (Array.isArray(Cardses1)) {
    Cardses = Cardses1.filter(card =>  card.categories.restaurent == req.user.restaurents );
  } else {
    Cardses = Cardses1;
  }
}
if(req.user.role=='customer'){
    Cardses = Cardses1;
  }
    console.log(req.user.restaurents)
    console.log(id)
    return res.status(200).json({
      success: true,
      message: "Cardses retrieved successfully",
      Cardses,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const deleteOneCardsController = async (req, res) => {
  try {
    // if (req.user.role !== "superadmin") {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Not authorized, you are not superadmin",
    //   });
    // }

    const Cards = await deleteOneCards(req.params.id);
    if (!Cards) {
      return res.status(404).json({
        success: false,
        message: "Cards not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cards deleted successfully",
      Cards,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const updateOneRestoController = async (req, res) => {
  try {
    const updatedResto = await updateOneResto(req.params.id, req.body);
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
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};



export const getOneCardsController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const data1 = await getOneCardsWithDetails(id);

    if (!data1) {
      return res.status(404).json({
        message: "card not found",
      });
    }

    let data;
    if (Array.isArray(data1)) {
      data = data1.filter(card => card.userid == id);
    } else {
      data = data1;
    }

    return res.status(200).json({
      success: true,
      message: "card retrieved successfully",
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




export const ReportCardsController = async (req, res) => {
  try {
    const { id } = req.params;
    const data1 = await getreport(req.user.restaurents);

    if (!data1) {
      return res.status(404).json({
        message: "card not found",
      });
    }

    let data;
    if (Array.isArray(data1)) {
      data = data1.filter(card => card.restaurent == req.user.restaurents);
    } else {
      data = data1;
    }

    return res.status(200).json({
      success: true,
      message: "report retrieved successfully",
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

export const MounthReportCardsController = async (req, res) => {
  try {
    

    // If using query parameters, update the destructuring


    const data1 = await getreport(req.user.restaurents);

    // let start=req.body.start;
    // let end=req.body.start;

    if (!data1) {
      return res.status(404).json({
        message: "card not found",
      });
    }


    let start = req.params.start;
    let end = req.params.end;
    // console.log(start)

    // const { start } = req.params;
    console.log(start)
    console.log(end)




    let data;
    if (Array.isArray(data1)) {
      // data = data1.filter(card => card.restaurent == req.user.restaurents);
      data = data1.filter(card => card.restaurent == req.user.restaurents && card.date >= start && card.date <= end);
    } else {
      data = data1;
    }

    return res.status(200).json({
      success: true,
      message: "report retrieved successfully",
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



// postgres://mealcard_user:WqqO7ZUCXYcrX2YcHrWKocbyyckvMwwX@dpg-cn2csked3nmc739cftf0-a.oregon-postgres.render.com/mealcard