import {useEffect, useState} from 'react';
import {baseUrl} from '../src/utils/variables';

const doFetch = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = () => {
  const [mediaArray, setMeadiaArray] = useState([]);
  const getMedia = async () => {
    try {
      const files = await doFetch(baseUrl + 'media');
      const filesWithThumbnail = await Promise.all(
        files.map(async (file) => {
          const response = await fetch(baseUrl + 'media/' + file.file_id);
          return await response.json();
        })
      );
      setMeadiaArray(filesWithThumbnail);
    } catch (error) {
      console.log('getMedia' + error.message);
    }
  };

  useEffect(() => {
    try {
      getMedia();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return {mediaArray};
};

export {useMedia};
