import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
const RandomNumber = ({number, isSelected, id, onSelected}) => {

    const handlePress = e => {
        if(!isSelected) {
            onSelected(id)
        }
    }


    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.random, isSelected && styles.selected]}>{number}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 100,
        minHeight: 45,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 35,
        textAlign: 'center'
    },
    selected: {
        opacity: .3,
    }
})
 
export default RandomNumber;