import axios from "axios";

const YELP_API_KEY = process.env.YELP_API_KEY;
const API_ENDPOINT = "https://api.yelp.com/v3";

export const getTopBobaShops = async (location: string) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/businesses/search`, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        term: "boba tea",
        location: location,
        sort_by: "rating",
        limit: 10,
      },
    });
    return response.data.businesses;
  } catch (error) {
    console.error("Error fetching top boba shops:", error);
    throw error;
  }
};

export const getReviewsForShop = async (businessId: string) => {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/businesses/${businessId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      }
    );
    return response.data.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
