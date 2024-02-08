import express from "express";
import {
  addRestaurentController,
  RestaurentWithAllController,
  deleteOneRestaurentController,
  getOneRestaurentController,
  updateOneRestoController,
  activateRestaurentController,
  deactivateRestaurentController
  

} from "../controllers/RestaurentsController";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.delete("/delete/:id", protect, deleteOneRestaurentController);
router.post("/add/", protect, addRestaurentController);
router.get("/", protect, RestaurentWithAllController);
router.get("/all", protect, RestaurentWithAllController);
router.get("/one/:id", protect, getOneRestaurentController);
router.put("/", protect, updateOneRestoController);
router.put("/activate/:id", protect, activateRestaurentController);
router.put("/disactivate/:id", protect, deactivateRestaurentController);

export default router;
