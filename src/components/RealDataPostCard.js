import { IoIosHeart } from "react-icons/io";
import { IoTrash } from "react-icons/io5"; 
import { ImPencil } from "react-icons/im";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function RealDataPostCard({profilePicture,username,postText,url}){
    
    const navigate = useNavigate();
    const num = 9;

    function navigateToHashtag(word){
        const index = word.indexOf("#")
        if(index === 0){
            const hashtag = word.slice(1);
            navigate(`/hashtag/${hashtag}`);
        }
    }

    return (
        <Container>
            <PostInfo>
                <img src={profilePicture} alt="profile" />
                <IoIosHeart />
                <h4>{num} likes</h4>
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
        color: #AC0000;
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