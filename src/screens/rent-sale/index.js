import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { DefaultTopBarOne, getNewAuthToken, SnackbarComponent } from '../../common/customFunctions';
import { useLazyGetFlatDetailsListQuery, usePostFlatDetailsMutation } from '../../redux/services/cityServices';
import { CustomSelectDropdown, PrimaryButton } from '../../components';
import { styles } from '../manage-flats/style';
import { allTexts, colors } from '../../common';
import { validateRentSaleFields } from '../../common/schemas';
import { useDispatch } from 'react-redux';

const RentSale = ({ navigation, route }) => {
    const { selectedFlatID } = route?.params || {};
    const dispatch = useDispatch();
    const [noOfRooms, setNoOfRooms] = useState();
    const [sqFeet, setSqFeet] = useState();
    const [floorNo, setFloorNo] = useState();
    const [parkingAvailable, setParkingAvailable] = useState(null);
    const [facing, setFacing] = useState(null);
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({});
    const [postFlatDetails] = usePostFlatDetailsMutation();
    const [getFlatDetails] = useLazyGetFlatDetailsListQuery();

    const handleSubmit = () => {
        const fields = {
            noOfRooms: noOfRooms,
            sqFeet: sqFeet,
            parkingAvailable: parkingAvailable?.name,
            floorNo: floorNo,
            facing: facing?.name,
        };
        const validationErrors = validateRentSaleFields(fields);
        const filteredErrors = Object.keys(validationErrors).reduce((acc, key) => {
            if (!fields[key] || fields[key].toString().trim() === '') {
                acc[key] = validationErrors[key];
            }
            return acc;
        }, {});

        if (Object.keys(filteredErrors).length > 0) {
            setErrors(filteredErrors);
            return;
        }
        setLoader(true);
        const flatPayload = {
            flatId: selectedFlatID,
            payload: fields,
        };
        console.log(flatPayload, 'PAYLOAD');
        postFlatDetails(flatPayload)
            .unwrap()
            .then((response) => {
                setLoader(false);
                console.log(response);
                navigation.goBack();
                SnackbarComponent({ text: 'Flat Details Added', backgroundColor: colors.green5 });
            })
            .catch((error) => {
                setLoader(false);
                console.log(error);
                if (error?.data?.errorCode === 1006) {
                    SnackbarComponent({ text: error?.data?.errorMessage || 'Error in Adding Flats', backgroundColor: colors.red3 });
                }
            });
    };

    const handleGetFlatDetails = () => {
        const payload = {
            flatId: selectedFlatID,
        };
        getFlatDetails(payload)
            .unwrap()
            .then((response) => {
                console.log(response);
                setErrors(null);
                setNoOfRooms(response?.totalRooms || '');
                setSqFeet(response?.squareFeet?.toString() || '');
                setFloorNo(response?.floorNo?.toString() || '');
                setParkingAvailable(
                    allTexts?.yesOrNo?.find((item) => item?.name?.toUpperCase() === response?.parkingAvailable?.toString().toUpperCase()) || null
                );
                setFacing(
                    allTexts?.directions?.find((item) => item?.name?.toUpperCase() === response?.facing?.toUpperCase()) || null
                );
            })
            .catch((error) => {
                console.log(error);
                if (error?.data?.status === 401) {
                    getNewAuthToken(dispatch);
                }
            });
    };

    useEffect(() => {
        handleGetFlatDetails();
    }, []);

    return (
        <View>
            {DefaultTopBarOne(navigation, 0, 'Add More Details', true)}
            <View style={[styles.modalContent, { height: '100%' }]}>
                <View>
                    <Text style={updatedStyles.heading}>Your Flat Is </Text>
                    <View style={updatedStyles.bhkContainer}>
                        {['1 BHK', '2 BHK', '3 BHK'].map((option, index) => (
                            <Pressable
                                key={index}
                                style={[
                                    updatedStyles.bhkButton,
                                    noOfRooms === index + 1 && updatedStyles.bhkButtonActive,
                                ]}
                                onPress={() => {
                                    setNoOfRooms(index + 1);
                                    setErrors((prev) => ({ ...prev, noOfRooms: '' }));
                                }}
                            >
                                <Text
                                    style={[
                                        updatedStyles.bhkButtonText,
                                        noOfRooms === index + 1 && updatedStyles.bhkButtonTextActive,
                                    ]}
                                >
                                    {option}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    <View style={updatedStyles.errorContainer}>
                        {errors?.noOfRooms && <Text style={updatedStyles.errorText}>{errors.noOfRooms}</Text>}
                    </View>

                    <Text style={updatedStyles.heading}>Square Feet</Text>
                    <TextInput
                        style={[styles.input, { marginBottom: 0 }]}
                        value={sqFeet}
                        onChangeText={(value) => {
                            setSqFeet(value);
                            setErrors((prev) => ({ ...prev, sqFeet: '' }));
                        }}
                        placeholder="Enter Square Feet"
                        keyboardType="numeric"
                    />
                    <View style={updatedStyles.errorContainer}>
                        {errors?.sqFeet && <Text style={updatedStyles.errorText}>{errors.sqFeet}</Text>}
                    </View>
                    <Text style={updatedStyles.heading}>Floor Number</Text>
                    <TextInput
                        style={[styles.input, { marginBottom: 0 }]}
                        value={floorNo}
                        onChangeText={(value) => {
                            setFloorNo(value);
                            setErrors((prev) => ({ ...prev, floorNo: '' }));
                        }}
                        placeholder="Enter Floor Number"
                        keyboardType="numeric"
                        maxLength={2}
                    />
                    <View style={updatedStyles.errorContainer}>
                        {errors?.floorNo && <Text style={updatedStyles.errorText}>{errors.floorNo}</Text>}
                    </View>
                    <View style={updatedStyles.dropdownCon}>
                        <View style={{ width: '50%' }}>
                            <Text style={[updatedStyles.heading,{marginLeft:5}]}>Parking</Text>
                            <View style={updatedStyles.selectDropdown}>
                                <CustomSelectDropdown
                                    data={allTexts.yesOrNo}
                                    onSelect={(item) => {
                                        setParkingAvailable(item);
                                        setErrors((prev) => ({ ...prev, parkingAvailable: '' }));
                                    }}
                                    selectedItem={parkingAvailable}
                                    placeholder="Parking"
                                />
                            </View>
                            <View style={updatedStyles.errorContainer}>
                                {errors?.parkingAvailable && (
                                    <Text style={updatedStyles.errorText}>{errors.parkingAvailable}</Text>
                                )}
                            </View>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={[updatedStyles.heading,{marginLeft:5}]}>Facing</Text>
                            <View style={updatedStyles.selectDropdown}>
                                <CustomSelectDropdown
                                    data={allTexts.directions}
                                    onSelect={(item) => {
                                        setFacing(item);
                                        setErrors((prev) => ({ ...prev, facing: '' }));
                                    }}
                                    selectedItem={facing}
                                    placeholder="Facing"
                                />
                            </View>
                            <View style={updatedStyles.errorContainer}>
                                {errors?.facing && <Text style={updatedStyles.errorText}>{errors.facing}</Text>}
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <PrimaryButton
                        text="SAVE"
                        bgColor={colors.primaryColor}
                        onPress={handleSubmit}
                        loading={loader}
                    />
                </View>
            </View>
        </View>
    );
};

const updatedStyles = StyleSheet.create({
    heading: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.black,
        marginBottom: 2,
        marginTop: '2%',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
    },
    errorContainer: {
        height: 16,
        marginBottom: 2,
    },
    dropdownCon: {
        marginVertical: '1%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectDropdown: {
        height: 40,
        width: '100%',
    },

    heading: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.black,
        marginBottom: 8,
    },
    bhkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    bhkButton: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 20,
        padding: '2.5%',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: '2%',
    },
    bhkButtonActive: {
        backgroundColor: colors.primaryColor,
        borderColor: colors.primaryColor,
    },
    bhkButtonText: {
        color: colors.black,
        fontSize: 15,
        fontWeight:'500'
    },
    bhkButtonTextActive: {
        color: colors.white,
        fontWeight:'700'
    },
});

export default RentSale;