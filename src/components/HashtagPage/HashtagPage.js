import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDots } from  'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroller';

import TrendingHashtags from "../TrendingHashtags.js";
import Header from "../Header/Header.js";
import PostCard from "../PostCard.js";

export default function HashtagPage(){
    const { hashtag } = useParams();
    const [ hashtagPosts, setHashtagPosts ] = useState([]);
    const [ firstHashtagPosts, setFirstHashtagPosts ] = useState([]);
    const [ stop, setStop ] = useState(false);
    const [ refresh, setRefresh ] = useState(0);
    const [ loading, setLoading ] = useState(true);

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
            setFirstHashtagPosts(res.data);
            setLoading(false);
        });

        promise.catch((res) => {
            alert(res.data);
        })
    }, [hashtag,refresh]);

    useEffect(()=>{
        getMorePosts(1);
    },[firstHashtagPosts])

    function getMorePosts(limit){
        const realLimit = (limit)*10;
        if(firstHashtagPosts.length !== 0){
            if(realLimit - firstHashtagPosts.length >= 10){
                setStop(true);
            }
        }
        setHashtagPosts(firstHashtagPosts.slice(0,realLimit));
    }
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
                                loading ? <ThreeDots
                                        height="200"
                                        width="150"
                                        color='white'
                                        ariaLabel='loading'
                                        />
                                :
                                loading === 0 ? <p style={{fontSize:"24px", color:"#ffffff", textAlign:"center"}}>An error ocurred while trying to fetch the posts, please refresh the page.</p>
                                :
                                <Posts posts={hashtagPosts} refresh={refresh} setRefresh={setRefresh} getMorePosts={getMorePosts} stop={stop}/>
                            }
                        </Feed>
                        <TrendingHashtags />
                    </PageContent>
                </div>
            </Container>
        </>
    )
}


function Posts({posts, refresh, setRefresh, getMorePosts, stop}){
    console.log(posts)
    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
     };
return(
    <>
        {
            !stop ? 
                <InfiniteScroll
                pageStart={0}
                loadMore={getMorePosts}
                hasMore={true || false}
                loader={<ThreeDots
                    height="200"
                    width="150"
                    color='white'
                    ariaLabel='loading'
                    />}
                >
                {
                    posts.length === 0 ? <p style={{fontSize:"24px", color:"#ffffff", textAlign:"center"}}>There are no posts yet.</p> :
                    posts.map((value,index)=>
                    <PostCard key={index} user={{username: value.username, profilePicture: value.profilePicture}} post={value} refresh={refresh} setRefresh={setRefresh}/>)
                }
                </InfiniteScroll>
                :
                <>
                    {
                        posts.length === 0 ? <p style={{fontSize:"24px", color:"#ffffff", textAlign:"center"}}>There are no posts yet.</p> :
                        posts.map((value,index)=>
                        <PostCard key={index} user={{username: value.username, profilePicture: value.profilePicture}} post={value} refresh={refresh} setRefresh={setRefresh}/>)
                    }
                    <p style={{fontSize:"24px", color:"#ffffff", textAlign:"center", marginBottom:"50px"}}>Congratulations you saw it all!</p>
                    <p onClick={scrollTop} style={{fontSize:"24px", color:"#ffffff", textAlign:"center", marginBottom:"50px", cursor:"pointer"}}>Back to the top!</p>
                </>
        }
        
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