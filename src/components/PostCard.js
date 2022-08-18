import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoTrash } from "react-icons/io5";
import { ImPencil } from "react-icons/im";
import { AiOutlineComment } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

export default function PostCard({ user, post, refresh, setRefresh }) {

  const navigate = useNavigate();
  const inputRef = useRef();

  const userUsername = window.localStorage.getItem("username");
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const [displayDeleteModal, setDisplayDeleteModal] =
    useState("display: none;");
  const [displayEditInput, setDisplayEditInput] = useState(false);
  const [editInput, setEditInput] = useState(post.postText);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [displayConfirmRepost, setDisplayConfirmRepost] =
    useState("display: none;");
  const [reposts, setReposts] = useState();

  useEffect(() => {
    if (post.whoLiked.includes(userUsername)) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    const url = `https://projeto-17-linkr.herokuapp.com/like/${post.postId}`;
    let token = window.localStorage.getItem("user_data");
    token = token.substring(1, token.length - 1);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(url, config);
    promise.then((res) => {
      setLikeCount(res.data.length);
      post.whoLiked = res.data;
    });

    const url2 = `https://projeto-17-linkr.herokuapp.com/comment/${post.postId}`;
    const promise2 = axios.get(url2, config);
    promise2.then((res) => {
      setComments([...res.data]);
    });

    const url3 = `https://projeto-17-linkr.herokuapp.com/repost/${post.postId}`;
    const promise3 = axios.get(url3, config);
    promise3.then((res) => {
      setReposts(res.data.length);
    });
  }, [refresh]);

  useEffect(() => {
    if (displayEditInput) {
      inputRef.current.focus();
    }
  }, [displayEditInput]);

  function toggleLike() {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }

    likeOrDislikeInDatabase();
  }

  async function likeOrDislikeInDatabase() {
    const url = `https://projeto-17-linkr.herokuapp.com/like/${post.postId}`;
    let token = window.localStorage.getItem("user_data");
    token = token.substring(1, token.length - 1);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {};
    const promise = axios.post(url, body, config);
    promise.then((res) => {
      post.whoLiked = res.data;
      setLikeCount(res.data.length);
    });
  }

  function userLiked() {
    const localWhoLiked = post.whoLiked.filter(
      (username) => username !== userUsername
    );

    if (localWhoLiked.length === 0) {
      return `Você`;
    } else if (localWhoLiked.length === 1) {
      return `Você e ${localWhoLiked[0]}`;
    } else if (localWhoLiked.length >= 2) {
      return `Você, ${localWhoLiked[0]} e outras ${
        localWhoLiked.length - 1
      } pessoas`;
    }
  }

  function userDLiked() {
    if (post.whoLiked.length === 1) {
      return `${post.whoLiked[0]}`;
    } else if (post.whoLiked.length === 2) {
      return `${post.whoLiked[0]} e ${post.whoLiked[1]}`;
    } else if (post.whoLiked.length >= 3) {
      return `${post.whoLiked[0]}, ${post.whoLiked[1]} e outras ${
        post.whoLiked.length - 2
      } pessoas`;
    }
  }

  function navigateToHashtag(word) {
    const index = word.indexOf("#");
    if (index === 0) {
      const hashtag = word.slice(1);
      navigate(`/hashtag/${hashtag}`);
    }
  }

  function toggleShowDeleteModal() {
    if (displayDeleteModal === "display: flex;") {
      setDisplayDeleteModal("display: none;");
    } else {
      setDisplayDeleteModal("display: flex;");
    }
  }

  function toggleShowConfirmRepost() {
    if (displayConfirmRepost === "display: flex;") {
      setDisplayConfirmRepost("display: none;");
    } else {
      setDisplayConfirmRepost("display: flex;");
    }
  }

  function deletePost() {
    const url = `https://projeto-17-linkr.herokuapp.com/delete-post/${post.postId}`;
    let token = window.localStorage.getItem("user_data");
    token = token.substring(1, token.length - 1);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.delete(url, config);
    promise.then(() => {
      toggleShowDeleteModal();
      setRefresh(refresh + 1);
    });

    promise.catch(() => {
      toggleShowDeleteModal();
      alert("Não foi possível deletar o post :(");
    });
  }

  function toggleEditInput() {
    if (displayEditInput) {
      setDisplayEditInput(false);
    } else {
      setDisplayEditInput(true);
    }
  }

  function changePostTextInDatabase() {
    const url = `https://projeto-17-linkr.herokuapp.com/update/${post.postId}`;
    const body = {
      text: editInput,
    };
    let token = window.localStorage.getItem("user_data");
    token = token.substring(1, token.length - 1);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.put(url, body, config);
    promise.then(() => {
      toggleEditInput();
      setRefresh(refresh + 1);
    });
    promise.catch(() => {
      alert("Não foi possível editar o post, por favor tente novamente.");
    });
  }

  function getKeyDown(e) {
    const keyDown = e.key;

    if (keyDown === "Escape") {
      toggleEditInput();
      return;
    }

    if (keyDown === "Enter") {
      changePostTextInDatabase();
      return;
    }
  }

  function toggleCommentBox() {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  }

  function returnEmptyComments() {
    return (
      <>
        <h5>No comments yet...</h5>
        <Divisor />
      </>
    );
  }

  function returnComments() {
    return comments.map((comment, index) => {
      return (
        <>
          <Comment key={index}>
            <img src={comment.profilePicture} alt="profile" />
            <div>
              <p>{comment.username}</p>
              <p>{comment.comment}</p>
            </div>
          </Comment>
          <Divisor key={uuid()} />
        </>
      );
    });
  }

  function sendComment() {
    const url = `https://projeto-17-linkr.herokuapp.com/comment/${post.postId}`;
    let token = window.localStorage.getItem("user_data");
    token = token.substring(1, token.length - 1);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(url, { comment: commentInput }, config);
    promise.then(() => {
      setRefresh(refresh + 1);
      setCommentInput("");
    });
    promise.catch(() => {
      alert(
        "Não foi possível inserir o seu comentário, por favor tente novamente."
      );
    });
  }

  function repostPost() {
    const url = `https://projeto-17-linkr.herokuapp.com/repost/${post.postId}`;
    let token = window.localStorage.getItem("user_data");
    token = token.substring(1, token.length - 1);
    const body = {
      url: post.url,
      text: post.postText,
      userId: post.userId,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(url, body, config);
    promise.then(() => {
      toggleShowConfirmRepost();
      setRefresh(refresh + 1);
    });

    promise.catch(() => {
      toggleShowConfirmRepost();
      alert("Não foi possível repostar o post :(");
    });
  }

  return (
    <>
      <CardContainer>
        <PostContainer border={showComments ? "16px 16px 0 0" : "16px"}>
          <PictureAndLike>
            <img src={user.profilePicture} alt="profile" />
            {liked ? (
              <IoIosHeart color="#AC0000" onClick={toggleLike} />
            ) : (
              <IoIosHeartEmpty color="#FFFFFF" onClick={toggleLike} />
            )}
            <p data-tip={liked ? userLiked() : userDLiked()}>
              {likeCount} likes
            </p>
            <ReactTooltip />
            <AiOutlineComment color="#FFFFFF" onClick={toggleCommentBox} />
            <p>{comments.length} comments</p>
            <BiRepost color="#FFFFFF" onClick={toggleShowConfirmRepost} />
            <p>{reposts} re-posts</p>
          </PictureAndLike>

          <PostContent>
            <div>
              <h4
                onClick={() => {
                  navigate(`/user/${post.userId}`);
                }}
              >
                {user.username}
              </h4>
              {user.username === window.localStorage.getItem("username") ? (
                <div>
                  <ImPencil onClick={toggleEditInput} />
                  <IoTrash onClick={toggleShowDeleteModal} />
                </div>
              ) : (
                <></>
              )}
            </div>

            {displayEditInput ? (
              <input
                defaultValue={editInput}
                onKeyDown={getKeyDown}
                ref={inputRef}
                onChange={(e) => setEditInput(e.target.value)}
              />
            ) : (
              <InteractableText
                text={post.postText}
                navigateToHashtag={navigateToHashtag}
              />
            )}

            <a href={post.url} target="_blank">
              <UrlPreview>
                <div>
                  <h3>{post.title}</h3>
                  <h4>{post.description}</h4>
                  <h5>{post.url}</h5>
                </div>
                <img src={post.image} alt="metadata image" />
              </UrlPreview>
            </a>
          </PostContent>
        </PostContainer>

        <CommentsContainer
          display={showComments ? "display: flex;" : "display: none;"}
        >
          {comments.length === 0 ? returnEmptyComments() : returnComments()}
          <CommentInput>
            <img src={user.profilePicture} alt="user profile" />
            <input
              placeholder="write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <FiSend onClick={sendComment} />
          </CommentInput>
        </CommentsContainer>
      </CardContainer>

      <WhiteBackground display={displayDeleteModal}>
        <DeleteModal>
          <p>
            Are you sure you want
            <br />
            to delete this post?
          </p>
          <div>
            <Button
              color="#FFFFFF"
              background="#1877F2"
              onClick={toggleShowDeleteModal}
            >
              No, go back
            </Button>
            <Button color="#1877F2" background="#FFFFFF" onClick={deletePost}>
              Yes, delete it
            </Button>
          </div>
        </DeleteModal>
      </WhiteBackground>
      <WhiteBackground display={displayConfirmRepost}>
        <DeleteModal>
          <p>
            Do you want to re-post
            <br />
            this link?
          </p>
          <div>
            <Button
              color="#FFFFFF"
              background="#1877F2"
              onClick={toggleShowConfirmRepost}
            >
              No, cancel
            </Button>
            <Button color="#1877F2" background="#FFFFFF" onClick={repostPost}>
              Yes, share!
            </Button>
          </div>
        </DeleteModal>
      </WhiteBackground>
    </>
  );
}

