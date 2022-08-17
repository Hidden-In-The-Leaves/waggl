import React, { useState, useEffect } from "react";
import axios from "axios";
// import { SubTitle } from "../Discover/DiscoverChat/Chat.styled";
import {
  PackContainer,
  PackMemberContainer,
  SubTitle,
  Members,
  PacksList,
  CircleImage,
  MemberName,
  MemberLocation,
} from "./Packs.styled";

export default function PackMemberList({
  packId,
  user,
  updatePackId,
  pack_name,
}) {
  const [packs, setPacks] = useState([]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/messages/pack?userId=${user.id}`)
      .then(({ data }) => setPacks(data))
      .catch((err) => console.log(err));
  }, [user.id]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/messages/pack/members?packId=${packId}`)
      .then(({ data }) => setMemberList(data))
      .catch((err) => console.log(err));
  }, [packId]);
  const clickHandler = (id, name) => {
    updatePackId(id, name);
  };
  console.log(packs);
  return (
    <PackContainer>
      <PackMemberContainer
        style={{
          height: packs.length > 1 ? "45vh" : "",
        }}
      >
        {packs[0] && memberList[0] && <SubTitle>{pack_name} Members</SubTitle>}
        {memberList.map((member, index) => (
          <Members key={index}>
            <CircleImage src={member.image} />
            <div>
              <MemberName>
                {member.first_name} {member.last_name}
              </MemberName>
              <MemberLocation>default location</MemberLocation>
            </div>
          </Members>
        ))}
      </PackMemberContainer>
      {packs.length > 1 && (
        <PackMemberContainer>
          <SubTitle>Other Packs</SubTitle>
          {packs.map((pack) => {
            if (pack.pack_id !== packId) {
              return (
                <PacksList
                  key={pack.pack_id}
                  onClick={() =>
                    clickHandler(pack.pack_id, pack.pack[0].pack_name)
                  }
                >
                  <CircleImage src={pack.pack[0].image} />
                  <div>
                    <MemberName>{pack.pack[0].pack_name}</MemberName>
                    <MemberLocation>description</MemberLocation>
                  </div>
                </PacksList>
              );
            }
          })}
        </PackMemberContainer>
      )}
    </PackContainer>
  );
}
