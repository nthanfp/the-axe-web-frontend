import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectBar = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    navigate(selectedValue); // Navigate to the selected route
  };

  return (
    <div className="form-group">
      <select
        name="Navigation-Select"
        id="Navigation-Select"
        className="form-control"
        value={value}
        onChange={handleChange}
      >
        <option value="">-- Navigation --</option>
        <optgroup label="Account">
          <option value="/account">Dashboard</option>
          <option value="/account/update-profile">Edit Profile</option>
          <option value="/account/change-password">Change Password</option>
          <option value="/account/logout">Logout</option>
        </optgroup>
      </select>
    </div>
  );
};

export default SelectBar;
