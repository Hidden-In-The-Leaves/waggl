import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Feed from './Feed/Feed';
import Nav from './Nav/Nav';
import AddEventModal from './AddEventModal';

export default function PackDetails(props) {
  const [showAddEventPopUp, setShowAddEventPopUp] = useState(false);
  const [packData, setPackData] = useState();
  const { packid } = useParams();

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/packs/pack',
      params: {
        pack_id: packid,
      },
    })
      .then((result) => setPackData(result.data[0]))
      .catch((err) => console.log('Error getting pack details', err));
  }, []);

  return (
    <PageContainer>
      <Cols>
        <Nav
          packData={packData}
          setShowAddEventPopUp={setShowAddEventPopUp}
          packId={packid}
        />
        {/* <Feed packData={dummyData} /> */}
      </Cols>
      {showAddEventPopUp ? <AddEventModal setShowAddEventPopUp={setShowAddEventPopUp} /> : null}
    </PageContainer>
  );
}


const PageContainer = styled.div`
  overflow-y: hidden;
  max-height: 100vh;
`;

const Cols = styled.div`
  display: flex;
  flex-direction: row;
`;