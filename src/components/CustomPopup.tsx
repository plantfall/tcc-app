import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

import React from 'react';

type buttonProp = {
  text: string;
  color?: string;
  bgColor: string;
  onClick: () => void;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
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
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <View style={styles.btnsContainer}>
            {btns.map((current, index) => (
              <Pressable
                key={index}
                style={{
                  ...styles.modalButton,
                  backgroundColor: current.bgColor,
                  borderRadius: current.borderRadius,
                  borderWidth: current.borderWidth ? current.borderWidth : 0,
                  borderColor: current.borderColor,
                }}
                onPress={current.onClick}>
                <Text
                  style={{
                    color: current.color ? current.color : 'white',
                    fontWeight: 'bold',
                  }}>
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
