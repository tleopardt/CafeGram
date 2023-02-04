import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../../../styles'

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions()
  
  return (
    <View style={{ flexDirection: 'row', height: 30 }}>
      {
          data.map((_, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [10, 20, 10],
                extrapolate: 'clamp',
            })

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
            })

            return (
                <Animated.View
                    style={[styles.dot, { width: dotWidth, opacity }]}
                    key={index.toString()}
                />
            )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brandPink,
    marginHorizontal: 5
  },
})
