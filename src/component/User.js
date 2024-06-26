import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const User = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // No token is used here, making it a public API request
        const [userResponse, reposResponse] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/users/${username}/repos`),
        ]);
        setUserData(userResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { ease: "easeInOut", duration: 0.8, delay: 0.8 } }}
      exit={{ opacity: 0, y: -20, transition: { ease: "easeInOut", duration: 0.4}}}
    >
      <div className="user-container">
        <div className="user-profile grid">
          <div className='img'>
            <img src={userData.avatar_url} alt={userData.login} />
          </div>
          <h2>{userData.login}</h2>
          <div className='followers-info'>
            <div><p>{userData.public_repos}</p><div>Repositories</div></div>
            <div><p>{userData.followers}</p><div>Followers</div></div>
            <div><p>{userData.following}</p><div>Following</div></div>
          </div>
          <div>
            <a className='github-link' href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noopener noreferrer">
              Go to GitHub
            </a>
          </div>
        </div>
        <div className="repo-list">
          <h3 className='repo-header'> My Repositories</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a className='projects' href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
                {repo.description && <p className='description'>{repo.description}</p>}
                <div className="last-updated">
                  updated at {formatDate(repo.updated_at)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default User;
