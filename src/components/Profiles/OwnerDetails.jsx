import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export default function OwnerDetails({ userId, open, onClose }) {
  if (!open) {
    return null;
  }

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (open) {
      const config = {
        method: 'GET',
        url: `/api/users/${userId}`,
      };
      axios(config)
        .then((result) => setUserInfo(result.data[0]))
        .catch((err) => console.log('error getting userinfo', err));
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <div>
          <img src={userInfo.profile_pic_url} alt="person" />
          <div>{`${userInfo.first_name} ${userInfo.last_name}`}</div>
          <div>{`${userInfo.city}, ${userInfo.state}`}</div>
        </div>
        <div>
          <div>
            <div>Dogs</div>
            {userInfo.dogs.map((dog) => (
              <div key={dog.id}>
                <img src={dog.photos[0]} alt="dog" />
                <div>{dog.name}</div>
              </div>
            ))}
          </div>
          <div>
            <div>Joined Packs</div>
            {userInfo.packs.map((pack) => (
              <div key={pack.id}>
                <img src={pack.pack_profile_pic_url} alt="a pack" />
                <div>{pack.pack_name}</div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
