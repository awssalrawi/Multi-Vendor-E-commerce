import React from 'react';
import './styles/admin-create-user.scss';
const AdminCreateUser = () => {
  return (
    <div className="ad-newuser">
      <h1 className="ad-newuser__title">New User</h1>
      <form action="#" className="ad-newuser__form">
        <div className="newUserField">
          <label htmlFor="">User Name</label>
          <input
            type="text"
            className="newUserField-input"
            placeholder="John"
          />
        </div>
        <div className="newUserField">
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            className="newUserField-input"
            placeholder="John Smith"
          />
        </div>
        <div className="newUserField">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="newUserField-input"
            placeholder="name@example.com"
          />
        </div>
        <div className="newUserField">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="newUserField-input"
            placeholder="Password"
          />
        </div>

        <div className="newUserField">
          <label htmlFor="">Phone Number</label>
          <input
            type="text"
            className="newUserField-input"
            placeholder="5598554785"
          />
        </div>
        <div className="newUserField">
          <label htmlFor="">Address</label>
          <textarea
            type="text"
            className="newUserField-input addressAlan"
          ></textarea>
        </div>
        <div className="newUserField">
          <label htmlFor="">Gender</label>
          <div className="newUserField__gender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className="newUserField">
          <label htmlFor="">Active</label>
          <select name="active" id="active" className="newUser-select">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUser-button">Create</button>
      </form>
    </div>
  );
};

export default AdminCreateUser;
