import React, { useState } from 'react';
import axios from 'axios';
const TestFile = () => {
  const informationTopost = {};

  const SubmitInfo = async (e) => {
    e.preventDefault();

    axios.post('/signin', informationTopost).then((res) => {
      localStorage.setItem('course', res.data);
    });
  };

  return (
    <form onSubmit={SubmitInfo}>
      <input type="text" />
      <input type="text" />
      <input type="text" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default TestFile;
