import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import mockSongs from '../../mock/mockSongs'
const useMock = import.meta.env.VITE_USE_MOCK === "true";
const apiKey = import.meta.env.VITE_SHAZAM_API_KEY
console.log("USE MOCK?", import.meta.env.VITE_USE_MOCK)
console.log("API KEY:", import.meta.env.VITE_SHAZAM_API_KEY)
// const options = {
//   method: 'GET',
//   headers: {
//     'x-rapidapi-host': 'shazam-core.p.rapidapi.com',
//     'x-rapidapi-key': '9df702cb6emsh1feb9e52220ee1bp1a5419jsne9ae22121daf'
//   }
// };

// fetch('https://shazam-core.p.rapidapi.com/v1/charts/world?country_code=DZ', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

const mockBaseQuery = async (args) => {
  if (args.endpoint === "getTopCharts") {
    return { data: mockSongs };
  }
  if (args.endpoint === "getSongDetails") {
    return {
      data: mockSongs.find((song) => song.id == args.songid),
    };
  }
  if(args.endpoint === "getArtistDetails") {
    return {
    data:  mockSongs.filter((song) => song.relationships?.artists?.data[0].id == args.artistId)

    }

  }
  if(args.endpoint == "getSongByGenre") {
    if (args.genre == "all") return {data: mockSongs}
    return {
      data: mockSongs.filter((song) => song.attributes?.genreNames[0].toUpperCase() == args.genre.toUpperCase())
    }
  }

  if(args.endpoint == "getSongsBySearch") {
    const bySongName = mockSongs.filter((song) => song.attributes?.name?.toUpperCase().includes(args.searchTerm.toUpperCase()))
    const bySongArtist = mockSongs.filter((song) => song.attributes?.artistName?.toUpperCase().includes(args.searchTerm.toUpperCase()))
    const combined = [...bySongName, ...bySongArtist]
    const unique = [...new Set(combined)]
    return {
      data: unique
    }
  }
  return { error: { status: 404, data: "Not found" } };
};

  export const shazamCoreApi = createApi({
    reducerPath : 'shazamCoreApi',
    baseQuery: useMock? mockBaseQuery: fetchBaseQuery({
      baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
      prepareHeaders: (headers) => {
        
          headers.set('x-rapidapi-key', apiKey),
          headers.set("x-rapidapi-host", "shazam-core.p.rapidapi.com");
        
        return headers;
      }
    }),
    endpoints: (builder) => ({
      getTopCharts: builder.query({query: () => useMock? {endpoint: "getTopCharts"}: '/charts/world?country_code=DZ',
    
    }),

      getSongDetails: builder.query({query: (songid) => useMock? {endpoint: "getSongDetails", songid}: `/tracks/details?track_id=${songid}`, 
    }),
      getArtistDetails: builder.query({query:(artistId) => useMock? {endpoint: "getArtistDetails", artistId}: `/artists/details?artist_id=${artistId}`}),

      getSongsByGenre: builder.query({query: (genre) => useMock? {endpoint: "getSongByGenre", genre}: `/charts/genre-world?genre_code=${genre}`,
    
    }),

    getSongsBySearch: builder.query({query: (searchTerm) => useMock? {endpoint: "getSongsBySearch", searchTerm}: `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    
    }),


      
    }),

    

  });
  export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetArtistDetailsQuery,
    useGetSongsByGenreQuery,
    useGetSongsBySearchQuery
  } = shazamCoreApi