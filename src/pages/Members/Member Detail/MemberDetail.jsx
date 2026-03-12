
import { useParams } from "react-router-dom";
import "./MemberDetail.css";

const MemberDetails = () => {

  const { id } = useParams();

  return (
    <div className="member-details">

      {/* Profile Header */}

      <div className="profile-header">

        <div className="profile-left">

          <img
            src={`https://ui-avatars.com/api/?name=Member+${id}&background=random`}
            alt="member"
            className="profile-img"
          />

          <div>
            <h2>Member {id}</h2>
            <span className="member-tag">FOUNDING MEMBER</span>

            <p className="member-id">ID: GYM-{id}221</p>
          </div>

        </div>

        <div className="profile-actions">
          <button className="btn edit">Edit Profile</button>
          <button className="btn freeze">Freeze</button>
          <button className="btn membership">Membership Action</button>
        </div>

      </div>


      {/* Cards */}

      <div className="detail-grid">

        {/* Bio */}

        <div className="card">
          <h3>Bio & Contact</h3>

          <div className="info-box">
            <p className="label">Email</p>
            <p>member{id}@gym.com</p>
          </div>

          <div className="info-box">
            <p className="label">Phone</p>
            <p>+91 9876543210</p>
          </div>

          <div className="info-box">
            <p className="label">Birth Date</p>
            <p>12 Jan 1995</p>
          </div>

        </div>


        {/* Membership */}

        <div className="card">

          <h3>Membership</h3>

          <div className="membership-box">

            <p className="plan">Premium Plan</p>
            <h2>$79.99 /month</h2>

          </div>

          <p>Renewal Date: Nov 12, 2024</p>
          <p>Payment: **** 4242</p>

        </div>


        {/* Wellness */}

        <div className="card">

          <h3>Body Wellness</h3>

          <div className="progress-box">
            <p>Weight</p>

            <div className="progress">
              <div className="progress-fill weight"></div>
            </div>
          </div>

          <div className="progress-box">
            <p>Body Fat</p>

            <div className="progress">
              <div className="progress-fill fat"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default MemberDetails;