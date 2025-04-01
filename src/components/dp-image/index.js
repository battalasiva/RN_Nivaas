import React, {useState} from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../common';
import {CurrentCustomerDetails, SnackbarComponent} from '../../common/customFunctions';
import {usePostProfilePicMutation} from '../../redux/services/myAccountService';
import {setprofilePic} from '../../redux/slices/currentCustomerSlice';
import { Loader } from '../loader';

const DpImage = ({customerId}) => {
  const [loader, setLoader] = useState(false);
  const [uploadImage] = usePostProfilePicMutation();
  const dispatch = useDispatch();
  const profilePic = useSelector(state => state.currentCustomer.profilePicture);

  const getImageObj = img => {
    let newUri = Platform.OS === 'ios' ? img : img?.replace('file://', 'file:');
    let imageObj = {
      uri: newUri,
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
    };
    return imageObj;
  };
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        if (Platform.OS === 'ios') {
          handleUpload(response.assets[0].uri);
        } else {
          cropImage(response.assets[0].uri);
        }
       
      }
    });
  };
  const cropImage = uri => {
    ImageCropPicker.openCropper({
      path: uri,
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        handleUpload(image.path);
      })
      .catch(error => {
        console.log('Error cropping image: ', error);
        SnackbarComponent({
          text: 'Failed To Crop Image',
          backgroundColor: colors.red3,
        });
      });
  };

  const handleUpload = async uri => {
    let img = getImageObj(uri);
    const formdata = new FormData();
    formdata.append('profilePicture', img);
    console.log(formdata._parts);
    setLoader(true);
    uploadImage(formdata)
      .unwrap()
      .then(response => {
        setLoader(false);
        console.log('Image uploaded successfully', response?.url);
        SnackbarComponent({
          text: response?.message || 'Image Uploaded Successfully',
          backgroundColor: colors.green5,
        });
        dispatch(setprofilePic(response?.url));
      })
      .catch(error => {
        console.error('Error uploading image', error);
        setLoader(false);
        SnackbarComponent({
          text: 'Image Not Uploaded',
          backgroundColor: colors.red3,
        });
      });
  };

  return (
    <TouchableOpacity style={styles.profileImage} onPress={selectImage}>
      {
        loader ? (
          <View style={styles.loader}>
            <Loader marginTop={"20%"} color={colors.primaryColor} size={'small'} />
          </View>
        ) : (
          profilePic ? <Image source={{uri: profilePic}} style={styles.image} /> : <Image source={require('../../utils/assets/images/DefaultProfileImage.jpg')} style={styles.image} />
        )
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  loader:{    
    alignItems:'center',
    justifyContent:"center"
  }
});

export default DpImage;
