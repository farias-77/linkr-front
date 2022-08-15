import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import TrendingHashtags from "../TrendingHashtags.js";
import Header from "../Header/Header.js";
import PostCard from "../PostCard.js";

export default function HashtagPage(){
    const { hashtag } = useParams();
    const [ hashtagPosts, setHashtagPosts ] = useState(false);
    const [ refresh, setRefresh ] = useState(0);

    useEffect(() => {
        const url = `https://projeto-17-linkr.herokuapp.com/hashtag/${hashtag}`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get(url, config);

        promise.then((res) => {
            setHashtagPosts(res.data);
        });

        promise.catch((res) => {
            alert(res.data);
        })
    }, [hashtag,refresh]);

    return (
        <>
            <Header />
            <Container>
                <div>
                    <UserInfo>
                        <h2># {hashtag}</h2>
                    </UserInfo>
                    <PageContent>
                        <Feed>
                            {
                                hashtagPosts.length === 0 ? <h4>Ainda não existem posts com essa hashtag,rt seja o primeiro.</h4> :
                                hashtagPosts.map((value,index)=>
                                <PostCard key={index} user={{username: value.username, profilePicture: value.profilePicture}} post={value} refresh={refresh} setRefresh={setRefresh}/>)
                            }
                        </Feed>
                        <TrendingHashtags />
                    </PageContent>
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
    
    > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    @media (max-width: 900px){
        > div {
            width: 100%;
        }
    }
`;

const Feed = styled.div`
    width: 62%;
    margin-right: 30px;

    h4{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 64px;
        color: #FFFFFF;
        text-align: center;
    }

    @media (max-width: 900px){
        width: 100%;
        display: flex;
        flex-direction:column;
        justify-content: center;
        margin: 0;
    }
`;

const UserInfo = styled.div`
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

    @media (max-width: 900px){
        font-size: 33px;
        margin-left: 15px;
    }
`;

const PageContent = styled.div`
    display: flex;
    
    width: 100%;
    justify-content: space-between;
`;