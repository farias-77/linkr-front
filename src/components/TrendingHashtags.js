import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TrendignHashtags(){

    const [trendignHashtags, setTrendingHashtags] = useState([]);
    
    useEffect(() => {
        const url = `https://projeto-17-linkr.herokuapp.com/trending`;
        const promise = axios.get(url);

        promise.then((res) => {
            setTrendingHashtags(res.data);
        });

        promise.catch((res) => {
            console.log(res.data);
        })
    }, []);

    return (
        <Container>
            <h4>trending</h4>
            <Line/>
            {
                trendignHashtags.length === 0 ? <></> 
                :
                trendignHashtags.map((value,index)=> <Link style={{textDecoration:"none"}} to={`/hashtag/${value.hashtag}`}><p key={index}># {value.hashtag}</p></Link>)
            }
        </Container>
    )
}

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #484848;

    margin-top: 10px;
    margin-bottom: 12px;
`

const Container = styled.div`
    width: 301px;
    max-height: 406px;
    min-height: 100px;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background-color: #171717;
    border-radius: 16px;

    h4{
        font-family: 'Oswald',sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #ffffff;

        padding-left: 20px;

        margin-top: 5px;
    }

    p{
        font-family: 'Oswald',sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 23px;
        color: #ffffff;

        padding-left: 20px;

        margin-bottom: 8px;

    }

    @media (max-width: 800px){
        display: none;
    }
`;