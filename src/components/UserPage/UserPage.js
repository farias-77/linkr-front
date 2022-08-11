import TrendingHashtags from "../TrendingHashtags.js";
import RealDataPostCard from "../RealDataPostCard.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/Header.js";
import styled from "styled-components";
import axios from "axios";

export default function UserPage(){
    
    const [ userPosts, setUserPosts ] = useState();
    const { id } = useParams();

    useEffect(() => {
        const url = `https://projeto-17-linkr.herokuapp.com/user/${id}`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get(url, config);
        promise.then((res) => {
            setUserPosts(res.data);
        });
        
        promise.catch((res) => {
            console.log(res.data);
        })
    }, []);

    return (
        <>
            <Header />
            <Container>
                <UserInfo>
                    <img src="https://www.lance.com.br/files/article_main/uploads/2022/07/02/62c0dbbed1a02.jpeg" alt="profile" />
                    <h2>Gabriel Barbosa's posts</h2>
                </UserInfo>
                <div>
                    <Feed>
                        <RealDataPostCard profilePicture={"https://www.lance.com.br/files/article_main/uploads/2022/07/02/62c0dbbed1a02.jpeg"} username={"Gabi"} postText={"Guardei dois ontem"} url={"https://en.wikipedia.org/wiki/Gabriel_Barbosa"} />
                    </Feed>
                    {/* <TrendingHashtags /> */}
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 100px;           

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Feed = styled.div`
    width: 62%;
    height: 200px;

    @media (max-width: 700px){
        width: 100%;
    }
`;

const UserInfo = styled.div`
    width: 50%;

    margin-top: 50px;
    margin-bottom: 30px;

    display: flex;
    align-items: center;
    
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;


    img{
        width: 50px;
        height: 50px;
        
        border-radius: 26.5px;
        object-fit: cover;
        margin-right: 20px;
    }

    @media (max-width: 700px){
        width: 100%;
        justify-content: center;
    }
`;