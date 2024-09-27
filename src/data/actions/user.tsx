import { getCookie } from "@/utils/cookies";
import axios from "axios";
export const getProfile = async () => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}user/detail-profile`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    return { status: 400, data: null, error: null };
  }
};
