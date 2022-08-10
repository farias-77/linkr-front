import { useParams } from "react-router-dom";
import styled from "styled-components";
import RealDataPostCard from "../RealDataPostCard.js";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HashtagPage(){
    const { hashtag } = useParams();
    const [ hashtagPosts, setHashtagPosts ] = useState();

    useEffect(() => {
        const url = `https://projeto-17-linkr.herokuapp.com/${hashtag}`;
        const promise = axios.get(url);

        promise.then((res) => {
            setHashtagPosts(res.data);
        });

        promise.catch((res) => {
            alert(res.data);
        })
    }, []);

    console.log(hashtagPosts)
    return (
        <Container>
            <UserInfo>
                <h2># {hashtag}</h2>
            </UserInfo>
            <div>
                <Feed>
                    {
                        hashtagPosts === undefined ? <p>Ainda não existem posts com essa hashtag seja o primeiro.</p> :
                        hashtagPosts.map((value,index)=><RealDataPostCard key={index} username={value.username} profilePicture={value.profilePicture} postText={value.postText} url={value.url}/>)
                    }
                </Feed>
            </div>
        </Container>
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