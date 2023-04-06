import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';

const Single = () => {
  const {state} = useLocation();
  const file = state.file;
  let allData ={
    description:file.description,
    filters:{
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
    }
  }
  try{
    const allData = JSON.parse(file.description);
  }catch(error){

  };



  return (
    <>
      <Typography component="h1" variant="h2">
        {file.title}
      </Typography>
      <Card>
        <CardMedia
          component={'img'}
          src={mediaUrl + file.filename}
          title={file.title}
          style={{
            width: 300,
            height: 200,
            filter: `brightness(${allData.filters.brightness}%)
            contrast(${allData.filters.contrast}%)
            saturate(${allData.filters.saturation}%)
            sepia(${allData.filters.sepia}%)`,
          }
        />
        <CardContent>
          <Typography variant="body1">{allData.description}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

// TODO in the next task: add propType for location

export default Single;
