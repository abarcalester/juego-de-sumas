import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import RandomNumber from "./RandomNumber";
import shuffle from 'lodash.shuffle'	

let intervalID;
const Game = ({randomNumberCount, initialSeconds}) => {
    const [selectedNumbers, setSelectedNumbers] = useState([])
    const [randomNumber, setRandomNumber] = useState([])
    const [target, setTarget] = useState(1)
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)
    const [gameStatus, setGameStatus] = useState('PLAYING')
    const [gameOver, setGameOver] = useState(false)
    // const randomNumber = Array.from({ length: randomNumberCount })
    // .map(() => 1 + Math.floor(Math.random() * 10))
    // const target = randomNumber.slice(0, randomNumberCount - 2)
    // .reduce((acc, cur) => acc + cur, 0)
    
    
    const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex)
    const selectNumber = number => setSelectedNumbers([...selectedNumbers, number])
    const getGameStatus = () => {
        const numSelected = selectedNumbers.reduce((acc, cur) => acc + randomNumber[cur], 0)
        if (remainingSeconds === 0 || numSelected > target) {
            return 'LOST'
        }else if (numSelected === target) {
            return 'WON'
        } else{
            return 'PLAYING'
        } 
    }

    const handleReset = () => {
        setSelectedNumbers([])
        setRemainingSeconds(initialSeconds)
        setGameStatus('PLAYING')
        setGameOver(false)
    }

    
    useEffect(() => {
        if(gameOver === true) return
        const firstRandomNumber = Array.from({ length: randomNumberCount })
        .map(() => 1 + Math.floor(Math.random() * 10))
        const firstTarget = firstRandomNumber.slice(0, randomNumberCount - 2)
        .reduce((acc, cur) => acc + cur, 0)
        const shuffledRandomNumber = shuffle(firstRandomNumber)
        setRandomNumber(shuffledRandomNumber)
        setTarget(firstTarget)

        intervalID = setInterval(() => {
            setRemainingSeconds(seconds => seconds - 1)
        }, 1000)
 
        // return () => clearInterval(intervalID)

    }, [gameOver])

    useEffect(() => {
        setGameStatus(() => getGameStatus())
        if(remainingSeconds === 0 || gameStatus !== 'PLAYING') {
            setGameOver(true)
            clearInterval(intervalID)
        }
    }, [remainingSeconds, selectedNumbers, gameStatus]);

    // const status = gameStatus()
    return (
        <View>
            <Text style={[styles.target, styles[gameStatus]]}>{target}</Text>
            <Text>{gameStatus}</Text>
            <Text>{remainingSeconds}</Text>
            <Text>{target}</Text>
            <View style={styles.randomContainer}>
                {randomNumber.map((number, index) => (
                    <RandomNumber key={index} id={index} number={number} isSelected={isNumberSelected(index) || gameStatus !== 'PLAYING'} onSelected={selectNumber}/>
                ))}
            </View>
            {
                gameOver &&  (
                    <TouchableOpacity onPress={handleReset} style={styles.restart}>
                        <Text>Play Again</Text>
                    </TouchableOpacity>
                )
            }
           
        </View>
    )
}

const styles = StyleSheet.create({
    target: {
        fontSize: 40,
        backgroundColor: '#aaa',
        textAlign: 'center',
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    PLAYING: {
        backgroundColor: '#bbb'
    },
    WON: {
        backgroundColor: 'green',
    },
    LOST: {
        backgroundColor: 'red'
    },
    restart: {
        textAlign: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#aaa',
        color: '#fff'
    }
});

export default Game