const CardContainer = styled.div`
  width: 611px;

  display: flex;
  flex-direction: column;

  margin-bottom: 20px;

  @media (max-width: 900px) {
    width: 100%;
    border-radius: 0;
  }
`;

const PostContainer = styled.div`
  width: 100%;
  height: 276px;

  background: #171717;
  border-radius: ${(props) => props.border};
  padding: 20px 17px;

  display: flex;

  z-index: 1;
`;

const PictureAndLike = styled.div`
  width: 12%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
  }

  svg {
    margin-top: 20px;
    font-size: 25px;
    color: ${(props) => props.color};

    cursor: pointer;
  }

  p {
    margin-top: 5px;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
  }

  @media (max-width: 900px) {
    p {
      line-height: 18px;
    }
  }
`;

const PostContent = styled.div`
  width: 88%;
  height: 100%;

  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    h4 {
      font-weight: 400;
      font-size: 19px;
      line-height: 23px;
      color: #ffffff;
      cursor: pointer;
    }

    svg {
      font-size: 20px;
      color: white;
      margin-left: 9px;
      cursor: pointer;
    }
  }

  span {
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;

    margin-top: 30px;
    cursor: pointer;
  }

  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;

    margin-top: 30px;

    display: inline;
  }

  > input {
    width: 503px;
    height: 44px;

    background: #ffffff;
    border-radius: 7px;
  }
`;

