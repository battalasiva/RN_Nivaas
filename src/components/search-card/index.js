import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
} from 'react-native';
import {colors} from '../../common';
import React, {useState} from 'react';
import {styles} from './styles';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {ImageLoader} from '..';
import {followUnfollowTemple} from '../../utils/api';

export const SearchCard = ({
  name,
  img,
  location,
  item,
  isFollowTemple,
  id,
  onPress,
}) => {
  const [isFollow, setisFollow] = useState(isFollowTemple);

  const toggleFollow = async () => {
    setisFollow(!isFollow);
    const payload = {
      itemId: id,
      itemType: 'ITEM',
      follow: !isFollow,
    };
    try {
      let results = await followUnfollowTemple(payload);
      if (results && results.status === 200) {
        ToastAndroid.show(
          `Successfully${
            !isFollow ? ' added to' : ' removed from '
          } favorites!`,
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.imgContainer}>
        <ImageLoader resizeMode={'contain'} url={img} imageStyle={styles.img} />
      </View>
      <View style={styles.allTextContainer}>
        <Text style={styles.nameText}>{name}</Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationIcon}>
            <EntypoIcon name="location-pin" color={colors.green} size={22} />
          </View>
          <Text style={styles.locationText}>{location} </Text>
        </View>
      </View>
      <TouchableOpacity onPress={toggleFollow}>
        <Text style={styles.followText}>
          {isFollow ? 'UnFollow' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
};
