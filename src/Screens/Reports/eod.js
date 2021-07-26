import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, ScrollView,
  ImageBackground,
  ActivityIndicator,
  Button
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import Loading from 'react-native-whc-loading'
import AsyncStorage from '@react-native-community/async-storage';
import { Cell, Section, TableView } from "react-native-tableview-simple";


const CustomSectionHeader1 = props => (
  <View>
    <Text style={{ fontSize: 15, fontWeight: '500', color: '#3386D6', alignSelf: 'center', bottom: 4 }}> {props.header} </Text>
  </View>
);

const CustomSectionHeader2 = props => (
  <View>
    <Text style={{ fontSize: 15, fontWeight: '600', color: '#3386D6', alignSelf: 'center', bottom: 2  }}> {props.header}</Text>
    
  </View>
);


const CustomCell = props => (
  <View>
    <Text style={{ fontSize: 15, fontWeight: '600', color: '#3386D6', alignSelf: 'center', bottom: 2  }}> {props.header}</Text>
    
  </View>
);



export default class Eod extends Component {

  constructor(props) {
    super(props)

    this.state = {
      show: false,
      date: new Date(),
      storeName:"",
      storeAddress:"",
      storePhone:"",
      dateResponse:"",
      StoreSalesExclTax:"",
      taxableSale: "",
      nonTaxableSale: "",
      totalStoreSale: "",
      liabilitySales: "",
      fuelSales: "",
      lottoSales: "",
      grandTotal: "",
      totalSalesTax:"",
      tax1:"",
      tax2:"",
      tax3:"",
      lottoSales:"",
      lotterySales:"",
      instantSales:"",
      lotteryReddem:"",
      instantReddem:"",
      houseCharge:"",
      houseChargePayment:"",
      bottleDeposit:"",
      bottleDepositPayment:"",
      cash:"",
      coupon:"",
      checkCash:"",
      creditCardTotal:"",
      master:"",
      visa:"",
      discover:"",
      amex:"",
      EBTCash:"",
      EBT:"",
      discountTran:"",
      disAmount:"",
      voidTrans:"",
      voidAmount:"",
      deleteTrans:"",
      deleteTotal:"",
      returnTrans:"",
      returnTotal:"",
      noSaleTrans:"",

      transCount:"",
      avgSales:"",
      grossCost:"",
      grossProfit:"",
      grossProfitPerce:"",
      payoutTotal:"",
      houseTotal:"",
      totalBottleDeposit: "",
      houseAcctPayCash: "",
      houseAccCard: "",
      houseAcCheck: "",
      totalPaidouts: ""



    }
    this.batchData = null

  }



  // static navigationOptions = ({ navigate, navigation }) => ({
  //   headerTitle: (
  //     <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
  //       <Image source={require('../images/poslogo.jpg')}
  //         style={{ height: 100, width: 100, marginRight: 0, resizeMode: 'contain' }} />
  //     </View>
  //   ),
  //   // headerRight: <TouchableOpacity onPress={() => { navigation.navigate('Notifications'); }}><FontAwesome name="bell" size={25} color="#16a0db" /></TouchableOpacity>,
  // })

  Nextscreen = () => {
    this.props.navigation.navigate('Dashboard');
  }

  
  componentDidMount() {

    this.setState({ visibleDetails: false })

  }


