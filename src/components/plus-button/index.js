import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors, window } from '../../common'

const PlusButton = ({navigation,screenName}) => {
  return (
    <Pressable style={styles.addButton} onPress={()=>navigation.navigate(screenName)}>
        <MaterialIcons name="add-box" size={25} color={colors.white} />
    </Pressable>
  )
}

export default PlusButton

const styles = StyleSheet.create({
    addButton: {
        marginHorizontal: window.width * 0.04,
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: colors.primaryColor,
        width: 60,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 2, 
      },
})