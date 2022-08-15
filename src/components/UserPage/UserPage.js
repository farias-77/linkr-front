import TrendingHashtags from "../TrendingHashtags.js";
import PostCard from "../PostCard.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/Header.js";
import styled from "styled-components";
import axios from "axios";

export default function UserPage(){
    
    const [ userPosts, setUserPosts ] = useState([]);
    const [ userInfo, setUserInfo ] = useState({username: "", profilePicture: ""});
    const [ refresh, setRefresh ] = useState(0);
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
            setUserPosts(res.data.posts);
            setUserInfo({ username: res.data.username, profilePicture: res.data.profilePicture });
        });
        
        promise.catch((res) => {
            console.log(res.data);
        })
    }, [id, refresh]);

    function renderUserPosts(){
        return userPosts.map((post,index) => { return <PostCard key={index} user={userInfo} post={post} refresh={refresh} setRefresh={setRefresh} /> });
    }

    return (
        <>
            <Header />
            <Container>  
                <div>
                    <UserInfo>
                        <img src={userInfo.profilePicture} alt="profile" />
                        <h2>{userInfo.username} 's posts</h2>
                    </UserInfo>
                    <PageContent>
                        <Feed>
                            {userPosts.length > 0 ? renderUserPosts() : <h4>Este usuário ainda não tem nenhum post...</h4> }
                        </Feed>
                        <TrendingHashtags refresh={refresh}/>
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