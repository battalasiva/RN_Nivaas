import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../common';
import {PrimaryButton, TopBarCard2} from '../../components';
import {sendSupportEmail} from '../../common/customFunctions';
import { statusBarHeight } from '../../utils/config/config';

const TermsAndConditions = ({navigation}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{marginTop:statusBarHeight}}>
        <TopBarCard2 txt={'Terms And Conditions'} />
        </View>
      <View style={{margin: '5%'}}>
        <Text style={styles.subTitleOne}>Welcome to NIVAAS!</Text>
        <Text style={styles.content}>
          These terms and conditions govern your use of the NIVAAS mobile
          application ("App") and related services provided by NIVAAS team
          ("NIVAAS", "we", "us", "our"). By using our App, you agree to comply
          with and be bound by these Terms.
        </Text>
        <Text style={styles.subTitleOne}>Acceptance of Terms</Text>
        <Text style={styles.subTitleTwo}>1.Eligibility:</Text>
        <Text style={styles.content}>
          You must be at least 18 years old to use the NIVAAS App. By using the
          App, you represent and warrant that you are at least 18 years old.
        </Text>
        <Text style={styles.subTitleTwo}>2.Modification of Terms:</Text>
        <Text style={styles.content}>
          NIVAAS reserves the right to modify or update these Terms at any time
          without prior notice. Changes will be effective upon posting. Your
          continued use of the App after changes are posted constitutes your
          acceptance of the revised Terms.
        </Text>
        <Text style={styles.subTitleOne}>Account Registration</Text>
        <Text style={styles.subTitleTwo}>1.Account Creation:</Text>
        <Text style={styles.content}>
          To access certain features of the App, such as maintenance management
          or society due remainders and requesting repair services, you may be
          required to register and create an account. You agree to provide
          accurate, current, and complete information during registration and to
          update such information to keep it accurate, current, and complete.
        </Text>
        <Text style={styles.subTitleTwo}>2.Account Security:</Text>
        <Text style={styles.content}>
          You are responsible for maintaining the confidentiality of your
          account credentials and for any activities that occur under your
          account. Notify NIVAAS immediately of any unauthorized use of your
          account or any other breach of security.
        </Text>
        <Text style={styles.subTitleOne}>Use of the App</Text>
        <Text style={styles.subTitleTwo}>1.License: </Text>
        <Text style={styles.content}>
          NIVAAS grants you a limited, non-exclusive, non-transferable,
          revocable license to use the App for your personal use only.
        </Text>
        <Text style={styles.subTitleTwo}>Features Provided:</Text>
        <Text style={styles.subTitleTwo}>1.Notice Board:</Text>
        <Text style={styles.content}>
          Users can view community notices, including announcements about
          festivals, events, or important updates within their apartment
          complex.
        </Text>
        <Text style={styles.subTitleTwo}>2.Maintenance Management:</Text>
        <Text style={styles.content}>
          Apartment administrators can raise a request to onboard their
          apartment with NIVAAS and onboard all flat owners. They can also share
          their admin responsibilities with other flat owners and configure
          maintenance costs.
        </Text>
        <Text style={styles.subTitleTwo}>3.Notification System:</Text>
        <Text style={styles.content}>
          The App sends notifications to both tenants and owners regarding their
          monthly dues and other relevant updates.
        </Text>
        <Text style={styles.subTitleTwo}>4.Society Dues:</Text>
        <Text style={styles.content}>
          Flat owners/tenants can view the detailed dues in the application.
        </Text>
        <Text style={styles.subTitleTwo}>5.Record Maintenance:</Text>
        <Text style={styles.content}>
          The App maintains detailed records of all transactions and maintenance
          activities, which can be exported to PDF.
        </Text>
        <Text style={styles.subTitleTwo}>Prohibited Conduct:</Text>
        <Text style={styles.subTitleTwo}>You agree not to:</Text>
        <Text style={styles.content}>
          1.Violate these Terms or any applicable laws or regulations.
        </Text>
        <Text style={styles.content}>
          2.Use the App for any illegal or unauthorized purpose.
        </Text>
        <Text style={styles.content}>
          3.Attempt to gain unauthorized access to any part of the App or its
          related systems or networks.
        </Text>
        <Text style={styles.subTitleTwo}>Content:</Text>
        <Text style={styles.content}>
          You retain ownership of any content you upload, post, or otherwise
          make available on the App ("User Content"). By uploading User Content,
          you grant NIVAAS a worldwide, non-exclusive, royalty-free license to
          use, reproduce, modify, adapt, publish, translate, distribute, and
          display such User Content.
        </Text>
        <Text style={styles.subTitleOne}>Privacy</Text>
        <Text style={styles.subTitleTwo}>1.Privacy Policy: </Text>
        <Text style={styles.content}>
          Your use of the App is subject to our Privacy Policy, which explains
          how we collect, use, and disclose your information. By using the App,
          you consent to our Privacy Policy.
        </Text>
        <Text style={styles.subTitleTwo}>2.Non-Related Profile Pictures: </Text>
        <Text style={styles.content}>
          Users are solely responsible for ensuring that their profile pictures
          are appropriate and relevant to the residential community
          context.NIVAAS bears no responsibility for any non-related, offensive,
          or inappropriate profile pictures uploaded by users
        </Text>
        <Text style={styles.subTitleOne}>Termination</Text>
        <Text style={styles.subTitleTwo}>1.Termination:</Text>
        <Text style={styles.content}>
          NIVAAS reserves the right to suspend or terminate your access to the
          App at any time and for any reason without notice.
        </Text>
        <Text style={styles.subTitleTwo}>2.Effect of Termination:</Text>
        <Text style={styles.content}>
          Upon termination, all licenses and rights granted to you under these
          Terms will immediately cease.
        </Text>
        <Text style={styles.subTitleOne}>
          Disclaimer of Warranties and Limitation of Liability
        </Text>
        <Text style={styles.subTitleTwo}>1.Disclaimer: </Text>
        <Text style={styles.content}>
          The App is provided on an "as is" and "as available" basis. We make no
          warranties or representations about the accuracy or completeness of
          the content on the App, or the reliability of any information
          provided.
        </Text>
        <Text style={styles.subTitleTwo}>2.Limitation of Liability:</Text>
        <Text style={styles.content}>
          In no event shall NIVAAS be liable for any indirect, incidental,
          special, consequential, or punitive damages, including but not limited
          to loss of profits, data, or use, arising out of or in any way
          connected with your use of the App.
        </Text>
        <Text style={styles.subTitleOne}>Help Center</Text>
        <Text style={styles.content}>
          If you have any questions about these Terms, please contact us on
          Email :{' '}
          <Text onPress={sendSupportEmail} style={styles.emailText}>
            nivaas.connect@gmail.com
          </Text>
        </Text>
      </View>
      <View style={styles.okButtonCon}>
        <PrimaryButton
          text={'OK'}
          bgColor={colors.primaryColor}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: '20%',
    color: colors.primaryColor,
  },
  subTitleOne: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10,
    color: colors.primaryColor,
  },
  subTitleTwo: {
    fontSize: 15,
    fontWeight: '500',
    // marginVertical: 2,
    color: colors.primaryColor,
  },
  content: {
    flex: 1,
    marginVertical: 10,
    color: colors.black,
    fontSize: 15,
  },
  okButtonCon: {
    marginHorizontal: '30%',
    marginBottom: '5%',
  },
  emailText: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.primaryColor,
  },
});
