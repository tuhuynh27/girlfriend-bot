import React from 'react'
import './ProfilePopup.scss'

function ProfilePopups({ profile, isOpen, setIsOpen }) {
  return (
    <React.Fragment>
      {isOpen && <div className="profile-popup">
        <div className="profile-image"
             style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1)), url('${profile.image}')` }}>
          <div className="close-button" onClick={() => setIsOpen(false)}>
            <svg focusable="false" aria-hidden="true" role="presentation" viewBox="0 0 24 24" width="52px" height="52px"
                 className="Sq(52px)">
              <g transform="translate(2 2)" fillRule="nonzero" fill="black">
                <circle fill="#ff4458" cx="10" cy="10" r="10"/>
                <path
                  d="M9.35 14.561l-.895-1.09-1.301-1.587-.894-1.09c-.358-.437-.19-.794.375-.794h1.733c.096-.661.403-3.178.484-3.732.096-.66.516-1.147 1.146-1.147h.003c.63 0 1.05.487 1.147 1.147.08.554.387 3.071.484 3.732h1.732c.565 0 .734.357.376.793l-.894 1.09-1.302 1.588-.894 1.09c-.357.437-.943.437-1.3 0"
                  fill="#fff"/>
              </g>
            </svg>
          </div>
        </div>
        <div className="profile-info">
          <div className="basic">
            <div className="name">{profile.name}</div>
            <div className="age">25</div>
          </div>
        </div>
        <hr/>
        <div className="bio">
          Ngày nào cũng không biết ăn gì, mệt quá rùi
        </div>
      </div>}
    </React.Fragment>
  )
}

export default React.memo(ProfilePopups)
