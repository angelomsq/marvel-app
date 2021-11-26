export interface ICharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  // modified: string;
  // resourceURI: string;
  // urls: [];
  // comics: [];
  // stories: [];
  // events: [];
  // series: [];
}
