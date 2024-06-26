import DetailHeader from "../components/DetailHeader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LinkImg from "../images/Home.svg";
import InputComment from "../components/InputComment";
import noneImg from "../images/noneImg.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";

const DetailPage = () => {
  const { id } = useParams();

  async function getData() {
    const response = await axios.get(
      `https://seoulmate.kookm.in/api/event/${id}`
    );
    setData(response.data);
    console.log(response.data);
    return response.data;
  }

  const [data, setData] = useState({});

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  return (
    <DetailContainer>
      <DetailHeader text="클래식 연주회" />
      <DetailWrapper>
        {/* 가오부리기 좋음ㅋ */}
        <DetailImg src={data?.image || noneImg} />
        <LinkButton href={data?.url || "#"}>

          <LinkButtonText>예약 및 상세정보</LinkButtonText>
          <img src={LinkImg} alt="상세정보 링크 연결 버튼" />
        </LinkButton>
      </DetailWrapper>
      <DetailInfo>
        <LinkButtonText
          onClick={() => {
            console.log(data);
          }}
        >
          {data?.title || "You can't find it"}
        </LinkButtonText>
        시작일 :{" "}
        {data?.start ? data.start.substring(0, 10) : "You can't find it"}
        <br />
        마감일 : {data?.end
          ? data.end.substring(0, 10)
          : "You can't find it"}{" "}
        <br />
        장소 : {data?.place || "You can't find it"} <br />
        가격 : {data?.price ? data.price : "무료"} <br />
        대상 : {data?.target || "You can't find it"}
      </DetailInfo>
      <Comments />
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailWrapper = styled.div`
  display: flex;
  padding: 0px 27px;
  margin-top: 18px;
  gap: 25px;
  justify-content: space-between;
`;

const DetailImg = styled.img`
  width: 150px;
  border-radius: 16px;
`;

const LinkButton = styled.a`
  background-color: #fbe6e6;
  width: 150px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LinkButtonText = styled.div`
  color: #35414b;
  font-size: 17px;
  font-weight: 700;
`;

const DetailInfo = styled.div`
  border-radius: 8px;
  background: #fbe6e6;
  flex-shrink: 0;
  margin: 20px 27px;
  padding: 13px;
`;

export default DetailPage;
