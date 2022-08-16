import { DebounceInput } from "react-debounce-input";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserOption from "./UserOption.js";
import logo from "../../assets/logo.png";
import styled from "styled-components";
import axios from "axios";
import { useUserData, deleteUserDataInLocalStorage } from "../../contexts/UserContext.js";

export default function Header(){
    const [ displayLogoutControl, setDisplayLogoutControl ] = useState("display: none;");
    const [ searchInput, setSearchInput ] = useState("");
    const [ usersList, setUsersList ] = useState([]);
    const [ showOptions, setShowOptions ] = useState(false);
    const [, setUserData] = useUserData();
    const [ userInfo, setUserInfo] = useState({username: "", profilePicture: ""});
    const navigate = useNavigate();

    useEffect(() => {
        const url = `http://localhost:5000/userInfo`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get(url, config);
        promise.then((res) => {
            window.localStorage.setItem("username", res.data[0].username);
            setUserInfo({...userInfo, username: res.data[0].username, profilePicture: res.data[0].profilePicture});
        });
        
        promise.catch((res) => {
            console.log(res.data);
        })
    }, []);

    useEffect(() => {       
        if(!searchInput){
            setUsersList([]);
            return;
        }
        
        const url = `http://localhost:5000/users/${searchInput}`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get(url, config);
        promise.then((res) => {
            { res.data.length > 0 ? setShowOptions(true) : setShowOptions(false) }
            setUsersList(res.data);
        });

        promise.catch(() => {
            console.log("Algo deu errado, por favor tente novamente.");
        })

    }, [searchInput]);

    function toggleDisplayLogoutControl(){
        if(displayLogoutControl === "display: none;"){
            setDisplayLogoutControl("");
        }else{
            setDisplayLogoutControl("display: none;");
        }
    }

    function returnHome(){
        navigate("/timeline");
        return;
    }

    function renderSearchOptions(){    
        return usersList.map((user, index) => {return <UserOption key={index} setShowOptions={setShowOptions} user={user} isLastOption={index === usersList.length - 1 ? true : false }/>})
    }   

    function signOut (){
        setUserData("");
        deleteUserDataInLocalStorage();
        navigate("/");
    }

    return ( 
        <>
            <Container>
                <HeaderDesktopContainer>
                    <img src={logo} alt="page logo" onClick={returnHome} />
                    <SearchControl>
                        <DebounceInput minLength={3} debounceTimeout={300} onChange={e => setSearchInput(e.target.value)} placeholder="Search for people"/>
                        <SearchOptions display={searchInput ? "" : "display: none;"}>
                            { usersList.length > 0 && showOptions ? renderSearchOptions() : <></>}
                        </SearchOptions>
                    </SearchControl>

                    <Logout>
                        <div>
                            {displayLogoutControl ? <IoIosArrowDown onClick={toggleDisplayLogoutControl}/> : <IoIosArrowUp onClick={toggleDisplayLogoutControl}/>  }
                            <img src={ userInfo.profilePicture ? userInfo.profilePicture : "" } alt="profile" />
                        </div>
                        <LogoutButton display={displayLogoutControl} onClick={signOut}><h4>Logout</h4></LogoutButton>
                    </Logout>
                    
                </HeaderDesktopContainer>

                <HeaderMobileContainer>
                    <Menu>
                        <img src={logo} alt="page logo" onClick={returnHome} />
                        <Logout>
                            <div>
                            {displayLogoutControl ? <IoIosArrowDown onClick={toggleDisplayLogoutControl}/> : <IoIosArrowUp onClick={toggleDisplayLogoutControl}/>  }
                                <img src={ userInfo.profilePicture ? userInfo.profilePicture : "" } alt="profile" />
                            </div>
                            <LogoutButton display={displayLogoutControl} onClick={signOut}><h4>Logout</h4></LogoutButton>
                        </Logout>
                    </Menu>

                    <SearchControl>
                        <DebounceInput minLength={3} debounceTimeout={300} onChange={e => setSearchInput(e.target.value)} placeholder="Search for people"/>
                        <SearchOptions display={searchInput ? "" : "display: none;"}>
                            { usersList.length > 0 && showOptions ? renderSearchOptions() : <></>}
                        </SearchOptions>
                    </SearchControl>

                </HeaderMobileContainer>
            </Container>
            <FullScreen display={displayLogoutControl ? "display: none;" : ""} onClick={toggleDisplayLogoutControl}/>
        </>
    )
}
const FullScreen = styled.div`
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    ${props => props.display}
`;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    @media (max-width: 800px){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    z-index: 2;
`;

const HeaderDesktopContainer = styled.div`
    position: relative;
    z-index: 1;

    width: 100%;
    height: 72px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    > img{
        height: 30px;
        margin-left: 17px;

        cursor: pointer;
    }

    background-color: #151515;

    @media (max-width: 800px){
        display: none;
    }
`;

const SearchControl = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    width: 35%;

    input{
        z-index: 1;
        
        width: 100%;
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

    @media (max-width: 800px){
        width: 100%;
        margin-top: 10px;
        padding: 0 3%;
    }
`;

const Logout = styled.div`
    height: 100%;
    padding-right: 17px;

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

    >div:first-child{
        display: flex;
        align-items: center;
    }

    z-index: 2;
`;

const LogoutButton = styled.div`
    ${props => props.display};
    
    width: 100%;
    height: 47px;

    position: absolute;
    top: 68px;
    right: 0;
    z-index: 2;

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

    width: 98%;
    border-radius: 8px;

    position: absolute;
    top: 38px;

    @media(max-width: 800px){
        width: 99%;
        position: static;
    }
`;

const HeaderMobileContainer = styled.div`
    display: none;

    @media (max-width: 800px){
        display: flex;
        flex-direction: column;

        position: relative;
        z-index: 1;

        width: 100%;

        
    }
`;

const Menu = styled.div`
    width: 100%;
    height: 72px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #151515;

    > img{
            height: 30px;
            margin-left: 17px;

            cursor: pointer;
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
         
`;