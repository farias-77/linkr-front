import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import TrendingHashtags from "../TrendingHashtags.js";
import Header from "../Header/Header.js";
import PostCard from "../PostCard.js";
import { ThreeDots } from  'react-loader-spinner'


export default function Timeline(){
    const [ posts, setPosts ] = useState([]);
    const [ refresh, setRefresh ] = useState(0);
    const [ url, setUrl ] = useState("");
    const [ text, setText ] = useState("");
    const [ pending, setPending ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ userInfo, setUserInfo] = useState({username: "", profilePicture: ""});

    useEffect(() => {
        const url = `https://projeto-17-linkr.herokuapp.com/userInfo`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get(url, config);
        promise.then((res) => {
            setUserInfo({...userInfo, username: res.data[0].username, profilePicture: res.data[0].profilePicture});
        });
        
        promise.catch((res) => {
            console.log(res.data);
        })
    }, []);

    useEffect(() => {
        const url = `https://projeto-17-linkr.herokuapp.com/timeline`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get(url, config);

        promise.then((res) => {
            setPosts(res.data);
            setLoading(false);
        });

        promise.catch((res) => {
            setLoading("erro");
        })
    }, [refresh]);

    function createPost(event){
        event.preventDefault();
        setPending(true);
        const body = {
            url,
            text
        }
        const back_url = `https://projeto-17-linkr.herokuapp.com/register-post`;
        let token = window.localStorage.getItem("user_data");
        token = token.substring(1, token.length-1);
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.post(back_url, body, config);
        promise.then(()=>{
            setRefresh(refresh+1);
            setPending(false); 
            setUrl(""); 
            setText("")});
        promise.catch(()=>{
            setPending(false); 
            alert("Houve um erro ao publicar seu link.");  
            })
    }
    return (
        <>
            <Header />
            <Container>
                <div>
                    <UserInfo>
                        <h2>timeline</h2>
                    </UserInfo>
                    <PageContent>
                        <Feed>
                            <InputBox img={userInfo.profilePicture} url={url} setUrl={setUrl} text={text} setText={setText} createPost={createPost} pending={pending}/>
                            {
                                loading ? <ThreeDots
                                        height="200"
                                        width="150"
                                        color='white'
                                        ariaLabel='loading'
                                        />
                                :
                                loading === "erro" ? <p>An error ocurred while trying to fetch the posts, please refresh the page.</p>
                                :
                                <Posts posts={posts} refresh={refresh} setRefresh={setRefresh}/>
                            }
                        </Feed>
                        <TrendingHashtags />
                    </PageContent>
                </div>
            </Container>
        </>
    )
}

function Posts({posts, refresh, setRefresh}){
return(
    <>
        {
            !posts ? <p>There are no posts yet.</p> :
            posts.map((value,index)=>
            <PostCard key={index} user={{username: value.username, profilePicture: value.profilePicture}} post={value} refresh={refresh} setRefresh={setRefresh}/>)
        }
    </>
)
}


function InputBox({img,url,setUrl,text,setText,createPost,pending}){
return(
    <BoxInput>
        <div style={{display:"flex", alignItems:"center"}}>
            <img src={img} alt="profile" />
            <div style={{width:"100%"}}>
                <p>What are you going to share today?</p>
                {pending ? 
                <>
                    <Loads style={{height:"30px",marginTop:"10px"}}>{url}</Loads>
                    <Loads>{text}</Loads> 
                    <Loading>
                        Publishing...
                    </Loading>
                </>
                : 
                <form onSubmit={createPost}>
                    <input
                        style={{
                            height:"30px",
                            marginTop:"10px"
                        }}
                        type="url" placeholder="http:/" value={url} onChange={e => setUrl(e.target.value)}/>
                    <input type="text" placeholder="" value={text} onChange={e => setText(e.target.value)}/>
                    <button type="submit">Publish</button>
                </form>
            }
            </div>
        </div>
        
    </BoxInput>
)
}

const BoxInput = styled.div`
    width: 611px;
    height: 209px;

    background: #FFFFFF;
    border-radius: 16px;
    padding: 20px 17px;

    display: flex;
    flex-direction: column;

    margin-bottom: 20px;

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;

        color: #707070;
    }
    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        object-fit: cover;

        margin-top: -20%;
        margin-right: 20px;
    }
    form{
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    input{
        height: 66px;
        background: #EFEFEF;
        border: 0;
        border-radius: 5px;
        margin-bottom: 5px;
        width: 100%;

        padding-left: 8px;

        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;

    }
    button{
        width: 20%;
        height: 31px;
        background: #1877F2;
        border: 0;
        border-radius: 5px;
        margin-left: 80%;

        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;

    }

    @media (max-width: 900px){
        width: 100%;
        border-radius: 0;
    }
`;

const Loads = styled.div`
height: 66px;
background: #EFEFEF;
border: 0;
border-radius: 5px;
margin-bottom: 5px;
width: 100%;

overflow: hidden;

padding-left: 8px;

font-family: 'Lato';
font-style: normal;
font-weight: 300;
font-size: 15px;
line-height: 18px;
color: #949494;
`
const Loading = styled.div`
width: 20%;
height: 31px;
background: #1877F2;
border: 0;
border-radius: 5px;
margin-left: 80%;
display: flex;
justify-content: center;
align-items: center;

font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: #FFFFFF;
`

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
    display: flex;
    flex-direction: column;
    align-items: center;

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