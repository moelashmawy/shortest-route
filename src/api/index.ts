import { cities as mockedCities } from "../mocked-data/cities";
import { DistanceCalculation } from "../types/api";
import { CityType, CitiesType } from "../types/cities";
import { haversineDistance } from "../utils/distance";

const getCities = (keyword: string) => {
  const matchedCities: CitiesType = mockedCities.filter(
    ([cityName]: CityType) => cityName.toLocaleLowerCase().includes(keyword)
  );

  return new Promise<CitiesType>((resolve, reject) => {
    setTimeout(() => {
      if (keyword === "fail") {
        reject("API failed, please try again!");
      }

      resolve(matchedCities);
    }, 500);
  });
};

const calculateDistance = (citiesList: string[]) => {
  const matchedCities: CitiesType = [];
  const distanceBetweenCities: number[] = [];

  citiesList.forEach((cityName: string, idx: number) => {
    const foundCity: CityType = mockedCities.find(
      ([name]: CityType) => name === cityName
    ) || ["", 1, 1];

    matchedCities.push(foundCity);

    if (idx !== 0) {
      const [, lat1, lon1] = matchedCities[idx];
      const [, lat2, lon2] = matchedCities[idx - 1];

      const firstCity = [lat1, lon1];
      const secondCity = [lat2, lon2];
      const dist = haversineDistance(firstCity, secondCity);

      distanceBetweenCities.push(dist);
    }
  });

  const payload = { matchedCities, distanceBetweenCities };

  return new Promise<DistanceCalculation>((resolve, reject) => {
    setTimeout(() => {
      if (citiesList.includes("Dijon")) {
        reject("Dijon has failed, please try another city!");
      }

      resolve(payload);
    }, 5000);
  });
};

export { getCities, calculateDistance };
