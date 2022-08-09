import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/logo.png";
import styled from "styled-components";
import { useState } from "react";

export default function Header(){
    const [ displayControl, setDisplayControl ] = useState("display: none;");
    
    function toggleDisplayControl(){
        if(displayControl === "display: none;"){
            setDisplayControl("");
        }else{
            setDisplayControl("display: none;");
        }
        console.log(displayControl)
    }

    function exit(){
        console.log("Função para deslogar usuário!!!");
    }

    return (
        <Container>
            <HeaderContainer>
                <img src={logo} alt="page logo" />
                <input placeholder="Search for people"></input>
                <Logout>
                    <IoIosArrowDown onClick={toggleDisplayControl}/>
                    <img src="https://www.lance.com.br/files/article_main/uploads/2022/07/02/62c0dbbed1a02.jpeg" alt="profile picture" />
                </Logout>
                <LogoutButton display={displayControl} onClick={exit}><h4>Logout</h4></LogoutButton>
            </HeaderContainer>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
`;

const HeaderContainer = styled.div`
    position: relative;
    z-index: 1;

    width: 100%;
    height: 72px;
    padding: 0 17px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        height: 30px;
    }

    input{
        width: 35%;
        height: 45px;
        background: #FFFFFF;
        border-radius: 8px;
        padding-left: 15px;

        ::placeholder{
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            color: #C6C6C6;
        }
    }

    h4{
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }

    background-color: #151515;
`;

const Logout = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    svg{
        color: white;
        font-size: 25px;
        margin-right: 15px;

        cursor: pointer;
    }

    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        object-fit: cover;
    }
`;

const LogoutButton = styled.div`
    width: 7%;
    height: 47px;
    
    ${props => props.display};

    position: absolute;
    top: 68px;
    right: 0;
    z-index: 0;

    background: #171717;
    border-radius: 0px 0px 0px 20px;

    h4{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;