import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
// import {Button} from 'react-native-elements';

class AddNewReceivingOrder extends Component {
  state = {
    check: true,
    item: '',
    invoiceNo: '',
    qoh: '',
    salesPrice: '',
    barCodeNumber: '',
    grossvalue: '',

    date: new Date(),
    serverData: [],
    itemname: '',
    suppliercode: '',
    isLoading: false,
    selectedItems: [],
  };

  componentDidMount() {
    this.state.invoiceNo = '';

    AsyncStorage.getItem('Sid').then((datasid) => {
      AsyncStorage.getItem('token').then((data) => {
        if (data) {
          //   this.refs.loading.show(true);

          const url = API_BASE_URL + 'admin/get_new_vendor_list?sid=';
          fetch(url + datasid + '&token=' + data)
            .then((response) => response.json())
            .then((responseJson) => {
              //   this.refs.loading.show(false);

              //Successful response from the API Call
              this.setState({
                serverData: responseJson.vendor_data,
              });
              //   alert(JSON.stringify(responseJson))
              // alert(JSON.stringify(this.state.serverData));
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    });
  }

  saveNPLItemDetails = () => {
    const self = this;
    if (this.state.invoiceNo == '') {
      alert('Please enter the Invoice -No');
      return;
    }

    if (this.state.serverData.item == '') {
      alert('Please insert Vendor name ');
      return;
    }

    AsyncStorage.setItem(
      'supplier_id',
      JSON.stringify(this.state.suppliercode),
    );

    AsyncStorage.getItem('Sid')
      .then((datasid) => {
        AsyncStorage.getItem('token').then((data) => {
          if (data) {
            // this.refs.loading.show(true);
            this.setState({
              isLoading: true,
            });

            fetch(API_BASE_URL + `admin/insert_ro_details?token=${data}`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                vvendorid: this.state.suppliercode,
                sid: datasid,
                vinvoiceno: this.state.invoiceNo,
                dcreatedate: this.state.date,
              }),
            })
              .then((response) => response.json())
              .then((responseJson) => {
                this.setState({
                  isLoading: false,
                });
                // this.refs.loading.close();

                if (responseJson.status == 'error') {
                  //   Alert.alert('', responseJson.error, [
                  //     {text: 'OK', onPress: () => this.componentDidMount()},
                  //   ]);
                  alert(responseJson.error);
                  return;
                }
                if (responseJson.status == 'success') {
                  AsyncStorage.setItem(
                    'ipoid',
                    JSON.stringify(responseJson.iroid),
                  );

                  //   Alert.alert('', responseJson.msg, [
                  //     {text: 'OK', onPress: () => this.goToRecivingOrderScreen()},
                  //   ]);
                  alert(responseJson.msg);
                  this.props.navigation.navigate('SelectItem');
                }
                if (responseJson.error) {
                  Alert.alert('', responseJson.error, [{text: 'OK'}]);
                }
              });
          }
        });
      })

      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <View>
        {/* <SafeAreaView> */}
        <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../../assets/images/header.jpeg')}
            style={{position: 'relative', height: 100, paddingTop: 20}}>
            <View
              style={{
                // display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{color: 'white', marginTop: 10}}
                onPress={() =>
                  this.props.navigation.navigate('ReceivingOrder')
                }>
                Receiving Order
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{margin: 10}}>
          <SearchableDropdown
            // onTextChange={this.a}
            selectedItems={this.state.selectedItems}
            onTextChange={(qoh) => this.setState({qoh})}
            //On text change listner on the searchable input
            // onItemSelect={item => this.setState({
            //     itemname1 = item.name
            // }, TextInput)}

            // onItemSelect={item => this.setState({
            //     itemname1 = item.name
            // }, TextInput)}
            onItemSelect={(item) =>
              (this.state.suppliercode = item.supplier_id)
            }
            // onItemSelect={item => alert(JSON.stringify(item))}
            //onItemSelect called after the selection from the dropdown
            containerStyle={{padding: 0}}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              padding: 15,
              borderWidth: 1,
              borderColor: '#fff',
              backgroundColor: '#fff',
              borderRadius: 30,

              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 0.2,
              elevation: 2,
              // backgroundColor: '#FAF7F6',
            }}
            itemStyle={{
              //single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              //text style of a single dropdown item
              color: '#222',
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: '80%',
            }}
            items={this.state.serverData}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder="Vendor"
            //place holder for the search input
            resetValue={false}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"
            //To remove the underline from the android input
          />
        </View>
        <View style={{margin: 10}}>
          <TextInput
            style={styles.textBox1}
            returnKeyType="done"
            keyboardType="default"
            autoCapitalize="none"
            editable={true}
            placeholder="Invoice #"
            value={this.state.invoiceNo}
            autoCorrect={false}
            ref={(input) => {
              this.invoiceNo = input;
            }}
            onChangeText={(invoiceNo) =>
              this.setState({invoiceNo})
            }></TextInput>
        </View>
        <View style={{margin: 10}}>
          <DatePicker
            style={{width: '100%', borderRadius: 30}}
            showIcon={false}
            // style={{width: '85%'}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({date: date});
            }}
          />
        </View>
        <View>
          <Button
            style={{marginTop: 10}}
            titleStyle={{color: '#fff', fontSize: 16}}
            buttonStyle={{
              paddingVertical: 12,
              paddingHorizontal: 20,
              backgroundColor: '#3386D6',
              borderRadius: 25,
              // width:"50%"
            }}
            // containerStyle={{margin: 20}}
            //type="outline"
            title="Select Item"
            onPress={() => {
              this.saveNPLItemDetails();
            }}
          />
        </View>
        {/* </SafeAreaView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBox1: {
    height: 45,
    backgroundColor: 'red',
    paddingRight: 8,
    paddingLeft: 18,
    width: '100%',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default AddNewReceivingOrder;
