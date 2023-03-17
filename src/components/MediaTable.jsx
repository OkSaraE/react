import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';
import MediaRow from './Mediarow';

const MediaTable = () => {
  const [mediaArray, setMeadiaArray] = useState([]);
  const getMedia = async () => {
    const response = await fetch(baseUrl + 'media');
    const files = await response.json();
    const filesWithThumbnail = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(baseUrl + 'media/' + file.file_id);
        return await response.json();
      })
    );
    setMeadiaArray(filesWithThumbnail);
  };

  useEffect(() => {
    try {
      getMedia();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  console.log(mediaArray);

  return (
    <table>
      <tbody>
        {mediaArray.map((item, index) => {
          return <MediaRow key={index} file={item} />;
        })}
      </tbody>
    </table>
  );
};

export default MediaTable;
