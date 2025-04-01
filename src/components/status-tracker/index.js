import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../common';
import { formatDate } from '../../common/customFunctions';

const StatusTracker = ({flatsData,currentFlatIndex}) => {
  const stausBasedColor = flatsData[currentFlatIndex]?.approved === true ? colors.green5 : colors.orangeColor;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.iconLineContainer}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <AntDesign name="checkcircle" size={20} color={colors.green5} />
            <View style={[styles.line, { backgroundColor: colors.green5 }]} />
          </View>
          <View style={styles.statusCon}>
            <Text style={styles.statusText}>Applied</Text>
            {/* <Text>{formatDate(appliedDate)}</Text> */}
          </View>
        </View>
      </View >
      <View style={styles.item}>
        <View style={styles.iconLineContainer}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {
              flatsData[currentFlatIndex]?.approved === true ? <AntDesign name="checkcircle" size={20} color={colors.green5} /> : <MaterialCommunityIcons name="clock-time-four" size={22} color={colors.orangeColor} />
            }
            <View style={[styles.line, {backgroundColor:stausBasedColor }]} />
          </View>
          <View style={[styles.statusCon,{width:'90%',flexDirection:'row',justifyContent:'space-between'}]}>
            <Text style={styles.statusText}>Owner Approval</Text>
          </View>
        </View>
      </View >
      <View style={styles.item}>
        <View style={styles.iconLineContainer}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {
              flatsData[currentFlatIndex]?.approved === true ? <AntDesign name="checkcircle" size={20} color={colors.green5} /> : <Ionicons name="ellipse-outline" size={22} color={colors.gray} />
            }
          </View>
          <View style={styles.statusCon}>
            <Text style={styles.statusText}>Approved</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: '3%'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLineContainer: {
    flexDirection: 'row',
    width:'100%'
  },
  line: {
    width: 2,
    height: 60,
    color: colors.red3,
  },
  statusCon: {
    marginLeft: 10,
  },
  statusText: {
    fontSize: 16,
    color: colors.black3,
    fontWeight: 'bold'
  },
  remainderCon:{
    height:30,
    alignItems:'center',
    padding:5,
    paddingHorizontal:10,
    borderRadius:20,
    borderColor:colors.green5,
    borderWidth:1
  }
});

export default StatusTracker;