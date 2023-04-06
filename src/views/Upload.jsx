import PropTypes from 'prop-types';
import {Box, Button, Slider} from '@mui/material';
import useForm from '../hooks/FormHooks';
import {useState} from 'react';
import {useMedia, useTag} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';
import {appId} from '../utils/variables';

const Upload = (props) => {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const filterInitValues = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const doUpload = async () => {
    try {
      const data = new FormData();
      data.append('title', inputs.title);
      const allData = {
        description: inputs.description,
        filters: filterInputs,
      };
      data.append('description', JSON.stringify(allData));
      data.append('file', file);
      const userToken = localStorage.getItem('userToken');
      const uploadResult = await postMedia(data, userToken);
      const tagResult = await postTag(
        {
          file_id: uploadResult.file_id,
          tag: appId,
        },
        userToken
      );
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = (event) => {
    event.persist();
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setSelectedImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doUpload,
    initValues
  );

  const {inputs: filterInputs, handleInputChange: handleFilterChange} = useForm(
    null,
    filterInitValues
  );

  return (
    <Box>
      <img
        src={selectedImage}
        alt="preview"
        style={{
          width: 300,
          height: 200,
          filter: `brightness(${filterInputs.brightness}%)
          contrast(${filterInputs.contrast}%)
          saturate(${filterInputs.saturation}%)
          sepia(${filterInputs.sepia}%)`,
        }}
      ></img>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type="text"
          name="title"
          value={inputs.title}
        ></input>
        <textarea
          onChange={handleInputChange}
          name="description"
          value={inputs.description}
        ></textarea>
        <input
          onChange={handleFileChange}
          type="file"
          name="file"
          accept="image/*, video/*, audio/*"
        ></input>
        <Button type="submit">Upload</Button>
      </form>
      <Slider
        name="Brightness"
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.brightness}
      />
      <Slider
        name="Contrast"
        defaultValue={50}
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.contrast}
      />
      <Slider
        name="Saturation"
        defaultValue={50}
        min={0}
        max={200}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.saturation}
      />
      <Slider
        name="Sepia"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="auto"
        onChange={handleFilterChange}
        value={filterInputs.sepia}
      />
    </Box>
  );
};

Upload.propTypes = {};

export default Upload;
