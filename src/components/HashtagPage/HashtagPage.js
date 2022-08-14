import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../Header/Header.js";
import RealDataPostCard from "../RealDataPostCard.js";

export default function HashtagPage(){
    const { hashtag } = useParams();
    const [ hashtagPosts, setHashtagPosts ] = useState([]);
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
                <UserInfo>
                    <h2># {hashtag}</h2>
                </UserInfo>
                <div>
                    {/* <Feed>
                        {
                            (hashtagPosts.length === 0) ? <p>Ainda não existem posts com essa hashtag seja o primeiro.</p> :
                            hashtagPosts.map((value,index)=>
                            <RealDataPostCard key={index} userId={value.userId} username={value.username} profilePicture={value.profilePicture} postText={value.postText} postId={value.postId} url={value.url} numLikes={value.numLikes} whoLiked={value.whoLiked}
                            refresh={refresh} setRefresh={setRefresh}/>)
                        }
                    </Feed> */}
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
`;

const Feed = styled.div`
    width: 62%;
    height: 200px;

    >p{
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        text-align: center;
        color: #FFFFFF;
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
`;