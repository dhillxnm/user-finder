import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import '../css/index.css';
import { motion } from 'framer-motion';

const Search = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/${username}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: {  ease: "easeInOut", duration: 0.8, delay: 0.8 } }}
      exit={{ opacity: 0, y: -20, transition: { ease: "easeInOut", duration: 0.4}}}
    >
    <div className="search-container">
       <div className="input-icon"><FaGithub /></div>
        <div className='text-border'>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
           </div>
          </form>
        </div>
    </div>
    </motion.div>
  );
};

export default Search;
