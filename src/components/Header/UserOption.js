import styled from "styled-components";

export default function UserOption(){
    return (
        <Container>
            <img src="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/01/ARRASCAETA-FLAMENGO-ALEXANDRE-VIDAL-FLAMENGO.jpg" alt="profile" />
            <h4>Arrascaeta</h4>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: flex;
    align-items: center;

    padding-left: 10px;
    margin: 10px 0;

    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        object-fit: cover;

        cursor: pointer;
    }

    h4{
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;

        margin-left: 10px;
        cursor: pointer;
    }
`;