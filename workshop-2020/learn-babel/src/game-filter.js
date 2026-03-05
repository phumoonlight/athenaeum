// babel required

import fs from 'fs';
import allGameList from './game';

const getGameID = (game) => {
  const urlArray = game.link.split('/');
  const gameID = urlArray[4];
  return gameID;
};

const getHost = (game) => {
  const searchHostName = game.link.search('steam');
  const host = game.link.substr(searchHostName, 5);
  return host;
};

const getDiscount = (game) => {
  const strArray = game.title.split(' ');
  let discount = strArray[1];
  discount = discount.replace('%', '');
  return parseInt(discount, 10);
};

const createGameObject = (game) => {
  const gameObject = {
    id: getGameID(game),
    host: getHost(game),
    url: game.link,
    name: game.name,
    discount_percent: getDiscount(game),
    image: game.image,
    update_at: new Date().toISOString(),
  };
  return gameObject;
};

// Main
const noTagGameList = allGameList.filter(game => game.tags.length === 0);
let noTagGameListNewFormat = [];
noTagGameList.forEach((game) => {
  const gameObject = createGameObject(game);
  noTagGameListNewFormat = noTagGameListNewFormat.concat(gameObject);
});
noTagGameListNewFormat = JSON.stringify(noTagGameListNewFormat, null, 2);
fs.writeFileSync('gametag/.json', noTagGameListNewFormat, (error) => { if (error) throw error; });

allGameList.forEach((game) => {
  let gameObject = createGameObject(game);
  game.tags.forEach((tags) => {
    if (tags === '+') return;
    if (fs.existsSync(`gametag/${tags}.json`)) {
      let dataFromTagFile = fs.readFileSync(`gametag/${tags}.json`);
      dataFromTagFile = JSON.parse(dataFromTagFile);
      if (dataFromTagFile.findIndex(file => file.id === gameObject.id) !== -1) return;
      gameObject = [...dataFromTagFile, gameObject];
    }
    const gameJson = JSON.stringify(gameObject, null, 2);
    fs.writeFileSync(`gametag/${tags}.json`, gameJson, (error) => { if (error) throw error; });
    console.log(`writefile: gametag/${tags}.json`);
  });
});

// let tagList = getTagList();
// tagList = removeDuplicateTag(tagList);

// let gameListNoTag = gameJSON.filter(game => game.tags.length === 0);
// gameListNoTag = JSON.stringify(gameListNoTag, null, 2);
// fs.writeFile('gametag/.json', gameListNoTag, (error) => {
//   if (error) throw error;
// });

// tagList.forEach((tag) => {
//   let gameList = gameJSON.filter(game => game.tags.includes(tag));
//   gameList = JSON.stringify(gameList, null, 2);
//   fs.writeFile(`gametag/${tag}.json`, gameList, (error) => {
//     if (error) throw error;
//   });
// });
