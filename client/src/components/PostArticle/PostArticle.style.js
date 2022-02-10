import styled from "styled-components";

export const ArticleWrapper = styled.div`
  display: flex;
  width: 720px;
  flex-direction: column;
`;

export const ArticleTitle = styled.span`
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  margin-bottom: 10px;
`;

export const PostInfo = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;

  img {
    width: 50px;
    height: 50px;
  }
`;

export const DetailedInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;

  p {
    margin: 0;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 4px;
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  div p {
    font-size: 16px;
    line-height: 19px;
    color: #767676;
  }
`;

export const Like = styled.div`
  img {
    width: 10px;
    height: 10px;
  }

  p {
    font-size: 10px;
    margin: 0 0 0 3px;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  margin-top: 40px;

  img {
    width: 720px;
  }

  p {
    margin: 40px 0;
    line-height: 32px;
  }
`;
