import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function UserOption({ user, isLastOption, setShowOptions, userFollows }){
    const navigate = useNavigate();

    function redirectUserPage(){
        if(user.id){
            setShowOptions(false);
            navigate("/user/" + user.id);
            return;
        }
        return;
    }
    
    function returnUsernameComplement(){
        return (userFollows.find(userFollowed => userFollowed.followedId === user.id) ? <span>• following</span>  : <span></span> )
    }

    return (
        <Container onClick={redirectUserPage} border={isLastOption ? "0px 0px 8px 8px" : "0px 0px 0px 0px" }>
            <img src={user.profilePicture} alt="profile" />
            <h4>{user.username} {returnUsernameComplement()}</h4>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: flex;
    align-items: center;

    padding: 10px 0;
    padding-left: 10px;
    
    border-radius: ${props => props.border};
    background-color: #E7E7E7;

    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        object-fit: cover;
    }

    h4{
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;

        margin-left: 10px;
        
    }

    &:hover{
        cursor: pointer;
        background-color: #c1c1c1;
    }

    > div{
        margin-left: 7%;
    }

    span{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 23px;
        color: #C5C5C5;
  }
`;

