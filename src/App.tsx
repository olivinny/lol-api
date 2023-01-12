import React, { useState } from 'react';

import axios from 'axios';

import { API_BASE_URL, API_KEY } from './constants';

function App() {
  const [playerSearch, setPlayerSearch] = useState('');
  const [playerData, setPlayerData] = useState({
    accountId: undefined,
    id: undefined,
    name: undefined,
    profileIconId: undefined,
    puuid: undefined,
    revisionDate: undefined,
    summonerLevel: undefined,
  });

  function searchPlayerBySummonerName() {
    const APICallString = `${API_BASE_URL}/lol/summoner/v4/summoners/by-name/${playerSearch}?api_key=${API_KEY}`;
    axios
      .get(APICallString)
      .then((resposta) => {
        setPlayerData(resposta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <h5>Entre com seu nome de invocador</h5>
        <input onChange={(e) => setPlayerSearch(e.target.value)} />
        <button
          onClick={(e) => {
            searchPlayerBySummonerName();
          }}
        >
          vai
        </button>

        {playerData.name !== undefined ? (
          <div>
            <br />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${playerData.profileIconId}.png`}
              alt=""
            />
            <p>{playerData.name}</p>
            <p>lvl: {playerData.summonerLevel}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
