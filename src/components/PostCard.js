import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoTrash } from "react-icons/io5"; 
import { ImPencil } from "react-icons/im";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PostCard({ user, post, refresh, setRefresh }){
    const navigate = useNavigate();

    const userUsername = window.localStorage.getItem("username");
    const [ liked, setLiked ] = useState();
    const [ likeCount, setLikeCount ] = useState();
    const [ displayDeleteModal, setDisplayDeleteModal] = useState("display: none;");

    useEffect(() => {
        if(post.whoLiked.includes(userUsername)){
            setLiked(true);
        }else{
            setLiked(false);
        }
        
        const url = `https://projeto-17-linkr.herokuapp.com/like/${post.postId}`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get(url, config);
        promise.then((res) => {
            setLikeCount(res.data.length);
            post.whoLiked = res.data;
        })
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

    function userDLiked(){

        if(post.whoLiked.length === 1){
            return `${post.whoLiked[0]}`;
        }else if(post.whoLiked.length === 2){
            return `${post.whoLiked[0]} e ${post.whoLiked[1]}`;
        }else if(post.whoLiked.length >= 3){
            return `${post.whoLiked[0]}, ${post.whoLiked[1]} e outras ${post.whoLiked.length-2} pessoas`;
        }      
    }

    function navigateToHashtag(word){
        const index = word.indexOf("#")
        if(index === 0){
            const hashtag = word.slice(1);
            navigate(`/hashtag/${hashtag}`);
        }
    }

    function toggleShowDeleteModal(){
        if(displayDeleteModal === "display: flex;"){
            setDisplayDeleteModal("display: none;");
        }else{
            setDisplayDeleteModal("display: flex;");
        }
    }

    function deletePost(){
        const url = `https://projeto-17-linkr.herokuapp.com/delete-post/${post.postId}`
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.delete(url, config);      
        promise.then(() => {
            toggleShowDeleteModal();
            setRefresh(refresh+1);
        });

        promise.catch(() => {
            alert("Não foi possível deletar o post :(");
        })
    }

    return (
        <>
            <Container>
                <PictureAndLike>
                    <img src={user.profilePicture} alt="profile" />
                    {liked ? <IoIosHeart color="#AC0000" onClick={toggleLike}/> : <IoIosHeartEmpty color="#FFFFFF" onClick={toggleLike}/>}
                    <p data-tip={(liked ? userLiked() : userDLiked())}>{likeCount} likes</p>
                    <ReactTooltip />
                </PictureAndLike>

                <PostContent>
                        <div>
                            <h4 onClick={()=>{navigate(`/user/${post.userId}`)}}>{user.username}</h4>
                            {user.username === window.localStorage.getItem("username") ?
                                <div>
                                    <ImPencil/>
                                    <IoTrash onClick={toggleShowDeleteModal}/>
                                </div>
                                :
                                <></>
                            }
                        </div>
                        <InteractableText text={post.postText} navigateToHashtag={navigateToHashtag}/>
                        <a href={post.url} target="_blank">
                            <UrlPreview>
                                <div>
                                    <h3>{post.title}</h3>
                                    <h4>{post.description}</h4>
                                    <h5>{post.url}</h5>
                                </div>
                                <img src={post.image} alt="metadata image" />
                            </UrlPreview>
                        </a>
                </PostContent>
            </Container>
            <WhiteBackground display={displayDeleteModal}>
                <DeleteModal>
                    <p>Are you sure you want<br/>to delete this post?</p>
                    <div>
                        <Button color="#FFFFFF" background="#1877F2" onClick={toggleShowDeleteModal}>No, go back</Button>
                        <Button color="#1877F2" background="#FFFFFF" onClick={deletePost}>Yes, delete it</Button>
                    </div>
                </DeleteModal>
            </WhiteBackground>
        </>
    )
}

const Container = styled.div`
    width: 611px;
    height: 276px;

    background: #171717;
    border-radius: 16px;
    padding: 20px 17px;

    display: flex;

    margin-bottom: 20px;

    @media (max-width: 900px){
        width: 100%;
        border-radius: 0;
    }
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

    @media (max-width: 900px){
        p{
            line-height: 18px;
        }

    }
`;

const PostContent = styled.div`
    width: 88%;
    height: 100%;
    
    > div {
        display: flex; 
        justify-content: space-between;
        margin-bottom: 10px;

        h4{
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #FFFFFF;
            cursor: pointer;
        }

        svg{
            font-size: 20px;
            color: white;
            margin-left: 9px;
            cursor: pointer;
        }
    }

    span{
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;

        margin-top: 30px;
        cursor: pointer;
    }

    p{
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;

        margin-top: 30px;

        display: inline;
    }
`;

const UrlPreview = styled.div`
    width: 100%;
    height: 65%;

    border: 1px solid #4D4D4D;
    border-radius: 11px;
    margin-top: 20px;

    display: flex;

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

    &:hover{
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 900px) {
        height: 70%;

        > div{
            padding-left: 10px;
        }
    }
`;

function InteractableText({text,navigateToHashtag}){

    function isHashtag(word){
        const index = word.indexOf("#");
        if(index === 0){
            return true;
        }
        else{
            return false;
        }
    }

    return(
        <>
            {
                text === null ? <></> :

                text.split(' ').map((word,index) => 
                {
                    return (
                        <>
                            {
                                isHashtag(word) ? 
                                <span key={index} style={{fontWeight:700}} onClick={() => navigateToHashtag(word)}>{word}&nbsp;</span>
                                :
                                <p key={index}>{word}&nbsp;</p>
                            }
                        </>
                    )
                })
            }
        </>
    )
} 

const WhiteBackground = styled.div`
    ${props => props.display}
    
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 3;

    justify-content: center;
    align-items: center;
`;

const DeleteModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    z-index: 4;

    width: 597px;
    height: 262px;

    background-color: #333333;
    border-radius: 50px;

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;

        color: #FFFFFF;
    }

    > div {
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin-top: 45px;
    }
`;

const Button = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;

    width: 134px;
    height: 37px;

    display: flex;
    justify-content: center;
    align-items: center;
    
    border-radius: 5px;
    background-color: ${props => props.background};
    color: ${props => props.color};

    cursor: pointer;
`;