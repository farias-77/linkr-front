import * as S from "./Styles";
import { useState } from "react";
import timeline from "../../assets/timeline.svg";
import profile_template from "../../assets/profile_template.svg";

export default function Publications() {
    
    const [postContent, setPostContent] = useState({
        imageUrl: "",
        text: ""
    });

    return (
        <S.Container>
            <S.Publications>
                <S.Timeline src={timeline} alt="" />
                <S.WritePublication>
                    <S.Div>
                        <S.ProfilePicture src={profile_template} alt="" />
                        <S.Div2>
                            <h2>What are you going to share today?</h2>
                            <S.Form>

                                <S.UrlInput
                                    placeholder="https://..."
                                    type= "url"
                                    value={postContent.imageUrl}
                                    onChange={(e) => 
                                        setPostContent({...postContent , imageUrl: e.target.value})
                                    }
                                />

                                <S.TextInput
                                    placeholder="Awesome article about #javascript"
                                    type= "url"
                                    value={postContent.text}
                                    onChange={(e) => 
                                        setPostContent({...postContent , text: e.target.value})
                                    }
                                />
                                <S.ButtonDiv>
                                    <button>Publish</button>  
                                </S.ButtonDiv>
                                
                            </S.Form>
                        </S.Div2>

                    </S.Div>

                
                </S.WritePublication>
            </S.Publications>
        </S.Container>
    );
}