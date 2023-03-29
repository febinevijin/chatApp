import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";


const ImageUploader = () => {

    const [image, setImage] = useState()
  
    const submitFile = async (e) => {
      e.preventDefault();
      console.log(image);
      const formData = new FormData()
      formData.append("image", image)
        try {
            // const config = {
            //   headers: {
            //     'Content-Type': 'multipart/form-data',
            //   },
            // };
              const { data } = await axios.post(
                "/api/user/image",
                formData,
              
              );
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }
    
  return (
    <div>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit" onClick={submitFile}>
        Submit
      </Button>
    </div>
  );
}

export default ImageUploader
