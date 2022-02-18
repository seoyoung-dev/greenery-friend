import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PostTextarea,
  DisplayImg,
  CotentAddButton,
  PostTitle,
  RemoveBtn,
  ContentSection,
  PostFormWrapper,
  PostWrapper,
} from "./Post.style";

export function Post() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const inputRef = useRef([]);
  const { postId } = useParams();
  const [inputList, setInputList] = useState([
    {
      content: "",
      imgUrl: "",
      fileImage: "",
    },
  ]);

  const Read = () => {
    axios
      .get(`/api/posts?postId=${postId}`)
      .then(res => {
        const { title, contents } = res.data.post;

        const newContent = contents.map(article => {
          return {
            content: article.content,
            imgUrl: article.imgUrl,
            fileImage: article.imgUrl,
          };
        });
        setTitle(title);
        setInputList(newContent);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // 첫 렌더링시
    postId && Read(postId);
  }, []);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];

    if (name === "fileImage") {
      list[index][name] = URL.createObjectURL(e.target.files[0]);
      list[index].imgUrl = "";
    } else list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { content: "", imgUrl: "" }]);
  };

  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);

    inputList.forEach((content, i) => {
      data.append("userfiles", inputRef.current[i].files[0]);
      data.append(`contents[${i}]`, content.content);
      data.append(`img[${i}]`, content.imgUrl);
    });

    const url = `/api/posts/${postId}`;
    postId
      ? axios
          .put(url, data)
          .then(res => {
            navigate(`/article/${postId}`);
          })
          .catch(err => console.log(err))
      : axios
          .post("/api/posts", data, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(res => {
            // backend에서 글생성후 postId 받아야함
            navigate(`/article/${res.data.postId}`);
          })
          .catch(err => console.log(err));

    // console.log(data.getAll("title"));
    // console.log(data.getAll("userfiles"));
    // console.log(data.getAll("contents"));
    // console.log(data.getAll("imgUrl"));
  };

  return (
    <PostWrapper>
      <Header id="PostPage"></Header>
      <PostFormWrapper>
        <PostTitle
          placeholder="제목을 입력해주세요."
          onChange={e => setTitle(e.target.value)}
          value={title}
        />

        <form onSubmit={onSubmit} id="PostFormSubmit">
          {inputList.map((x, i) => {
            return (
              <ContentSection key={i}>
                <label>
                  <input
                    ref={e => {
                      inputRef.current[i] = e;
                    }}
                    type="file"
                    name="fileImage"
                    accept=".gif, .jpeg, .heic, .png"
                    onChange={e => handleInputChange(e, i)}
                    style={{ display: "none" }}
                  />
                  <DisplayImg
                    src={x.fileImage ? `${x.fileImage}` : "/img/upload.png"}
                    alt="upload.png"
                  />
                </label>
                {inputList.length !== 1 && (
                  <RemoveBtn onClick={() => handleRemoveClick(i)}>
                    <img src="/icon/postTrash.svg" alt="postTrash.svg" />
                  </RemoveBtn>
                )}
                <PostTextarea
                  name="content"
                  placeholder="내용을 입력하세요."
                  value={x.content}
                  onChange={e => handleInputChange(e, i)}
                />
              </ContentSection>
            );
          })}
        </form>
        <CotentAddButton onClick={handleAddClick}>추가하기</CotentAddButton>
        {/* <div>{JSON.stringify(inputList)}</div> */}
      </PostFormWrapper>
    </PostWrapper>
  );
}
