import express from "express";
import {
  addCardsController,
  CardsWithAllController,
  deleteOneCardsController,
  getOneCardsController,
  updateOneRestoController,
  Cardsfor1,
  useCardController,
  statistics,
  ReportCardsController,
  MounthReportCardsController

} from "../controllers/CardsController";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.delete("/delete/:id",protect,  deleteOneCardsController);
router.post("/add/",protect,  addCardsController);
router.get("/",protect, CardsWithAllController);
router.get("/mycard/:id",protect, Cardsfor1);
router.get("/one/:id", protect,getOneCardsController);
router.put("/:id", protect,updateOneRestoController);
router.put("/use/:id", protect,useCardController);
router.get("/statistics",protect,statistics);
router.get("/report",protect,ReportCardsController);
router.get("/Mreport/:start/:end",protect,MounthReportCardsController);

// 

export default router;
