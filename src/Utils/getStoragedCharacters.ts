import { ICharacter } from './interfaces/ICharacter';

const getStoragedCharacters = (): ICharacter[] => {
  const storagedCharacters = localStorage.getItem(
    '@MarvelChallenge:characters',
  );
  if (storagedCharacters) {
    return JSON.parse(storagedCharacters);
  }
  return [];
};

export default getStoragedCharacters;
