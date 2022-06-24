import React, { useState } from "react";
import styled from "styled-components";


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

const PublicMovieComponent = (props) => {
    const [details, setDetails] = React.useState([])
    React.useEffect(() => {
        let url = `https://www.omdbapi.com/?i=${props.id}&apikey=816f62f1`

            fetch(url).then((req) => {
                return req.json();
            }).then((data) => {
                let s = data
                setDetails(s)
            });
    }, [])

  return (
    <>
    <MovieContainer
    >
      <CoverImage src={details.Poster} alt={details.Title} />
      <MovieName>{details.Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {details.Year}</MovieInfo>
        <MovieInfo>Type : {details.Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>

    </>
  );
};
export default PublicMovieComponent;