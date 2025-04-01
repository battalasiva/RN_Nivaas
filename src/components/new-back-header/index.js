/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { colors } from '../../common';
export const NewBackHeader = ({
    txtColor,
    onPress,
    txt,
    isPlus,
    onPlusPress,
    isBell,
}) => {
    return (
        <View style={styles.header}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
                    {/* <Fontisto
                        name="arrow-left"
                        size={17}
                        color={'black'}
                    /> */}
                    <Image source={require('../../../assets/images/backarrow.png')} 
                    style={{height: 10, width:6}} />
                </TouchableOpacity>
                {txt && (
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginHorizontal: '25%',
                            color: 'white',
                            alignSelf: 'center'
                        }}>
                        {txt}
                    </Text>
                )}
            </View>

            {isPlus && (
                <TouchableOpacity onPress={onPlusPress}>
                    <AntDesign
                        name="plus"
                        size={24}
                        color={txtColor === undefined ? <></> : txtColor}
                    />
                </TouchableOpacity>
            )}
            {isBell && (
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/bell.png')} style={{ height: 25, width: 25, marginRight: '2%' }} />
                </TouchableOpacity>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '8%',
    },
    iconContainer: {
        height: 30,
        width: 30,
        borderRadius: 100,
        alignItems: 'center',
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
})