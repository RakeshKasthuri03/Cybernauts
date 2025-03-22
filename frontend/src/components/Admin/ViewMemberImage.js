import React from 'react';
import pp from '../../assets/pp.jpg';
import '../styles/viewmemberimage.css';

export default function ViewMemberImage({ currentImage, onClose }) {
  return (
    <div className='ViewMemberimg'>
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className='imageborders'>
          <img src={currentImage}
          referrerPolicy="no-referrer"
          alt="Profile"/>
        </div>
        <button className="close-button" onClick={onClose}>✖</button>
      </div>
    </div>
    </div>
  );
} 

// Usage Example
// <ViewMemberImage onClose={() => setShowModal(false)} />
