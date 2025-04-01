import {Pressable, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {allTexts, colors} from '../../common';
import {
  CustomSelectDropdown,
  DefaultApartmentComp,
  ExpenseComponent,
  FaqButton,
  Loader,
  PrimaryButton,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  useDeleteCreditHistoryMutation,
  useDeleteExpancesMutation,
  useLazyGetallCreditsQuery,
  useLazyGetAllExpancesQuery,
  useLazyGetCurrentBalenceQuery,
  useLazyGetExpancesPDFQuery,
  useRefreshCurrentBalenceMutation,
} from '../../redux/services/expansesServices';
import RNFS from 'react-native-fs';
import {
  DefaultTopBarOne,
  formatDate,
  getNewAuthToken,
  SnackbarComponent,
} from '../../common/customFunctions';
import {styles} from './style';
import {useFocusEffect} from '@react-navigation/native';
import {Buffer} from 'buffer';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import * as Progress from 'react-native-progress';
import {BASE_URL_CUSTOMER} from '../../api/api';
import {Platform} from 'react-native';
import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Expences = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedApartment} = useSelector(state => state.cityData);
  const [loader, setLoader] = useState(false);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState({name: '', index: null});
  const [error, setError] = useState();
  const [expancesData, setExpancesData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentBalence, setCurrentBalence] = useState();  

  const isReadOnly =
    selectedApartment?.admin && selectedApartment?.approved ? false : true;

  //rtk
  const [getAllExpancesQuery] = useLazyGetAllExpancesQuery();
  const [getExpancesPDF] = useLazyGetExpancesPDFQuery();
  const [deleteExpances] = useDeleteExpancesMutation();
  const [getAllCredits] = useLazyGetallCreditsQuery();
  const [deleteCredits] = useDeleteCreditHistoryMutation();
  const [getCurrentBalence] = useLazyGetCurrentBalenceQuery();
  const [refreshCurrentbalence] = useRefreshCurrentBalenceMutation();

  const currentYear = new Date()?.getFullYear();
  const currentMonthIndex = new Date()?.getMonth();
  const years = [];
  for (let year = 2024; year <= currentYear; year++) {
    years.push({name: year});
  }
  const months = allTexts.months;

  const [defaultView, setdefaultView] = useState('Debit');
    const toggleSection = (section) => {
        setdefaultView(section);
    };

  const handleGetCurrentBalence = () => {
    const payload = {
      id: selectedApartment?.id,
    };
    getCurrentBalence(payload)
      .unwrap()
      .then(responce => {
        // console.log('RES OF CURRENT BALENCE',responce);
        setCurrentBalence(responce);
      })
      .catch(error => {
        console.log('ERR IN CURRENT BALENCE', error);
      });
  };
  const handleRefreshCurrentBalence = () => {
    const payload = {
      id: selectedApartment?.id,
    };
    refreshCurrentbalence(payload)
      .unwrap()
      .then(responce => {
        // console.log('RES OF REFRESH CURRENT BALENCE',responce);
        setCurrentBalence(responce);
        SnackbarComponent({
          text: 'Balance Refreshed Successfully',
          backgroundColor: colors.green5,
        });
      })
      .catch(error => {
        console.log('ERR IN REFRESH CURRENT BALENCE', error);
        SnackbarComponent({
          text: 'Error in refreshing balence',
          backgroundColor: colors.red3,
        });
      });
  };
  const handlegetallCredits = id => {
    const payload = {
      apartmentID: id,
      year: selectedYear,
      month: selectedMonth?.index,
    };
    // console.log(payload);
    getAllCredits(payload)
      .unwrap()
      .then(response => {
        setLoader(false);
        setCreditsData(response);
        // console.log('GET ALL CREDITS=====>', response);
      })
      .catch(error => {
        setLoader(false);
        console.log('ERROR IN GET ALL CREDITS', error);
        if (error?.data?.status === 401) {
          getNewAuthToken(dispatch);
        }
      });
  };
  const handlegetAllExpances = id => {
    setLoader(true);
    const payload = {
      apartmentID: id,
      year: selectedYear,
      month: selectedMonth?.index,
    };
    // console.log(payload);
    getAllExpancesQuery(payload)
      .unwrap()
      .then(response => {
        // console.log('response OF GETALLEXPANCES', response);
        setLoader(false);
        setExpancesData(response);
      })
      .catch(error => {
        console.log('ERROR IN GETALLEXPANCES', error);
        setLoader(false);
        if (error?.data?.status === 401) {
          getNewAuthToken(dispatch);
        }
        SnackbarComponent({
          text: 'failed To Load Expances',
          backgroundColor: colors.red3,
        });
      });
  };
  const handlegetExpancePDF = async (apartmentID, year, month, urlType) => {
    SnackbarComponent({
      text: 'Save PDF Through System FILE MANAGER',
      backgroundColor: colors.yellowColor,
    });
    try {
      setIsDownloading(true);
      const bearerToken = await getAuthTokenDetails();
      let PDF_URL = null;
      if (urlType === 'DEBITPDF') {
        PDF_URL = `${BASE_URL_CUSTOMER}report/apartment/${apartmentID}/year/${year}/month/${month}`;
      } else if (urlType === 'CREDITPDF') {
        PDF_URL = `${BASE_URL_CUSTOMER}report/apartment/${apartmentID}/year/${year}/month/${month}`;
      } else if (urlType === 'BALENCEDPDF') {
        PDF_URL = `${BASE_URL_CUSTOMER}report/balance/apartment/${apartmentID}/year/${year}/month/${month}`;
      }
      const response = await fetch(PDF_URL, {
        method: 'GET',
        headers: {
          Authorization: bearerToken,
        },
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const buffer = await blobToBuffer(blob);

      // Using app-specific internal storage directory
      const downloadDest =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/ExpencesPDF.pdf`
          : `${RNFS.ExternalDirectoryPath}/ExpencesPDF.pdf`;
      await RNFS.writeFile(
        downloadDest,
        buffer?.toString('base64'),
        'base64',
      ).then(async () => {
        setDownloadProgress(1);
        setTimeout(() => {
          setIsDownloading(false);
        }, 500);
        console.log('PDF downloaded successfully to:', downloadDest);
        const fileExists = await RNFS.exists(downloadDest);
        if (fileExists) {
          console.log('File exists at:', downloadDest);
          await handleSharePDF(downloadDest);
          // SnackbarComponent({
          //   text: 'PDF Downloaded successfully',
          //   backgroundColor: colors.green5,
          // });
        } else {
          throw new Error('File does not exist at the expected path.');
        }
      });
    } catch (error) {
      setIsDownloading(false);
      console.error('Error downloading PDF:', error);
      SnackbarComponent({
        text: 'Error In Downloading PDF',
        backgroundColor: colors.red3,
      });
    }
  };

  const blobToBuffer = blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const buffer = Buffer.from(arrayBuffer);
        resolve(buffer);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

  const handleSharePDF = async filePath => {
    try {
      await Share?.open({
        url: `file://${filePath}`,
        type: 'application/pdf',
        title: 'ExpencesPDF',
      });
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.error('Error sharing PDF:', error);
      }
    }
  };

  const handleDebitDelete = id => {
    const payload = {
      apartmentID: selectedApartment?.id,
      id: id,
    };
    // console.log(payload);
    deleteExpances(payload)
      .unwrap()
      .then(response => {
        console.log('response OF DELETE EXPENCES', response);
        SnackbarComponent({
          text: 'Deleted Successfully',
          backgroundColor: colors.red3,
        });
        handlegetAllExpances(selectedApartment?.id);
      })
      .catch(error => {
        console.log('ERROR IN DELETE EXPENCES', error);
        SnackbarComponent({
          text: 'Failed to Delete',
          backgroundColor: colors.red3,
        });
      });
  };
  const handleCreditDelete = id => {
    const payload = {
      apartmentID: selectedApartment?.id,
      id: id,
    };
    // console.log(payload);
    deleteCredits(payload)
      .unwrap()
      .then(response => {
        console.log('response OF DELETE Credits', response);
        SnackbarComponent({
          text: 'Deleted Successfully',
          backgroundColor: colors.red3,
        });
        handlegetallCredits(selectedApartment?.id);
      })
      .catch(error => {
        console.log('ERROR IN DELETE Credits', error);
        SnackbarComponent({
          text: 'Failed to Delete',
          backgroundColor: colors.red3,
        });
      });
  };
  const handleNavigation = (item, mode) => {
    if (mode === 'UPDATE_EXPENCES' || mode === 'UPDATE_CREDITS') {
      const updatedAt = new Date(item?.updatedAt);
      const currentDate = new Date();
      const monthsDifference =
        (currentDate?.getFullYear() - updatedAt?.getFullYear()) * 12 +
        (currentDate?.getMonth() - updatedAt?.getMonth());
      if (monthsDifference <= 3) {
        navigation.navigate(allTexts.screenNames.addNewExpances, {
          data: {itemId: item, apartmentId: selectedApartment?.id},
          mode: mode,
        });
      } else {
        SnackbarComponent({
          text: 'You can only update records within the last 3 months.',
          backgroundColor: colors.red3,
        });
      }
    } else if (mode === 'ADD_EXPENCES' || mode === 'ADD_CREDITS') {
      navigation.navigate(allTexts.screenNames.addNewExpances, {
        data: selectedApartment?.id,
        mode: mode,
      });
    }
  };
  useEffect(() => {
    setSelectedYear(currentYear);
    setSelectedMonth(months[currentMonthIndex]);
  }, []);
  useFocusEffect(
    useCallback(() => {
      handleGetCurrentBalence();
      if (selectedApartment?.id && selectedYear && selectedMonth) {
        handlegetAllExpances(selectedApartment?.id);
        handlegetallCredits(selectedApartment?.id);
      }
    }, [selectedApartment, selectedMonth, selectedYear]),
  );
  return (
    <View showsVerticalScrollIndicator={false} style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Account', true)}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      <View
        style={styles.currentbalCon}>
        <View style={{justifyContent:'space-between',flexDirection:'row',paddingTop:'4%'}}>
        <Text style={{color: colors.black, fontSize: 16, fontWeight: '500'}}>
            Current Balance
          </Text>
          <Ionicons name='refresh-circle' size={25} color={colors.primaryColor} onPress={handleRefreshCurrentBalence}/>
        </View>
        <View style={{alignItems: 'center', marginVertical: '3%'}}>
        <Text style={{color: colors.black, fontSize: 20, fontWeight: '500'}}>
            {currentBalence?.currentBalance || 0}
          </Text>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Text>
            LastUpdated :{' '}
            {(currentBalence?.lastUpdated === null || currentBalence?.lastUpdated === '')
              ? 'Never'
              : (currentBalence?.lastUpdated && formatDate(currentBalence?.lastUpdated)) || 'Never'}
          </Text>
        </View>
      </View>
      <View style={styles.datePickerContainer}>
        <CustomSelectDropdown
          data={years}
          onSelect={selectedItem => setSelectedYear(selectedItem?.name)}
          selectedItem={{name: selectedYear}}
          placeholder="SELECT YEAR"
        />
        <CustomSelectDropdown
          data={months}
          onSelect={selectedItem => setSelectedMonth(selectedItem)}
          selectedItem={selectedMonth}
          placeholder="SELECT MONTH"
        />
      </View>
      {loader ? (
        <View>
          <Loader
            color={colors.primaryColor}
            size={'large'}
            marginTop={'40%'}
          />
        </View>
      ) : (
        <ExpenseComponent
          expancesData={expancesData}
          creditsData={creditsData}
          handlegetExpancePDF={handlegetExpancePDF}
          handleNavigation={handleNavigation}
          handleDebitDelete={handleDebitDelete}
          handleCreditDelete={handleCreditDelete}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          isReadOnly={isReadOnly}
          defaultView={defaultView}
          setdefaultView={setdefaultView}
          toggleSection={toggleSection}
        />
      )}
      {isDownloading && (
        <View style={styles.progressBarContainer}>
          <Text style={styles.downloadingText}>Downloading PDF...</Text>
          <Progress.Bar
            progress={downloadProgress}
            width={null}
            color={colors.primaryColor}
          />
        </View>
      )}
      {/* <FaqButton faq={allTexts.faqs.expenceFaq} navigation={navigation} /> */}
      <View style={styles.apartmentServicesCon}>
        <Pressable
          style={[
            styles.eachService,
            {
              backgroundColor: isReadOnly ? colors.gray : colors.primaryColor,
              borderTopLeftRadius: 5,
            },
          ]}
          onPress={
            isReadOnly ? ()=>SnackbarComponent({
              text: 'Accessed Only for Apartment Admins',
              backgroundColor: colors.yellowColor,
            }) : () => handleNavigation(null, 'ADD_EXPENCES')
          }>
          <Text style={styles.eachText}>ADD EXPENSES</Text>
        </Pressable>
        <View style={styles.verticalLine} />
        <Pressable
          style={[
            styles.eachService,
            {
              backgroundColor: isReadOnly ? colors.gray : colors.primaryColor,
              borderTopRightRadius: 5,
            },
          ]}
          onPress={
            isReadOnly ? ()=>SnackbarComponent({
              text: 'Accessed Only for Apartment Admins',
              backgroundColor: colors.yellowColor,
            }) : () => handleNavigation(null, 'ADD_CREDITS')
          }>
          <Text style={styles.eachText}>ADD CREDITS</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Expences;
