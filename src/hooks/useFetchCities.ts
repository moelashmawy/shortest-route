import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { getCities } from "../api";
import { toastr } from "../components/toaster/Toaster";
import { CitiesType } from "../types/cities";

export const useFetchCities = (keyword: string) => {
  const [debouncedkeyword] = useDebounce(keyword, 500);

  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<CitiesType>([]);

  const fetchCities = async (word: string) => {
    setLoading(true);
    try {
      const foundCities = await getCities(word);
      setCities(foundCities);
      setLoading(false);
    } catch (error: any) {
      toastr.error(error, { toastId: "request-error" });
      setCities([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!debouncedkeyword) return;
    fetchCities(debouncedkeyword);
  }, [debouncedkeyword]);

  return { cities, loading };
};
