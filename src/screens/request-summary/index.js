import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable, FlatList } from 'react-native';
import { DefaultApartmentComp, Loader, StatusTracker, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { allTexts, colors } from '../../common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useLazyGetCustomerOnboardRequestsQuery } from '../../redux/services/cityServices';
import { setCustomerOnboardRequestsData } from '../../redux/slices/currentCustomerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Dimensions } from 'react-native';
import { formatDate, getNewAuthToken } from '../../common/customFunctions';
import { styles } from './style';

const { width: screenWidth } = Dimensions.get('window');

const RequestSummary = ({ navigation }) => {
    const dispatch = useDispatch();
    const profilePic = useSelector(state => state.currentCustomer.profilePicture);
    const customerDetails = useSelector(state => state.currentCustomer);
    const [loader, setloader] = useState(null);
    const [viewSection, setViewSection] = useState('status');
    const [flatsData, setFlatsData] = useState([]);  
    const flatListRef = useRef(null);
    const [currentFlatIndex, setCurrentFlatIndex] = useState(0);    

    const [customeronboardReq] = useLazyGetCustomerOnboardRequestsQuery();
    
    const stausBasedColor = flatsData[currentFlatIndex]?.approved === true ? colors.green5 : colors.orangeColor;

    const toggleSection = (section) => {
        setViewSection(section);
    };

    const handleCurrentCustomerData = () => {
        setloader(true);
        customeronboardReq()
          .unwrap()
          .then(response => {                        
            setloader(false);
            dispatch(setCustomerOnboardRequestsData(response));
            const unapprovedFlats = response?.apartments?.flatMap(apartment =>  
                apartment?.flats
                  .map(flat => ({
                    ...flat,
                    apartment: apartment?.name,
                    accessType: flat?.accessType === 'FLAT_OWNER_FAMILY_MEMBER'
                      ? 'Family Member'
                      : flat?.accessType === 'TENANT'
                      ? 'Tenant'
                      : 'Flat Owner' 
                  }))
              )
              .sort((a, b) => new Date(b?.appliedOn) - new Date(a?.appliedOn)); 
              setFlatsData(unapprovedFlats);       
          })
          .catch(error => {
            setloader(false);
            console.log('error in Customer Onboard Req Data===>', error);
            if (error?.data?.status === 401) {
                getNewAuthToken(dispatch);
            }
          });
    };

    const scrollToNextFlat = () => {
        if (currentFlatIndex < flatsData.length - 1) {
            setCurrentFlatIndex(prev => prev + 1);
            flatListRef.current.scrollToIndex({ index: currentFlatIndex + 1 });
        }
    };

    const scrollToPreviousFlat = () => {
        if (currentFlatIndex > 0) {
            setCurrentFlatIndex(prev => prev - 1);
            flatListRef.current.scrollToIndex({ index: currentFlatIndex - 1 });
        }
    };

    useEffect(() => {
        handleCurrentCustomerData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={{ marginTop: statusBarHeight }}>
                <TopBarCard2 back={true} navscreen={allTexts.screenNames.home} txt={'My Requests'} navigation={navigation} />
            </View>
            {
                loader ? (
                    <Loader
                        color={colors.primaryColor}
                        size={'large'}
                        marginTop={'80%'}
                    />
                ) : (
                    <View>
                    {flatsData?.length > 1 ? (
                        <View style={styles.horizontalScrollCon}>
                            <TouchableOpacity onPress={scrollToPreviousFlat} disabled={currentFlatIndex === 0} >
                                <MaterialCommunityIcons name="chevron-left" size={30}  color={currentFlatIndex === 0 ? colors.gray2 : colors.primaryColor} />
                            </TouchableOpacity>
                            <FlatList
                                ref={flatListRef}
                                data={flatsData}
                                horizontal
                                scrollEnabled={false}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <View style={[styles.apartmentDetailsCons, { width: screenWidth * 0.7 }]}>
                                        <View style={styles.iconCon}>
                                            <MaterialCommunityIcons name='door-open' size={30} color={colors.primaryColor} />
                                        </View>
                                        <View style={styles.content}>
                                            <Text style={styles.apartmentInfo}>{item.flatNo}, {item.apartment}</Text>
                                            <View style={styles.moveinTxtCon}><Text style={[styles.requestType,{color:stausBasedColor}]}>{flatsData[currentFlatIndex]?.approved === true ? 'Move In Approved' : 'Move In Requested'}</Text></View>
                                            {/* <Text style={styles.requestDate}>Applied on - {formatDate(item?.appliedOn)}</Text> */}
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                            />
                            <TouchableOpacity onPress={scrollToNextFlat} disabled={currentFlatIndex === flatsData?.length - 1} >
                                <MaterialCommunityIcons name="chevron-right" size={30} color={currentFlatIndex === flatsData?.length-1 ? colors.gray2 : colors.primaryColor} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.apartmentDetailsCon}>
                            <View style={styles.iconCon}>
                                <MaterialCommunityIcons name='door-open' size={30} color={colors.primaryColor} />
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.apartmentInfo}>{flatsData[0]?.apartment},{flatsData[0]?.flatNo}</Text>
                                <View style={styles.moveinTxtCon}><Text style={[styles.requestType,{color:stausBasedColor}]}>{flatsData[currentFlatIndex]?.approved === true ? 'Move In Approved' : 'Move In Requested'}</Text></View>
                                {/* <Text style={styles.requestDate}>Applied on - {formatDate(flatsData[0]?.appliedOn)}</Text> */}
                            </View>
                        </View>
                    )}
                    <View style={styles.tabContainer}>
                        <Pressable style={viewSection === 'details' ? styles.tabButtonActive : styles.tabButton} onPress={() => toggleSection('details')}>
                            <Text style={viewSection === 'details' ? [styles.tabText, { color: colors.black }] : styles.tabText}>DETAILS</Text>
                        </Pressable>
                        <Pressable style={viewSection === 'status' ? styles.tabButtonActive : styles.tabButton} onPress={() => toggleSection('status')}>
                            <Text style={viewSection === 'status' ? [styles.tabText, { color: colors.black }] : styles.tabText}>STATUS</Text>
                        </Pressable>
                    </View>
                    {viewSection === 'status' ? (
                        <View style={{ marginLeft: '5%' }}>
                            <View style={styles.statusSection}>
                                <View style={styles.UnderreviewCon}>
                                    <Entypo name='back-in-time' size={25} color={colors.black} />
                                    <Text style={styles.UnderreviewText}>APPLICATION STATUS</Text>
                                </View>
                                {
                                    flatsData[currentFlatIndex]?.approved === true ? (
                                        <View style={[styles.UnderreviewCon, { backgroundColor: colors.greenBg, paddingLeft: 30, borderBottomLeftRadius: 30, borderTopLeftRadius: 30 }]}>
                                            <Text style={styles.UnderreviewText}>APPROVED</Text>
                                        </View>
                                    ) : (
                                        <View style={[styles.UnderreviewCon, { backgroundColor: colors.yellowbg, paddingLeft: 30, borderBottomLeftRadius: 30, borderTopLeftRadius: 30 }]}>
                                            <Text style={styles.UnderreviewText}>UNDER REVIEW</Text>
                                        </View>
                                    )
                                }
                            </View>
                            <View>
                                <StatusTracker flatsData={flatsData} currentFlatIndex={currentFlatIndex}/>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <View style={styles.apartmentDetailsCon}>
                                <View style={styles.iconCon}>
                                    {profilePic ? <Image source={{ uri: profilePic }} style={styles.profilePic} /> : <Image source={require('../../utils/assets/images/DefaultProfileImage.jpg')} style={styles.profilePic} />}
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.apartmentInfo}>{customerDetails?.customerOnboardReqData?.user?.name}</Text>
                                    <View style={[styles.tenantTextView,{backgroundColor:stausBasedColor}]}><Text style={styles.tenantText}>{flatsData[currentFlatIndex]?.accessType || flatsData[0]?.accessType}</Text></View>
                                    <View style={styles.eachDetailCon}>
                                        <Ionicons name='call' size={20} color={colors.black} />
                                        <Text style={styles.mobileNOText}>{customerDetails?.customerOnboardReqData?.user?.mobileNumber}</Text>
                                    </View>
                                    <View style={styles.eachDetailCon}>
                                        <MaterialCommunityIcons name='email' size={20} color={colors.black} />
                                        <Text style={styles.mobileNOText}>{customerDetails?.customerOnboardReqData?.user?.email || 'NA'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.approvelStatusCon}>
                                <Text style={styles.moveInTXT}>{flatsData[currentFlatIndex]?.accessType === 'Flat Owner' ? 'Admin approval' : 'Owner Approval'}</Text>
                                    {flatsData[currentFlatIndex]?.approved === true ? (
                                        <View style={styles.pendingCon}>
                                            <AntDesign name="checkcircle" size={20} color={colors.green5} />
                                            <Text>Approved</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.pendingCon}>
                                            <MaterialCommunityIcons name='clock-time-four' size={25} color={colors.orangeColor} />
                                            <Text>Pending</Text>
                                        </View>
                                    )}
                                
                            </View>
                        </View>
                    )}
                    </View>
                )
            }
        </ScrollView>
    );
};

export default RequestSummary;
