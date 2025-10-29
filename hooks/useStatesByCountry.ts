import { useEffect, useState } from "react";

interface State {
  name: string;
  state_code: string;
}

interface ApiResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso3: string;
    iso2: string;
    states: State[];
  };
}

export const useStatesByCountry = (country: string) => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!country) return;

    const fetchStates = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ country }),
          },
        );

        const data: ApiResponse = await response.json();

        if (data.error) {
          setError(data.msg || "Error al obtener provincias");
        } else {
          setStates(data.data.states || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [country]);

  return { states, loading, error };
};