  getStoreDetails = (date) => {

  
    this.setState({ date: date })
    this.refs.loading.show();

    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {

        return fetch(API_BASE_URL + `store_detail_date?sid=${SID}&date=${date}`)

          .then((response) => response.json())
          .then((responseJson) => {
            this.refs.loading.show(false);
            this.setState({
              visibleDetails: true,

                // Store Details
              storeName: responseJson.Details[0].name,
              storeAddress: responseJson.Details[0].address,
              storePhone: responseJson.Details[0].phone,
              dateResponse: responseJson.Date,
     


            });


          })
          .catch(error => {
            console.error(error);
          });

      });
    })
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };




  getReportData = (date) => {

    this.refs.loading.show();
    this.setState({ date: date })

    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {

        return fetch(API_BASE_URL + `eod_sale?sid=${SID}&date=${date}`)

          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({
              visibleDetails: true,

                // Store Details
              shiftStart: responseJson[0].BatchStartTime,
              shiftEnd: responseJson[0].BatchEndTime,
              register: responseJson[0].TerminalId,
            

             //Store Sales Details
              StoreSalesExclTax : responseJson[0].StoreSalesExclTax,
              taxableSale: responseJson[0].TaxableSales,
              nonTaxableSale: responseJson[0].NonTaxableSales,
              totalStoreSale: responseJson[0].StoreSalesInclTax,
              liabilitySales: responseJson[0].LiabilitySales,
              fuelSales: responseJson[0].FuelSales,
              lottoSales: responseJson[0].LottoSales,
              grandTotal: responseJson[0].GrandTotal,


              //Total Sales Tax(tax1+tax2+tax3) 
              totalSalesTax: responseJson[0].TotalTax,
              tax1: responseJson[0].Tax1,
              tax2: responseJson[0].Tax2,
              tax3: responseJson[0].Tax3,
              
             

              //Lotto Sales 
              lottoSales: responseJson[0].LottoSales,
              lotterySales: responseJson[0].LotterySales,
              instantSales: responseJson[0].instantSales,
              lotteryReddem: responseJson[0].LotteryRedeem,
              instantReddem: responseJson[0].InstantRedeem,
              houseCharge: responseJson[0].HouseAcctCharged,
              houseChargePayment: responseJson[0].HouseAcctPayments,
              houseAcctPayCash: responseJson[0].HouseAcctCash,
              houseAccCard: responseJson[0].HouseAcctCard,
              houseAcCheck: responseJson[0].HouseAcctCheck,
              houseTotal:  responseJson[0].totalHouseAcct,
              bottleDeposit: responseJson[0].bottledeposit,
              bottleDepositPayment: responseJson[0].bottledepositredeem,
              totalBottleDeposit: responseJson[0].totalBottleDeposit,

            //Tender Summary
            cash: responseJson[0].CashTender,
            coupon: responseJson[0].CouponTender,
            checkCash: responseJson[0].CheckTender,
            creditCardTotal: responseJson[0].CreditCardTender,
            master: responseJson[0].MasterCard,
            visa: responseJson[0].VisaCard,
            discover: responseJson[0].DiscoverCard,
            amex: responseJson[0].AmexCard,
            EBTCash: responseJson[0].EbtTender,
            EBT: responseJson[0].OtherCards,


            //Perfomance Statics

            discountTran: responseJson[0].Discounted_Trns,
            disAmount: responseJson[0].Discounted_Amount,
            voidTrans: responseJson[0].Void_Trns,
            voidAmount: responseJson[0].Void_Amount,
            deleteTrans: responseJson[0].Deleted_Trns,
            deleteTotal: responseJson[0].Deleted_Amount,
            returnTrans: responseJson[0].Return_Trns,
            returnTotal: responseJson[0].Return_Amount,
            noSaleTrans: responseJson[0].NoSale_Count,
            totalPaidouts: responseJson[0].Paidouts,


            //Productivity

            transCount: responseJson[0].Trns_Count,
            avgSales: responseJson[0].Avg_Sales,
            grossCost: responseJson[0].Gross_Cost,
            grossProfit: responseJson[0].Gross_Profit,
            grossProfitPerce: responseJson[0].Gross_Profit_Per,
            payoutTotal : responseJson[0].totalreturns
       
              // CashDetails: responseJson.CashDetail,
              // CashDetailValue: responseJson.CashDetailValue,


            });


          })
          .catch(error => {
            console.error(error);
          });

      });
    })
  }


  // getTendorDetails = (batchID) => {


  //   AsyncStorage.getItem('token').then((data) => {
  //     AsyncStorage.getItem('Sid').then((SID) => {
  //       if (batchID) {

  //         this.setState({ batch: batchID })

  //         return fetch(API_BASE_URL + `admin/zreport_detail?sid=${SID}&batch=${batchID}&token=${data}`)

  //           .then((response) => response.json())
  //           .then((responseJson) => {




  //             const tenderType = responseJson.filter( item => item.Type === 'Tender')
  //             const libailityType = responseJson.filter( item => item.Type === 'Liability')

  //             this.setState({
  //               visibleDetails: true,

  //               TenderTotal: responseJson,
  //               libailityType,
  //               tenderType
  //             });
  //             //  responseJson.map(item => {

  //             //   if (item.Type == "Tender"){

  //             //     this.state.tenderType.push(item)

  //             //   }
  //             //   if (item.Type == "Liability"){

  //             //     this.state.libailityType.push(item)

  //             //   }



  //           // })

  //           })
  //           .catch(error => {
  //             console.error(error);
  //           });
  //       }
  //     });
  //   })
  // }

  // getBatches = (date) => {
  //   this.refs.loading.show();
  //   this.setState({ date: date })

  //   // AsyncStorage.setItem("Sid","1097");
  //   AsyncStorage.getItem("Sid").then(data => {
  //     if (data) {
  //       STORE_ID = data;
  //       API_URL = API_BASE_URL + "getbatches/";
  //       fetch(API_URL, {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           sid: STORE_ID,
  //           date: this.state.date,

  //         }),
  //       }).then(response => response.json())
  //         .then(responseJson => {
  //           this.refs.loading.show(false);
  //           if (responseJson) {

  //             this.setState(
  //               {

  //                 isLoading: false,
  //                 batchData: responseJson
  //               },

  //             );
  //           }
  //           else {
  //             alert("No Batches Available!")
  //           }

  //         })
  //         .catch(error => {
  //           console.error(error);
  //         });
  //     }
  //   });
  // }

  render() {

    if (!this.state.visibleDetails) {
      return (
        <ScrollView>
          <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../../assets/images/header.jpeg')}
            style={{position: 'relative', height: 80, paddingTop: 20}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              {/* <Text
                style={{color: 'white'}}
                onPress={() => this.props.navigation.navigate('Reports')}>
                End of Day report
              </Text> */}
              <FontAwesome style={{marginRight:0}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.push('Dashboard')} />
                  <Text style={{color: 'white',fontSize:15,paddingHorizontal:8,paddingVertical:3}} onPress={()=>this.props.navigation.push('Dashboard')}>Dashboard</Text>
            </View>
          </ImageBackground>
        </View>
          {/* <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>End of Day Report</Text>
          </View> */}

          <View style={{ flex: 1, flexDirection: "row", width: "100%",justifyContent:'center',alignContent:'center' }}>
            <View style={{ width: "50%" }}>
              <DatePicker
                style={{ width: "90%", paddingTop: 5 }}
                date={this.state.date}
                mode="date"
                androidMode="spinner"
                placeholder="select date"
                format="MM-DD-YYYY"
               
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.getReportData(date),this.getStoreDetails(date) }}
              />
            </View>
            {/* <View style={{ width: "50%" }}>
              <Dropdown
                style={{ width: "80%" }}
                label='Select Batch'
                data={this.state.batchData}
                onChangeText={(value) => {
                  
                  this.getReportData(value),
                  this.getTendorDetails(value);
                  //alert(value)
                }}
              />
            </View> */}
          </View>

          <Loading ref="loading" />
        </ScrollView>
      );
    }
    else {
      return (
        <ScrollView>
           

          <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
            <View style={{ width: "50%" }}>
            <Loading ref="loading" />
              <DatePicker
                style={{ width: "90%", paddingTop: 20 }}
                date={this.state.date}
                mode="date"
                androidMode="spinner"
                placeholder="select date"
                format="MM-DD-YYYY"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.getReportData(date) , this.getStoreDetails(date) }}
              />
            </View>
            {/* f15a2c = Orenge colour */}
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>SALES TOTAL</Text>
            </View>
           
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>SALES (excluding Tax)</Text>
                    <Text>${this.state.salesexcluding}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>TAXABLE SALES</Text>
                    <Text>${this.state.salestaxed}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>TAXABLE SALES</Text>
                    <Text>${this.state.salestaxed}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>NON-TAXABLE</Text>
                    <Text>${this.state.salestaxed}</Text>
                  </View> 
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>TOTAL TAX</Text>
                    <Text>${this.state.salestaxed}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>GRAND TOTAL</Text>
                    <Text>${this.state.grandtotal}</Text>
                  </View>
                </View>
             
          </View>


          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>TENDER TOTAL</Text>
            </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>CASH</Text>
                    <Text>${this.state.cashTender}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>CREDIT</Text>
                    <Text>${this.state.creditCard}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>EBT</Text>
                    <Text>${this.state.EBTTender}</Text>
                  </View>
                </View>
             
          </View>

          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>PERFORMANCE STATISTICS</Text>
            </View>
            
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>#RETURNED ITEMS</Text>
                    <Text>${this.state.TotalReturns}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text># OF TRANSACTIONS</Text>
                    <Text>${this.state.oftransaction}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text># AVG TRANSACTIONS</Text>
                    <Text>${this.state.avgtransaction}</Text>
                  </View>
                </View>

                
           
          </View>

          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>CASH COUNT</Text>
            </View>
           
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>OpeningCash</Text>
                    <Text>${this.state.openingcash}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>+ CASH SALES</Text>
                    <Text>${this.state.cashsales}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>- CASH PAID OUT</Text>
                    <Text>${this.state.cashpaidout}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>- SAFE DROP</Text>
                    <Text>${this.state.cashpickup}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Expected Cash</Text>
                    <Text>${this.state.expectedcash}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Actual Cash</Text>
                    <Text>${this.state.actualcash}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Cash Short</Text>
                    <Text>${this.state.cashShort}</Text>
                  </View>
                </View>
             
          </View>


        
          <Loading ref="loading" />
        </ScrollView>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#068AD6'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  headText: { color: "white", fontSize: 16, textAlign: "center", fontWeight: 'bold' },
  head: { height: 40, backgroundColor: '#3386D6' },
  text: { margin: 6, fontSize: 14, textAlign: 'left', color: '#3386D6' },
  table: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: '#ffff'
  }
});
