import { View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { CustomDropdown, DefaultApartmentComp, PrimaryButton } from '../../components';
import { allTexts, colors } from '../../common';
import { useSelector } from 'react-redux';
import { DefaultTopBarOne, SnackbarComponent } from '../../common/customFunctions';
import { useAddCoadminMutation, useLazyGetFlatOwnersQuery } from '../../redux/services/myAccountService';
import { styles } from './style';

const CoAdmin = ({ navigation }) => {
  const { selectedApartment } = useSelector(state => state.cityData);
  const [ownerdata, setOwnerdata] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState({ id: '', name: '' });
  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);  
  const pageSize = 5;
  // RTK
  const [addCoAdmin] = useAddCoadminMutation();
  const [getFlatOwners] = useLazyGetFlatOwnersQuery();

  const handleCoadmin = () => {
    if (!selectedOwner?.id) {
      SnackbarComponent({
        text: 'Please select an Owner',
        backgroundColor: colors.red3,
      });
      return;
    }
    const payload = {
      apartmentId: selectedApartment?.id,
      userId: selectedOwner?.id,
      userRole: allTexts.roles.apartmentAdmin,
    };
    addCoAdmin(payload)
      .unwrap()
      .then(response => {
        navigation.navigate(allTexts.screenNames.myAccount);
        SnackbarComponent({
          text: 'Co-Admin Added Successfully',
          backgroundColor: colors.green5,
        });
      })
      .catch(error => {
        console.log('ERROR IN ADDING CO_ADMIN', error);
        SnackbarComponent({
          text: error?.data?.message || 'Error In Co-Admin Request',
          backgroundColor: colors.red3,
        });
      });
  };

  const handleflatowners = async (id, currentPage) => {
    const payload = {
      apartmentID: id,    
      pageNo: currentPage,
      pageSize,
    };    
    try {
      const response = await getFlatOwners(payload).unwrap();      
      const newData = response?.data?.filter((item, index, self) => 
        index === self.findIndex((t) => t.id === item.id)
      );
      if (newData.length < pageSize-1) {
        setHasMoreData(false);
      }
      setOwnerdata(prevData => [...prevData, ...newData]);
    } catch (error) {
      console.log('ERROR IN FLAT OWNERS', error);
      SnackbarComponent({
        text: 'Error loading flat owners data',
        backgroundColor: colors.red3,
      });
    }
  };
  const fetchMoreData = useCallback(() => {    
    if (hasMoreData && selectedApartment?.id) {
      const nextPage = page + 1;
      setPage(nextPage);
      handleflatowners(selectedApartment?.id, nextPage);
    }
  }, [hasMoreData, page, selectedApartment]);
  useEffect(() => {
    if (selectedApartment?.id) {
      setOwnerdata([]);
      setPage(0);
      setHasMoreData(true);
      handleflatowners(selectedApartment?.id, 0);
    }
  }, [selectedApartment]);

  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Co-Admin', true)}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      <View style={styles.eachDropdown}>
        <CustomDropdown
          label="Owner"
          data={ownerdata}
          value={selectedOwner}
          onChange={(id, name) => setSelectedOwner({ id, name })}
          labelField="fullName"
          valueField="id"
          errorMessage="No owners found"
          fetchMoreData={fetchMoreData}
          hasMoreData={hasMoreData}
        />
      </View>
      <View style={styles.singleApartmentCon}>
        <PrimaryButton
          text={'SUBMIT'}
          bgColor={colors.primaryColor}
          onPress={handleCoadmin}
        />
      </View>
    </View>
  );
};

export default CoAdmin;