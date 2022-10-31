import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateDistance } from "../api";
import { toastr } from "../components/toaster/Toaster";
import { DistanceCalculation } from "../types/api";
import { CitiesType } from "../types/cities";
import { arraySum } from "../utils/array";

export const useDistance = (route: string[]) => {
  const [citiesCordinates, setCitiesCordinates] = useState<CitiesType>([]);
  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getDistance = async () => {
    setLoading(true);
    try {
      const payload: DistanceCalculation = await calculateDistance(route);
      const { matchedCities, distanceBetweenCities } = payload;

      const totalDist: number = arraySum(distanceBetweenCities);

      setTotalDistance(totalDist);
      setCitiesCordinates(matchedCities);
      setDistances(distanceBetweenCities);
      setLoading(false);
    } catch (error: any) {
      toastr.error(error, { toastId: error });
      navigate("/notfound");
      setLoading(false);
    }
  };

  useEffect(() => {
    getDistance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, distances, totalDistance, citiesCordinates };
};
