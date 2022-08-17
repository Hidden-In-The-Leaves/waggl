import React, { useState, useEffect } from "react";
import axios from "axios";
import { Title } from "../Discover/DiscoverChat/Chat.styled";

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
    <div
      style={{
        width: "35%",
        borderRight: "2px red solid",
      }}
    >
      <div
        style={{
          // width: "35%",
          // borderRight: "2px solid red",
          height: packs.length > 1 ? "45vh" : "",
          overflow: "auto",
        }}
      >
        {packs[0] && memberList[0] && (
          <Title style={{ borderBottom: "none" }}>{pack_name} Members</Title>
        )}
        {memberList.map((member, index) => (
          <div
            key={index}
            style={{ display: "flex", margin: "10px 10px 10px 5%" }}
          >
            <img
              src={member.image}
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div>
              <p style={{ margin: "10px 0 0 0" }}>
                {member.first_name} {member.last_name}
              </p>
              <p style={{ marginTop: "0" }}>default location</p>
            </div>
          </div>
        ))}
      </div>
      {packs.length > 1 && (
        <div
          style={{
            // width: "35%",
            // borderRight: "2px solid red",
            // height: packs.length > 1 ? "45vh" : "",
            overflow: "auto",
          }}
        >
          <Title style={{ borderBottom: "none" }}>Other Packs</Title>
          {packs.map((pack) => {
            if (pack.pack_id !== packId) {
              return (
                <div
                  key={pack.pack_id}
                  style={{ display: "flex", margin: "10px 10px 10px 5%" }}
                  onClick={() =>
                    clickHandler(pack.pack_id, pack.pack[0].pack_name)
                  }
                >
                  <img
                    src={pack.pack[0].image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <p style={{ margin: "10px 0 0 0" }}>
                      {pack.pack[0].pack_name}
                    </p>
                    <p style={{ marginTop: "0" }}>description</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
