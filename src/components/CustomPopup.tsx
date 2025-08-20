import React from 'react';
import {Modal, View, Text, StyleSheet, Pressable} from 'react-native';

type buttonProp = {
  text: string;
  bgColor: string;
  onClick: () => void;
};
type Props = {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
  emoji?: string;
  btnText?: string;
  btns: buttonProp[];
};

export default function CustomPopup({
  visible,
  onClose,
  title = 'Erro',
  message = 'Algo deu errado.',
  emoji = '😢',
  btns,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalEmoji}>{emoji}</Text>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <View style={styles.btnsContainer}>
            {btns.map((current, index) => (
              <Pressable
                key={index}
                style={{
                  ...styles.modalButton,
                  backgroundColor: current.bgColor,
                }}
                onPress={current.onClick}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {current.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalEmoji: {
    fontSize: 64,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnsContainer: {
    flexDirection: 'row',
    columnGap: 20,
  },
});
