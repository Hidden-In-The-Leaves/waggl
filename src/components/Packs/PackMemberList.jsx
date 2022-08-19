import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  PackContainer,
  PackMemberContainer,
  SubTitle,
  Members,
  PacksList,
  CircleImage,
  MemberName,
  MemberLocation,
} from './Packs.styled';

export default function PackMemberList({
  packId,
  user,
  updatePackId,
  pack_name,
}) {
  const navigate = useNavigate();
  const [packs, setPacks] = useState([]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/messages/pack?userId=${user.id}`)
      .then(({ data }) => setPacks(data))
      .catch((err) => console.log(err));
  }, [user.id]);
  useEffect(() => {
    axios
      .get(`/api/messages/pack/members?packId=${packId}`)
      .then(({ data }) => {
        updatePackId(packId, data.pack_name);
        setMemberList(data);
      })
      .catch((err) => console.log(err));
  }, [packId]);
  const clickHandler = (id, name) => {
    updatePackId(id, name);
  };
  const goToUserProfile = (member) => {
    navigate(`/ProfileList/${member.id}`);
  };
  return (
    <PackContainer>
      <PackMemberContainer
        style={{
          height: packs.length > 1 ? '45vh' : '',
        }}
      >
        {packs[0] && memberList.pack_name && (
          <SubTitle>{memberList.pack_name} Members</SubTitle>
        )}
        {memberList.users &&
          memberList.users.map((member, index) => (
            <Members key={index} onClick={() => goToUserProfile(member)}>
              <CircleImage src={member.image} />
              <div>
                <MemberName>
                  {member.first_name} {member.last_name}
                </MemberName>
                {member.city && member.state && (
                  <MemberLocation>
                    {member.city}, {member.state}
                  </MemberLocation>
                )}
              </div>
            </Members>
          ))}
      </PackMemberContainer>
      {packs.length > 1 && (
        <PackMemberContainer>
          <SubTitle>Other Packs</SubTitle>
          {packs.map((pack) => {
            if (pack.pack_id !== Number(packId)) {
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
                    {pack.pack[0].description && (
                      <MemberLocation title={pack.pack[0].description}>
                        {pack.pack[0].description.length > 35
                          ? pack.pack[0].description.slice(0, 30).concat('....')
                          : pack.pack[0].description}
                      </MemberLocation>
                    )}
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
