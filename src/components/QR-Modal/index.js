import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { QR_CODE_URL } from '../../api/api';
import { colors } from '../../common';

const QRCodeModal = ({ visible, onClose, selectedApartmentID }) => {
    const qrUrl = `${QR_CODE_URL}/${selectedApartmentID}`
    console.log(qrUrl);
    
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Scan QR Code</Text>
              <View style={styles.qrCodeContainer}>
                <QRCode value={qrUrl} size={200} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color:colors.black
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRCodeModal;