const UrlPreview = styled.div`
  width: 100%;
  height: 65%;

  border: 1px solid #4d4d4d;
  border-radius: 11px;
  margin-top: 20px;

  display: flex;

  img {
    width: 30%;
    height: 100%;
    object-fit: cover;
    border-radius: 0px 12px 13px 0px;
  }

  > div {
    width: 70%;
    height: 100%;
    padding: 15px 0;
    padding-left: 20px;
    padding-right: 5px;

    overflow: hidden;

    h3 {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;

      color: #cecece;

      margin-bottom: 5px;
    }

    h4 {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;

      color: #9b9595;

      margin-bottom: 10px;
    }

    h5 {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;

      color: #cecece;
    }
  }

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 900px) {
    height: 70%;

    > div {
      padding-left: 10px;
    }
  }
`;

function InteractableText({ text, navigateToHashtag }) {
  function isHashtag(word) {
    const index = word.indexOf("#");
    if (index === 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {text === null ? (
        <></>
      ) : (
        text.split(" ").map((word, index) => {
          return (
            <>
              {isHashtag(word) ? (
                <span
                  key={index}
                  style={{ fontWeight: 700 }}
                  onClick={() => navigateToHashtag(word)}
                >
                  {word}&nbsp;
                </span>
              ) : (
                <p key={index}>{word}&nbsp;</p>
              )}
            </>
          );
        })
      )}
    </>
  );
}

const WhiteBackground = styled.div`
  ${(props) => props.display}

  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 3;

  justify-content: center;
  align-items: center;
`;

const DeleteModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 4;

  width: 597px;
  height: 262px;

  background-color: #333333;
  border-radius: 50px;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;

    color: #ffffff;
  }

  > div {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 45px;
  }
`;

const Button = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;

  width: 134px;
  height: 37px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};

  cursor: pointer;
`;

const CommentsContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  background-color: #1e1e1e;
  border-radius: 0 0 16px 16px;

  ${(props) => props.display};
  flex-direction: column;
  align-items: center;

  padding: 0 25px;

  > h5 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: #f3f3f3;
    margin-top: 15px;
  }
`;

const CommentInput = styled.div`
  width: 100%;
  height: 85px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;

  img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    object-fit: cover;
  }

  input {
    width: 510px;
    height: 39px;
    border: none;
    background: #252525;
    border-radius: 8px;
    padding-left: 20px;

    color: white;
  }

  svg {
    margin-top: 20px;
    font-size: 22px;
    color: #ffffff;

    cursor: pointer;
    position: absolute;
    right: 3%;
    top: 15%;
  }
`;

const Comment = styled.div`
  width: 100%;

  margin-top: 15px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    object-fit: cover;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 39px);
    padding-left: 10px;

    p:first-child {
      font-family: "Lato";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #f3f3f3;

      margin-bottom: 3px;
    }

    p:last-child {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #acacac;
    }
  }
`;

const Divisor = styled.div`
  width: 100%;
  height: 1px;
  background-color: #353535;

  margin-top: 15px;
`;
