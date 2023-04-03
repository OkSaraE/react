import {ImageList} from '@mui/material';
import {useMedia} from '../hooks/apiHooks';
import MediaRow from './Mediarow';

const MediaTable = () => {
  const {mediaArray} = useMedia();
  return (
    <ImageList>
      {mediaArray.map((item, index) => {
        return <MediaRow key={index} file={item} />;
      })}
    </ImageList>
  );
};

export default MediaTable;
