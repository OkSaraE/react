import {ImageListItem, ImageListItemBar, Button} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';

const MediaRow = ({file}) => {
  return (
    <ImageListItem>
      <img src={mediaUrl + file.thumbnails.w640} alt="Title" />
      <ImageListItemBar
        tittle={file.title}
        subtitle={file.description}
        actionIcon={
          <Button
            component={Link}
            variant="contained"
            to="/single"
            state={{file}}
          >
            View
          </Button>
        }
      />
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
};

export default MediaRow;
