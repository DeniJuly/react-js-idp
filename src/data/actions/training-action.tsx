import { Training } from "@/types/data-types";
import { getCookie } from "@/utils/cookies";
import axios from "axios";

export const addTraining = async (data: Training) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}v1/training/save`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const updTraining = async (data: Training) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}v1/training/update`,
    data,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
};

export const delTraining = async (idTraining: number) => {
  const authToken = await getCookie("token");
  if (!authToken) return { status: 404, data: null, error: null };
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}v1/training/delete/${idTraining}`
  );
};
