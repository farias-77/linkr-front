import background from "../../assets/background_e7e7e7.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function UserOption({user, isUser}){
    const navigate = useNavigate();

    function redirectUserPage(){
        if(user.id){
            navigate("/user/" + user.id);
            return;
        }
        return;
    }
    
    return (
        <Container onClick={redirectUserPage}>
            {isUser ? <img src={user.profilePicture} alt="profile" /> : <img src={background} alt="empty" />}
            {isUser ? <h4>{user.username}</h4> : <div><h4>Nenhum usuário encontrado...</h4></div>}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: flex;
    align-items: center;

    padding: 10px 0;
    padding-left: 10px;
    
    border-radius: 8px;
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
`;