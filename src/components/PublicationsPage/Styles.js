import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #333333;
    
`

export const Publications = styled.div`
    width: 35vw;
    heigth: 100vh;
    margin-top: 200px;
`
export const Timeline = styled.img`
    margin-bottom: 40px;
`

export const WritePublication = styled.div`
    width: 100%;
    height: 30%;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 20px;

    h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 10px;
        color: #707070;
    }

`

export const Div = styled.div`
    display: flex;
`
export const ProfilePicture = styled.img`
    border-radius: 50%;
    height: 50px;
    width: 50px;
    margin-right: 15px;
`

export const Div2 = styled.div`
    width: 100%;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    
`

export const UrlInput = styled.input`
    width: 100%;
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    height: 4vh;
    display: flex;
    outline: none;
    padding: 5px;
}
`

export const TextInput = styled.textarea`
    width: 100%;
    background: #EFEFEF;
    border-radius: 5px;
    border: none;
    height: 8vh;
    position: relative;
    resize: none;
    outline: none;
    font-family: 'Lato', sans-serif;
    padding: 5px;

    ::placeholder {
        position: absolute;
        top: 5px;
        left: 5px
        font-size: 15px;
    }
`

export const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;


    button {
        background: #1877F2;
        border-radius: 5px;
        width: 20%;
        height: 3.5vh;
        cursor: pointer;
        border: none;
        color: #FFFFFF;
    }
 
`