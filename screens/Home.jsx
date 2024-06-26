import { View, Text , StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, FlatList, StatusBar, Animated} from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {COLORS , SIZES , FONTS, DATA} from "../constants";
import NFTCard from "../components/NFTCard"
import HomeHeader from '../components/HomeHeader';
import { FlashList } from '@shopify/flash-list'
const Home = () => {
  const [nftsData , setNftsData] = useState(DATA)
  const moveSearchAnimation = useRef(new Animated.Value(0)).current; 
  
  /**
   * @desc search nfts data by name
   * @param {*} value 
   */
  const searchHandler = (value) => {
    if(value){
      const filteredData = DATA.filter((nft) => 
        nft.name.toLowerCase().includes(value.toLowerCase())
      );
      setNftsData(filteredData);
    }
    else {
      setNftsData(DATA)
    }
  }
  const NotFoundNFT = () => {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Opps... !</Text>
        <Text style={styles.notFoundText}>Not found this NFT</Text>
      </View>
    )
  }
  const searchAnimationHandler=() =>{
    Animated.spring(moveSearchAnimation, {
      toValue : 1,
      friction :4 ,
      useNativeDriver : true
    }).start();
  }
  useEffect(() => {
    searchAnimationHandler();
  } , [searchAnimationHandler])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex : 1}}>
        <Animated.View style={{
          top : -100, 
          transform : [{
            translateY : moveSearchAnimation.interpolate({
              inputRange : [0, 1],
              outputRange : [0 , 100]
            })
          }]
        }}>
          <HomeHeader searchHandler={searchHandler}/>
        </Animated.View>
        {!nftsData.length ? (
          <NotFoundNFT/>
          ) : 
          (
            <FlashList
            estimatedItemSize={200} 
            data={nftsData}
            renderItem={({item})=>
              <NFTCard NFTData={item}/>
            }
            keyExtractor={(item) => item.id}
          />
          )
        }
        
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles= StyleSheet.create({
  container : {
    flex : 1 ,
    backgroundColor : COLORS.bg,
    paddingTop: StatusBar.currentHeight + 10,
  },
  notFoundContainer : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    paddingVertical : SIZES.xLarge
  },
  notFoundText : {
    fontFamily : FONTS.bold,
    fontSize : SIZES.xLarge ,
    color : COLORS.white 
  },
  
})