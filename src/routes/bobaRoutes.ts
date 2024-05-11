import { Router } from "express";
import { getTopBobaShops, getReviewsForShop } from "../services/yelpService";
import { AxiosError } from "axios";

const router = Router();

router.get("/top-shops/:location", async (req, res) => {
  try {
    const location = req.params.location;
    const shops = await getTopBobaShops(location);
    res.json(shops);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      res
        .status(axiosError.response.status)
        .json({ error: axiosError.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

router.get("/reviews/:id", async (req, res) => {
  try {
    const businessId = req.params.id;
    const reviews = await getReviewsForShop(businessId);
    res.json(reviews);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      res
        .status(axiosError.response.status)
        .json({ error: axiosError.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

export default router;
