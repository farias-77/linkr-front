import { DebounceInput } from "react-debounce-input";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserOption from "./UserOption.js";
import logo from "../../assets/logo.png";
import styled from "styled-components";
import axios from "axios";

export default function Header(){
    
    const [ displayLogoutControl, setDisplayLogoutControl ] = useState("display: none;");
    const [ searchInput, setSearchInput ] = useState("");
    const [ usersList, setUsersList ] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const url = "https://projeto-17-linkr.herokuapp.com/users";
        const promise = axios.get(url);

        promise.then((res) => {
            setUsersList(res.data);
        });

        promise.catch(() => {
            console.log("Algo deu errado, por favor tente novamente.");
        })

    }, []);

    function toggleDisplayLogoutControl(){
        if(displayLogoutControl === "display: none;"){
            setDisplayLogoutControl("");
        }else{
            setDisplayLogoutControl("display: none;");
        }
    }

    function exit(){
        //função para deslogar
    }

    function renderSearchOptions(){
        const usersBySearch = usersList.filter(user => user.username.startsWith(`${searchInput}`));

        return (usersBySearch.length > 0 ? usersBySearch.map((user, index) => {return <UserOption key={index} user={user} isUser={true}/>}) : <UserOption isUser={false} />)
    }

    return (
        <Container>
            <HeaderContainer>
                <img src={logo} alt="page logo" />
                <DebounceInput minLength={3} debounceTimeout={300} onChange={e => setSearchInput(e.target.value)} placeholder="Search for people"/>
                <Logout>
                    <IoIosArrowDown onClick={toggleDisplayLogoutControl}/>
                    <img src="https://www.lance.com.br/files/article_main/uploads/2022/07/02/62c0dbbed1a02.jpeg" alt="profile" />
                </Logout>
                <SearchOptions display={searchInput ? "" : "display: none;"}>
                    { usersList.length > 0? renderSearchOptions() : <UserOption isUser={false} />}
                </SearchOptions>
                <LogoutButton display={displayLogoutControl} onClick={exit}><h4>Logout</h4></LogoutButton>
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

    > img{
        height: 30px;
    }

    input{
        z-index: 2;
        
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
    ${props => props.display};
    
    width: 7%;
    height: 47px;

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

        cursor: pointer;

        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
`;

const SearchOptions = styled.div`
    ${props => props.display};

    position: absolute;
    top: 48px;
    right: 33.1%;

    width: 33.8%;
    border-radius: 8px;

    padding-top: 6px;
`;