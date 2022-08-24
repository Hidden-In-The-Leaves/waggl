import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Feed from './Feed/Feed';
import Nav from './Nav/Nav';
import { Container_2_3, Title } from '../../styledComponents';
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

  if (!packData) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <PageContainer>
      <Cols>
        <Nav
          packData={packData}
          setShowAddEventPopUp={setShowAddEventPopUp}
          packId={packid}
        />
        <Container_2_3>
          <BorderedTitle>
            {packData.pack_name}
          </BorderedTitle>
          <Feed packId={packid} />
        </Container_2_3>
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

const BorderedTitle = styled(Title)`
  border-bottom: 1px solid #D9D9D9;
  margin: 5px 0;
  padding: 20px;
`;
