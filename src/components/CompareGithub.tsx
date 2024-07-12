import React, { useEffect, useState } from 'react';

export default function GithubStarTable({ repos }) {
  const [repoData, setRepoData] = useState([]);

  useEffect(() => {
    const fetchRepoStars = async (repoUrl) => {
      const apiUrl = `https://api.github.com/repos/${repoUrl}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return {
        name: data.full_name,
        stars: formatNumber(data.stargazers_count),
        url: data.html_url
      };
    };

    Promise.all(repos.map(repoUrl => fetchRepoStars(repoUrl)))
      .then(data => {
        const sortedData = data.sort((a, b) => parseFloat(b.stars) - parseFloat(a.stars));
        setRepoData(sortedData);
      });
  }, [repos]);

  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Repository</th>
          <th>Stars</th>
          <th>GitHub Link</th>
        </tr>
      </thead>
      <tbody>
        {repoData.map((repo, index) => (
          <tr key={index}>
            <td>{repo.name}</td>
            <td>{repo.stars}</td>
            <td><a href={repo.url} target="_blank" rel="noopener noreferrer">Visit</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
