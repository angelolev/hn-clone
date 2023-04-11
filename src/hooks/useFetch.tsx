import { useState, useEffect } from "react";
import { IHit } from "../types";
import { transformData } from "../utils";

export const useFetch = (query: string, page: number) => {
  const [hits, setHits] = useState<IHit[]>([]);

  const fetchHits = async () => {
    try {
      const response = await fetch(
        `/api/v1/search_by_date?query=${query}&page=${page}`
      );
      const { hits } = await response.json();

      return transformData(hits);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch hits: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const getHits = async () => {
      const data = await fetchHits();
      setHits((prev) => [...prev, ...data!]);
    };
    getHits();
  }, [page]);

  useEffect(() => {
    const updateHits = async () => {
      const hits = await fetchHits();
      setHits([...hits!]);
    };
    updateHits();
  }, [query]);

  return {
    hits,
  };
};
