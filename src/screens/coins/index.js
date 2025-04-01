import { FlatList, Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DefaultTopBarOne, getNewAuthToken } from '../../common/customFunctions';
import { colors } from '../../common';
import moment from 'moment';
import { useLazyGetcoinsByApartmentQuery, useLazyGetcoinsHistoryQuery } from '../../redux/services/coinsAndPaymentsService';
import { FontAwesome, MaterialCommunityIcons } from '../../common/icons';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultApartmentComp, Loader } from '../../components';
import { styles } from './style';

const Coins = ({ navigation }) => {
    const dispatch = useDispatch();
    const { selectedApartment } = useSelector(state => state.cityData);    
    const [currentBalance, setcurrentBalance] = useState(0);
    const [loader, setloader] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [getCoinsBalance] = useLazyGetcoinsByApartmentQuery();
    const [getCoinsHistory] = useLazyGetcoinsHistoryQuery();

    const handlegetCoinsBalance = async () => {
        const payload = {
            apartmentId: selectedApartment?.id
        }
        try {
            const responce = await getCoinsBalance(payload).unwrap();
            setcurrentBalance(responce);
            console.log('RES OF CURRENT COINS BALENCE',responce);
        } catch (error) {
            console.log('ERROR IN COINS BALENCE', error);
            if (error?.data?.status === 401) {
                getNewAuthToken(dispatch);
            }
        }
    }
    const handlegetCoinsHistory = async () => {
        const payload = {
            apartmentId: selectedApartment?.id,
            pageNo: 0,
            pageSize: 10
        }
        setloader(true);
        try {
            const responce = await getCoinsHistory(payload).unwrap();
            console.log('COINS HISTORY',responce);
            
            setTransactionData(responce?.content);
            setloader(false);
        } catch (error) {
            setloader(false);
            if (error?.data?.status === 401) {
                getNewAuthToken(dispatch);
            }
            console.log('ERR IN COINS HISTORY', error);
        }
    }
    useEffect(() => {
        handlegetCoinsBalance();
        handlegetCoinsHistory();
    }, [])

    return (
        <View style={styles.mainCon}>
            {DefaultTopBarOne(navigation, 0, 'Coins')}
            <DefaultApartmentComp selectedApartment={selectedApartment} />
            <View style={styles.currentbalCon}>
                <View>
                <Text style={styles.balanceTitle}>Total Wallet Balance</Text>
                <View style={styles.balanceRow}>
                    <FontAwesome name='rupee' size={25} color={colors.black} />
                    <Text style={[styles.balanceAmount, { marginBottom: 3 }]}>{currentBalance}</Text>
                </View>
                </View>
                <Image source={require('../../utils/assets/images/coins.png')} style={{height:80,width:50}}/>
            </View>
            <Text style={styles.recentTransactionsTitle}>Recent Wallet Transaction</Text>
            {
                loader ? (
                    <View>
                        <Loader
                            color={colors.primaryColor}
                            size={'large'}
                            marginTop={'40%'}
                        />
                    </View>
                ) : (
                    <FlatList
                        data={transactionData}
                        renderItem={({ item }) => (
                            <View style={styles.eachItemCon}>
                                <View style={styles.transactionRow}>
                                    <View style={{ backgroundColor: colors.gray3, alignItems: 'center', borderRadius: 20, padding: 10, marginRight: '5%' }}>
                                        <MaterialCommunityIcons
                                            name={item?.transactionType === 'CREDIT' ? 'arrow-bottom-left' : 'arrow-top-right'}
                                            size={20}
                                            color={item?.transactionType === 'CREDIT' ? colors.green5 : colors.red3}
                                        />
                                    </View>
                                    <View>
                                        <View style={styles.transactionInfo}>
                                            <Text style={styles.transactionType}>
                                                {item?.transactionType === 'CREDIT' ? 'Amount Credited' : 'Amount Debited'}
                                            </Text>
                                            <View style={styles.amountRow}>
                                                <FontAwesome name='rupee' size={16} color={colors.black} />
                                                <Text style={[styles.transactionAmount, { marginBottom: 2 }]}>{item?.amount?.toFixed(2)}</Text>
                                            </View>
                                        </View>
                                        <Text style={[styles.transactionTime,{fontSize:13}]}>
                                            {item?.notes}
                                        </Text>
                                        <Text style={styles.transactionTime}>
                                        {moment(item?.transactionDate).format('DD-MM-YYYY hh:mm A')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: '5%' }}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyContainer}>
                                <Image
                                    source={require('../../utils/assets/images/dataNotFoundImage.png')}
                                    style={styles.emptyImage}
                                />
                            </View>
                        )}
                    />
                )
            }
        </View>
    );
};

export default Coins;