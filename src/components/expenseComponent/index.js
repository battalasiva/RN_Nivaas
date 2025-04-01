import { Alert, Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from '../../screens/expences/style'
import { allTexts, colors } from '../../common'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useSelector } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SnackbarComponent } from '../../common/customFunctions'
import { ScrollView } from 'react-native-virtualized-view'

const ExpenseComponent = ({ expancesData, creditsData, handlegetExpancePDF, handleNavigation, handleDebitDelete, handleCreditDelete, selectedYear, selectedMonth, isReadOnly, defaultView, setdefaultView, toggleSection }) => {
  const { selectedApartment } = useSelector(state => state.cityData);
  const { premium } = useSelector(state => state.currentCustomer);
  const debitpdf = 'DEBITPDF';
  const creditPdf = 'CREDITPDF';
  const balencedPdf = 'BALENCEDPDF';
  const handleimagesource = (type) => {
    if (type === 'UTILITIES') {
      return require('../../utils/assets/images/utilities.png')
    } else if (type === 'SERVICES') {
      return require('../../utils/assets/images/services.png')
    } else if (type === 'REPAIRS') {
      return require('../../utils/assets/images/repairs.png')
    } else if (type === 'SALARY') {
      return require('../../utils/assets/images/salary.png')
    } else {
      return require('../../utils/assets/images/Receipt.png')
    }
  }
  const renderDebitItem = data => (
    <Pressable
      onPress={isReadOnly ? () => SnackbarComponent({
        text: 'Apartment Admins Only can update',
        backgroundColor: colors.yellowColor,
      }) : () => handleNavigation(data?.item, 'UPDATE_EXPENCES')}
      style={styles.rowFront}>
      <View style={styles.imageCon}>
        <Image source={handleimagesource(data?.item?.type)} style={{ height: 30, width: 30 }} />
      </View>
      <View style={styles.expenceDataCon}>
        <View style={styles.eachtextCon}>
          <Text style={styles.dataItemText}>{data?.item?.type}</Text>
          <View style={styles.rupeeIconView}>
            <FontAwesome name='rupee' size={15} color={colors.black} style={{ marginRight: '2%', marginTop: '5%' }} />
            <Text style={styles.dataItemText}>{data?.item?.amount}</Text>
          </View>
        </View>
        <View style={styles.eachtextCon}>
          <Text style={{ color: colors.gray }}>{data?.item?.description}</Text>
          <Text style={{ color: colors.gray }}>{data?.item?.transactionDate}</Text>
        </View>
      </View>
      <MaterialIcons name='keyboard-arrow-right' color={colors.gray} size={20} style={{ marginLeft: '1%', marginBottom: '6%' }} />
    </Pressable>
  );
  const renderDebitHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Button
        title="Delete"
        color={isReadOnly ? colors.gray : colors.red3}
        onPress={isReadOnly ? () => SnackbarComponent({
          text: 'Apartment Admins Only can DELETE',
          backgroundColor: colors.yellowColor,
        }) : () => {
          Alert.alert(
            'Delete Confirmation',
            'Are you sure to delete',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'OK',
                onPress: () => handleDebitDelete(data?.item?.id),
              },
            ],
            { cancelable: true },
          );
        }}
      />
    </View>
  );

  const renderCreditItem = data => (
    <Pressable
      onPress={isReadOnly ? () => SnackbarComponent({
        text: 'Apartment Admins Only can update',
        backgroundColor: colors.yellowColor,
      }) : () => handleNavigation(data?.item, 'UPDATE_CREDITS')}
      style={styles.rowFront}>
      <View style={{ backgroundColor: colors.green5, borderRadius: 5 }}>
        <Image source={require('../../utils/assets/images/Receipt.png')} style={{ height: 30, width: 30 }} />
      </View>
      <View style={styles.expenceDataCon}>
        <View style={styles.eachtextCon}>
          <Text style={styles.dataItemText}>{data?.item?.creditType}</Text>
          <View style={styles.rupeeIconView}>
            <FontAwesome name='rupee' size={15} color={colors.black} style={{ marginRight: '2%', marginTop: '5%' }} />
            <Text style={styles.dataItemText}>{data?.item?.amount}</Text>
          </View>
        </View>
        <View style={styles.eachtextCon}>
          <Text style={{ color: colors.gray }}>{data?.item?.description}</Text>
          <Text style={{ color: colors.gray }}>{data?.item?.transactionDate}</Text>
        </View>
      </View>
      <MaterialIcons name='keyboard-arrow-right' color={colors.gray} size={20} style={{ marginLeft: '1%', marginBottom: '6%' }} />
    </Pressable>
  );

  const renderCreditHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Button
        title="Delete"
        color={isReadOnly ? colors.gray : colors.red3}
        onPress={isReadOnly ? () => SnackbarComponent({
          text: 'Apartment Admins Only can DELETE',
          backgroundColor: colors.yellowColor,
        }) : () => {
          Alert.alert(
            'Delete Confirmation',
            'Are you sure to delete',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'OK',
                onPress: () => handleCreditDelete(data?.item?.id),
              },
            ],
            { cancelable: true },
          );
        }}
      />
    </View>
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.DebitCreditCon}>
      <View style={styles.tabContainer}>
        <Pressable style={[defaultView === 'Debit' ? styles.tabButtonActive : styles.tabButton, { flexDirection: 'row', justifyContent: 'center' }]} onPress={() => toggleSection('Debit')}>
          <Text style={defaultView === 'Debit' ? [styles.tabText, { color: colors.black }] : styles.tabText}>Debit</Text>
          {/* {
          (expancesData?.length !== 0) &&  <MaterialCommunityIcons name='file-download' size={22} color={defaultView === 'Debit' ? colors.primaryColor : colors.gray} onPress={defaultView === 'Debit' ? ()=>handlegetExpancePDF(selectedApartment?.id,selectedYear,selectedMonth?.index,debitpdf) : null}/>
        } */}
        </Pressable>
        <Pressable style={defaultView === 'Credit' ? styles.tabButtonActive : styles.tabButton} onPress={() => toggleSection('Credit')}>
          <Text style={defaultView === 'Credit' ? [styles.tabText, { color: colors.black }] : styles.tabText}>Credit</Text>
        </Pressable>
      </View>
      {
        defaultView === 'Debit' ? (
          selectedApartment?.id && expancesData?.length !== 0 ? (
            <>
              <SwipeListView
                data={expancesData}
                renderItem={renderDebitItem}
                renderHiddenItem={renderDebitHiddenItem}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
              <View style={styles.downloadButton}>
                <TouchableOpacity
                  onPress={() =>
                    handlegetExpancePDF(
                      selectedApartment?.id,
                      selectedYear,
                      selectedMonth?.index,
                      debitpdf,
                    )
                  }>
                  <Text style={styles.clickHereText}>CLICK HERE</Text>
                </TouchableOpacity>
                <Text style={styles.downloadText}>
                  To Download PDF Report
                </Text>
              </View>
            </>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.errorText}>
                {allTexts.paragraphs.NoItemsText}
              </Text>
            </View>
          )
        ) : (
          selectedApartment?.id && creditsData?.length !== 0 ? (
            <>
              <SwipeListView
                data={creditsData}
                renderItem={renderCreditItem}
                renderHiddenItem={renderCreditHiddenItem}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
              <View style={styles.downloadButton}>
                <TouchableOpacity
                  onPress={() =>
                    handlegetExpancePDF(
                      selectedApartment?.id,
                      selectedYear,
                      selectedMonth?.index,
                      debitpdf,
                    )
                  }>
                  <Text style={styles.clickHereText}>CLICK HERE</Text>
                </TouchableOpacity>
                <Text style={styles.downloadText}>
                  To Download PDF Report
                </Text>
              </View>
            </>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.errorText}>
                {allTexts.paragraphs.NoItemsText}
              </Text>
            </View>
          )
        )
      }
      {/* {((expancesData?.length !== 0 || creditsData?.length !== 0) ) && (
     
    )} */}
    </ScrollView>
  )
}

export default ExpenseComponent;