import React, { useState } from 'react';
import Modal from '../commonComponents/Modal';

export default function AddEvent({ close }) {
  const [openForm, setOpenForm] = useState(false);
  return (
    <Modal open={openForm} onClose={() => setOpenForm(false)} title="Add Event">
      <form>
        <button onClick={() => close()}>Close Form</button>
        <input type="textfield" />
        <button type="submit" />
      </form>
    </Modal>

  );
}
