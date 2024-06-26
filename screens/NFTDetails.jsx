import { View, Text, SafeAreaView, StyleSheet, Animated, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLORS , SIZES, FONTS } from '../constants'
import NFTImage from '../components/NFTImage'
import NFTAvatars from '../components/NFTAvatars'
import NFTTitle from '../components/NFTTitle'
import NFTInfo from '../components/NFTInfo'
import NFTMoreinfo from '../components/NFTMoreinfo'
import { FontAwesome } from '@expo/vector-icons'
import Button from '../components/Button'
const NFTDetails = ({route , navigation}) => {
  const {NFTData} = route.params;

  const moveAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const pressHandler = () => {
    navigation.goBack();
  };
  
  const moveAnimationHandler =() =>{
    Animated.spring(moveAnimation , {
      toValue : 1,
      friction :6 ,
      tension :80 ,
      useNativeDriver :true
      
    }).start();
  }
  const fadeAnimationHandler =() =>{
    Animated.timing(fadeAnimation , {
      toValue : 1,
      duration : 1000 ,
      delay :300 ,
      useNativeDriver :true
    }).start();
  }
  useEffect(()=>{
    moveAnimationHandler();
    fadeAnimationHandler();
  }, [moveAnimationHandler , fadeAnimationHandler])
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{
        flex : 1 , 
        transform : [
          {
            translateY :moveAnimation.interpolate({
              inputRange :[0, 1],
              outputRange :[200 , 0]
            })
          }
        ]}}>
        <ScrollView>
        <NFTImage image={NFTData.image} 
          imageStyles={styles.imageStyles} 
          love 
          arrow
          pressHandler={pressHandler}
        />
        <View style={{paddingHorizontal : SIZES.xLarge}}>
          <View style={{marginTop : -SIZES.xLarge}}>
            <NFTAvatars avatars={NFTData.avatars}/>
          </View>
          <View style={{marginVertical : SIZES.medium}}>
            <NFTTitle
            _name={NFTData.name}
            creator={NFTData.creator}
            date={NFTData.date}/>
          </View>
          <View style={{marginVertical : SIZES.medium}}>
            <NFTInfo
            views={NFTData.views}
            comments={NFTData.comments}
            price={NFTData.price}/>
          </View>
          <View style={{marginVertical : SIZES.medium}}>
            <NFTMoreinfo
              address={NFTData.address}
              tokenId={NFTData.tokenId}
              tokenSt={NFTData.tokenSt}
              blockchain={NFTData.blockchain}/>
          </View>
        </View>
        </ScrollView>
        <Animated.View style={[
          styles.buttonContainer ,
          {
            opacity : fadeAnimation,
          }]}>
            <View style={styles.wrapper}> 
              <View>
                <Text style={styles.text}> Top Bid</Text>
                <View style={{
                  flexDirection : "row",
                  alignItems :"center",
                  gap :2 ,
                  padding :SIZES.small - 4 }}>
                   <FontAwesome 
                  name='dollar'
                  size={15}
                  color={COLORS.white}/>
                  <Text style={styles.text}>{NFTData.topBid}</Text>
                </View>
              </View>
              <Button 
                title ='place a Bid'
                stylesText={styles.textButton}
                stylesButton={styles.button}/>
            </View>
            
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  )
}

export default NFTDetails

const styles = StyleSheet.create({
  container :{
    flex : 1,
    backgroundColor : COLORS.bg,
    
  },
  header : {
    width : "100%",
    marginTop : -20,
    flexDirection : "row",
    justifyContent : "space-between",
  },
  imageStyles : {
    width : "100%",
    height : 400 ,
    borderRadius :20
  },
  text :{
    fontSize : SIZES.medium,
    fontFamily : FONTS.semiBold,
    color : COLORS.white
  },
  buttonContainer :{
    width : "100%",
    position : "absolute",
    bottom : SIZES.small,
    justifyContent : "center",
    alignItems :"center",
    zIndex : 1,
  },
  wrapper : {
    backgroundColor : COLORS.cardBg,
    width : 300 ,
    flexDirection : "row",
    justifyContent :"space-between" ,
    alignItems :'center' ,
    padding : 20 ,
    borderRadius : 20,
  },
  button :{
    backgroundColor : COLORS.second ,
    padding : 16 ,
    width : 150,
    borderRadius : 20
  },
  textButton :{
    color : COLORS.white,
    textAlign : "center" ,
    fontFamily : FONTS.semiBold ,
    fontSize : 16,
  }
})