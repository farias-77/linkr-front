import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/Header.js";
import styled from "styled-components";
import PostCard from "../PostCard.js";
import axios from "axios";

export default function UserPage(){
    const { id } = useParams();
    const [ userPosts, setUserPosts ] = useState();

    useEffect(() => {
        const url = `https://projeto-17-linkr.herokuapp.com/user/${id}`;
        const token = localStorage.getItem("token");
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
                        <PostCard />
                    </Feed>
                    <Trending>

                    </Trending>
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 72px;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    > div:last-child {
        width: 50%;
        display: flex;
        justify-content: space-between;
    }
`;

const Feed = styled.div`
    width: 62%;
    height: 200px;
`;

const Trending = styled.div`
    width: 301px;
    height: 406px;
    left: 877px;
    top: 232px;

    background: #171717;
    border-radius: 16px;
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
`;