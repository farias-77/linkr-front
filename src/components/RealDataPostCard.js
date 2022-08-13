import { IoIosHeart,IoIosHeartEmpty } from "react-icons/io";
import { IoTrash } from "react-icons/io5"; 
import { ImPencil } from "react-icons/im";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactTooltip from "react-tooltip";

export default function RealDataPostCard({profilePicture,username,postText,postId,url,numLikes,whoLiked,refresh,setRefresh}){
    
    const navigate = useNavigate();

    function navigateToHashtag(word){
        const index = word.indexOf("#")
        if(index === 0){
            const hashtag = word.slice(1);
            navigate(`/hashtag/${hashtag}`);
        }
    }
    async function likeOrDislike(postId){
        const url = `http://localhost:5000/like/${postId}`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const body ={}
        await axios.post(url, body, config);
        setRefresh(refresh+1);        
    }
    
    const userUsername = "Dimitri";
    let isLiked;
    if(whoLiked.length === 0){
        isLiked = false;
    }else{
        isLiked = whoLiked.includes(userUsername);
    }
    
    return (
        <Container>
            <PostInfo>
                <img src={profilePicture} alt="profile" />
                <InteractableLike isLiked={isLiked} postId={postId} likeOrDislike={likeOrDislike} whoLiked={whoLiked} numLikes={numLikes}/>
                <h4>{numLikes} likes</h4>
            </PostInfo>
            <PostContent>
                <PostCardHeader>
                    <h4>{username}</h4>
                    <div>
                        <ImPencil />
                        <IoTrash />
                    </div>
                </PostCardHeader>
                <InteractableText text={postText} navigateToHashtag={navigateToHashtag}/>
                <p>{url}</p>
            </PostContent>
        </Container>
    )
}

function InteractableLike({isLiked,postId,likeOrDislike,whoLiked,numLikes}){
    if(isLiked){
        let text = ""
        console.log(numLikes)
        if(numLikes===1){
            text = "Você curtiu"
        }else{
            if(numLikes===2){
                text = `Você e ${whoLiked[1]} curtiram`
            }
            else{
                text = `Você, ${whoLiked[1]} e mais ${numLikes-2} curtiram`
            }
        }
        
        return(
            <>
                <IoIosHeart 
                data-tip data-for="likeTip"
                onClick={()=>{likeOrDislike(postId)}} 
                style={{color:'#AC0000',fontSize:30}}/>
                <ReactTooltip id={"likeTip"} place={"bottom"} effect="solid">
                    {text} 
                </ReactTooltip>
            </>
        )
    }else{
        let text = ""
        if(numLikes===0){
            text = "Seja o primeiro a curtir!"
        }else{
            if(numLikes===1){
                text = `${whoLiked[0]} curtiu`
            }else{
                if(numLikes===2){
                    text = `${whoLiked[0]} e ${whoLiked[1]} curtiram`
                }
                else{
                    text = `${whoLiked[0]}, ${whoLiked[1]} e mais ${numLikes-2} curtiram`
                }
            }
        }
        return(
            <>
                <IoIosHeartEmpty 
                data-tip data-for="likeTip"
                onClick={()=>{likeOrDislike(postId)}} 
                style={{color:'white',fontSize:30}}/>
                <ReactTooltip id={"likeTip"} place={"bottom"} effect="solid">
                    {text} 
                </ReactTooltip>
            </>
        )
    }
}

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
                text.split(' ').map((word,index) => 
                {
                    return (
                        <>
                            {
                                isHashtag(word) ? 
                                <span style={{fontWeight:700}} key={index} onClick={() => navigateToHashtag(word)}>{word}&nbsp;</span>
                                :
                                <span ket={index}>{word}&nbsp;</span>
                            }
                        </>
                    )
                })
            }
        </>
    )
} 

const Container = styled.div`
    width: 611px;
    height: 276px;
    padding: 20px;

    background-color: #171717;
    border-radius: 16px;

    display: flex;

    margin-bottom: 30px;
`;

const PostInfo = styled.div`
    width: 14%;
    height: 50%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        object-fit: cover;
    }

    svg{
        font-size: 25px;
        margin-top: 15px;

        cursor: pointer;
    }

    h4{
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #FFFFFF;
    }
`;

const PostContent = styled.div`
    width: 86%;
    height: 100%;

    p{
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;

        margin-top: 20px;
    }
    span{
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;

        margin-top: 30px;
    }
`;

const PostCardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    h4{
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }

    svg{
        color: white;
        font-size: 20px;
        margin-left: 10px;

        cursor: pointer;
    }
`;