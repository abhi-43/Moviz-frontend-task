import React, { useState } from "react";
import styled from "styled-components";
import { MovieCreationSharp } from "@mui/icons-material";
import MovieDetails from "./MovieDetails";

const MovieContainer = styled.div`
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  width : 250px;
  height: 362px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieComponent = (props) => {
    const { Title, Year, Type, Poster } = props.movie;
    const [show , setShow] = useState(false);
  return (
    <>
    <MovieContainer
      onClick={() => {
        setShow(!show)
      }}
    >
      <CoverImage src={Poster} alt={Title} />
      <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>

    {<MovieDetails open={show} setOpen={setShow} details={props.movie} />}
    </>
  );
};
export default MovieComponent;