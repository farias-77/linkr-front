import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoTrash } from "react-icons/io5"; 
import { ImPencil } from "react-icons/im";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PostCard({ user, post }){
    const navigate = useNavigate();

    const userUsername = window.localStorage.getItem("username");
    const [ liked, setLiked ] = useState();
    const [ likeCount, setLikeCount ] = useState();

    useEffect(() => {
        if(post.whoLiked.includes(userUsername)){
            setLiked(true);
        }else{
            setLiked(false);
        }

        setLikeCount(post.whoLiked.length);
    }, [])

    function toggleLike(){
        if(liked){
            setLiked(false);
        }else{
            setLiked(true);
        }

        likeOrDislikeInDatabase();
    }

    async function likeOrDislikeInDatabase(){
        const url = `https://projeto-17-linkr.herokuapp.com/like/${post.postId}`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const body = {};
        const promise = axios.post(url, body, config); 
        promise.then((res) => {
            post.whoLiked = res.data;
            setLikeCount(res.data.length);
        })
    }

    let varUserLiked = userLiked();
    function userLiked(){
        const localWhoLiked = post.whoLiked.filter(username => username !== userUsername);

         if(localWhoLiked.length === 0){
            return `Você`;
        }else if(localWhoLiked.length === 1){
            return `Você e ${localWhoLiked[0]}`;
        }else if(localWhoLiked.length >= 2){
            return `Você, ${localWhoLiked[0]} e outras ${localWhoLiked.length-1} pessoas`;
        }
    }

    let varUserDLiked = userDLiked();
    function userDLiked(){

        if(post.whoLiked.length === 1){
            return `${post.whoLiked[0]}`;
        }else if(post.whoLiked.length === 2){
            return `${post.whoLiked[0]} e ${post.whoLiked[1]}`;
        }else if(post.whoLiked.length >= 3){
            return `${post.whoLiked[0]}, ${post.whoLiked[1]} e outras ${post.whoLiked.length-2} pessoas`;
        }      
    }

    return (
        <Container>
           <PictureAndLike>
               <img src={user.profilePicture} alt="profile" />
               {liked ? <IoIosHeart color="#AC0000" onClick={toggleLike}/> : <IoIosHeartEmpty color="#FFFFFF" onClick={toggleLike}/>}
               <p data-tip={(liked ? varUserLiked : varUserDLiked)}>{likeCount} likes</p>
               <ReactTooltip />
           </PictureAndLike>

           <PostContent>
                <div>
                    <h4>{user.username}</h4>
                    <div>
                        <ImPencil/>
                        <IoTrash />
                    </div>
                </div>
                <h5>{post.postText}</h5>
                <UrlPreview>
                    <div>
                        <h3>{post.title}</h3>
                        <h4>{post.description}</h4>
                        <h5>{post.url}</h5>
                    </div>
                    <img src={post.image} alt="metadata image" />
                </UrlPreview>
           </PostContent>
        </Container>
    )
}

const Container = styled.div`
    width: 611px;
    height: 276px;

    background: #171717;
    border-radius: 16px;
    padding: 20px 17px;

    display: flex;
`;

const PictureAndLike = styled.div`
    width: 12%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 10px;

    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        object-fit: cover;
    }

    svg{
       margin-top: 20px;
       font-size: 25px;
       color: ${props => props.color};

       cursor: pointer;
    }

    p {
        margin-top: 5px;
        font-weight: 400;
        font-size: 15px;
        line-height: 13px;
        text-align: center;
        color: #FFFFFF;
    }
`;

const PostContent = styled.div`
    width: 88%;
    height: 100%;
    
    > div {
        display: flex; 
        justify-content: space-between;

        h4{
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #FFFFFF;
        }

        svg{
            font-size: 20px;
            color: white;
            margin-left: 9px;
        }
    }

    h5{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;

        margin-top: 10px;
    }
`;

const UrlPreview = styled.div`
    width: 100%;
    height: 65%;

    border: 1px solid #4D4D4D;
    border-radius: 11px;
    margin-top: 20px;

    img{
        width: 30%;
        height: 100%;
        object-fit: cover;
        border-radius: 0px 12px 13px 0px;
    }

    > div{
        width: 70%;
        height: 100%;
        padding: 15px 0;
        padding-left: 20px;
        padding-right: 5px;

        h3{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;

            color: #CECECE; 

            margin-bottom: 5px;
        }

        h4{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;

            color: #9B9595;

            margin-bottom: 10px;
        }

        h5{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;

            color: #CECECE;
        }
    }
`;