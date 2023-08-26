// import { Box, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { getAllMovies } from '../../api-helpers/api-helpers'
// import MovieItem from './MovieItem'

// const Movies = () => {
//   const [movies, setMovies] = useState()
//   useEffect(()=>{
//     getAllMovies().then((data)=>setMovies(data.movies)).catch(err=>console.log(err))
//   },[])
//   return (
//     <Box margin={"auto"} marginTop={4}>
//       <Typography variant='h4'margin="auto" textAlign="center" width={"40%"} padding={2} bgcolor={"#900C3F"} color={"white"} textAlign={"center"}>All movies</Typography>
//         <Box marginTop={5} width={"100%"} margin="auto" display="flex" justifyContent={"flex-start"} flexWrap={"wrap"}>
//           {movies && movies.map((item, index)=> <MovieItem key={index} id={item.id} posterUrl={item.posterUrl} releaseDate={item.releaseDate} title={item.title}/>)}
//         </Box>
//     </Box>
//   )
// }

// export default Movies

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;