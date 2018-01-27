import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode';
import CONFIG from '../config.json';
import Web3 from 'web3';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const msg = Web3.utils.toHex(Web3.utils.sha3(CONFIG.ACCOUNT.ADDRESS));
const data = {
  'msg': msg,
  'sig': Web3.utils.toHex(Web3.eth.sign(msg, CONFIG.ACCOUNT.PRIVATE_KEY)),
};

class QRCodeScreen extends React.Component {
  state = {
    data: JSON.stringify(data),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>This is QR Code Screen.</Text>
        <Text>{this.state.data}</Text>
        <QRCode
          value={this.state.data}
        />
        <Button
          title="Refresh"
          onPress={() => this.setState({ data: JSON.stringify(data) })}
        />
        <Button
          title="Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

QRCodeScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default QRCodeScreen;
