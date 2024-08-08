import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface StarWarsPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

export const ApiService = createApi({
  reducerPath: 'ApiService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<{ results: StarWarsPerson[] }, string>({
      query: (searchTerm = '') => `people/?search=${searchTerm}`,
    }),
  }),
});

export const { useGetPeopleQuery } = ApiService;
