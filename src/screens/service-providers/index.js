import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { DefaultTopBarOne } from '../../common/customFunctions'
import { DefaultApartmentComp } from '../../components'
import { useSelector } from 'react-redux'
import { allTexts, colors, window } from '../../common'

const ServiceProviders = ({ navigation }) => {
    const { selectedApartment } = useSelector((state) => state.cityData);
    const [selectedService, setSelectedService] = useState(null);
    const nivaasTrustedPartners = [
        {
            id: 1,
            name: 'Electrician',
            uri: require('../../utils/assets/images/electrician_One.png'),
        },
        {
            id: 2,
            name: 'Plumbing',
            uri: require('../../utils/assets/images/plumber_One.png'),
        },
        {
            id: 3,
            name: 'Carpenter',
            uri: require('../../utils/assets/images/carpenter_One.png'),
        },
        {
            id: 4,
            name: 'Cleaning',
            uri: require('../../utils/assets/images/cleaner_one.png'),
        },
        {
            id: 5,
            name: 'Painting',
            uri: require('../../utils/assets/images/painter_two.png'),
        },
        {
            id: 6,
            name: 'Lift Service',
            uri: require('../../utils/assets/images/liftService.png'),
          },
    ];
    const handleServicePress = (service) => {
        setSelectedService(service);
        navigation.navigate(allTexts.screenNames.eachServicelist, { name: service?.name ,id : service?.id});
    };
    return (
        <View style={styles.mainCon}>
            {DefaultTopBarOne(navigation, 70, 'Service Providers', true)}
            <DefaultApartmentComp selectedApartment={selectedApartment} />
            <FlatList
                data={nivaasTrustedPartners}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => handleServicePress(item)}
                        style={styles.eachServiceCon}
                    >
                        <View style={styles.imageBg}>
                            <Image source={item?.uri} style={{ height: 50, width: 50 }} />
                        </View>
                        <Text numberOfLines={1} style={styles.textStyle}>{item.name}</Text>
                    </Pressable>
                )}
                numColumns={4}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 20 }}
            />
        </View>
    )
}

export default ServiceProviders

const styles = StyleSheet.create({
    mainCon: {
        height: '100%',
        backgroundColor: colors.white,
    },
    eachServiceCon: {
        alignItems: 'center',
        marginHorizontal: '3%',
        marginVertical: '4%',
        height: window.height * 0.08,
        width: window.width * 0.18,
        justifyContent: 'center',
    },
    imageBg: {
        backgroundColor: colors.gray3,
        paddingVertical: '15%',
        paddingHorizontal: '15%',
        borderRadius: 10,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 12,
        color: colors.black,
        fontWeight: '500',
        textAlign: 'center',
    },
})