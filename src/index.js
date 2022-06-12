/* eslint-disable no-extra-boolean-cast */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Board from './components/Board';
import {getMatrix, randomArrayWithUniqueValue} from './utils/array';
import {isPrime} from './utils/number';
import Modal from 'react-native-modal';

const defaultUsers = [
  {id: 1, name: 'user 1', selectedPrimeNumbers: 0},
  {id: 2, name: 'user 2', selectedPrimeNumbers: 0},
];

const CaroScreen = () => {
  const [board, setBoard] = useState([]);
  const [players, setPlayers] = useState(defaultUsers);
  const [turnOfUser, setTurnOfUser] = useState(1);
  const [totalOfPrimeNumber, setTotalOfPrimeNumber] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);

  const initBoard = () => {
    const randomArrayValue = randomArrayWithUniqueValue(100);
    console.log('randomArrayValue', randomArrayValue);
    const arrayValueWithInfo = randomArrayValue.map(value => {
      return {value, isOpened: false, isPrimeNumber: isPrime(value)};
    });
    let totalPrimeNumber = arrayValueWithInfo.filter(e => !!e.isPrimeNumber);
    setTotalOfPrimeNumber(totalPrimeNumber.length);
    const matrix = getMatrix(arrayValueWithInfo, 10);
    setBoard(matrix);
  };

  useEffect(() => {
    initBoard();
  }, []);

  const highestPlayerScore = React.useMemo(() => {
    console.log('playersplayers', players);
    const copyPlayer = [...players];
    const sortHighestScore = copyPlayer.sort(
      (a, b) => b.selectedPrimeNumbers - a.selectedPrimeNumbers,
    );
    return sortHighestScore[0];
  }, [players]);

  useEffect(() => {
    if (!totalOfPrimeNumber && !!board.length) {
      console.log('END GAME');
      setIsEndGame(true);
    }
  }, [totalOfPrimeNumber, board.length, players]);

  console.log('turnnnn', turnOfUser);

  console.log('totalOfPrimeNumbertotalOfPrimeNumber', totalOfPrimeNumber);

  const onItemPress = React.useCallback(
    boardInfo => {
      console.log('boardInfoboardInfo', boardInfo);
      setTurnOfUser(currentTurn => {
        return currentTurn === 1 ? 2 : 1;
      });
      if (boardInfo.isPrimeNumber) {
        setTotalOfPrimeNumber(
          currentTotalOfPrimeNumber => currentTotalOfPrimeNumber - 1,
        );
      }
      setBoard(currentBoard => {
        const copyCurrentBoard = [...currentBoard];
        currentBoard[boardInfo?.rowPressed][
          boardInfo?.columnPressed
        ].isOpened = true;
        currentBoard[boardInfo?.rowPressed][
          boardInfo?.columnPressed
        ].selectedByUser = turnOfUser;
        setPlayers(currentPlayers => {
          //   const copyCurrentPlayers = [...currentPlayers];
          //   const selectedUser = copyCurrentPlayers.find(player => {
          //     return player.id === turnOfUser;
          //   });
          //   if (boardInfo.isPrimeNumber) {
          //     selectedUser.selectedPrimeNumbers++;
          //   }
          return currentPlayers.map(player => {
            console.log(
              'boardInfo.isPrimeNumberboardInfo.isPrimeNumber',
              boardInfo.isPrimeNumber,
              player.id,
              turnOfUser,
            );
            return {
              ...player,
              selectedPrimeNumbers:
                boardInfo.isPrimeNumber && player.id === turnOfUser
                  ? player.selectedPrimeNumbers + 1
                  : player.selectedPrimeNumbers,
            };
          });
        });
        return copyCurrentBoard;
      });
    },
    [turnOfUser],
  );

  const onCloseAndResetPressed = React.useCallback(() => {
    setIsEndGame(false);
    initBoard();
    setTurnOfUser(1);
    setPlayers(defaultUsers);
  }, []);

  console.log('playersss', players);
  console.log('boardddd', board);

  return (
    <View style={{marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        {players.map((value, index) => {
          return (
            <View
              style={{
                padding: 10,
                borderRadius: 20,
                backgroundColor: turnOfUser === value.id ? 'red' : null,
                alignItems: 'center',
              }}
              key={value.id}>
              <Text>{value.name}</Text>
              <Text>Total: {value.selectedPrimeNumbers || 0}</Text>
              <View
                style={[
                  {
                    backgroundColor: value.id === 1 ? 'yellow' : 'black',
                  },
                  {width: 10, height: 10, borderRadius: 10, marginTop: 3},
                ]}
              />
            </View>
          );
        })}
      </View>
      <Board onItemPress={onItemPress} matrix={board} />
      <Modal
        style={{margin: 0, backgroundColor: 'rgba(146, 102, 22, 0.5)'}}
        transparent={true}
        statusBarTranslucent={true}
        visible={isEndGame}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
            END GAME AND CONGRATS ON WINNING USER {highestPlayerScore.name}
          </Text>
          <Text style={{color: 'white', fontSize: 20}}>
            with score is {highestPlayerScore.selectedPrimeNumbers}
          </Text>
          <TouchableOpacity onPress={onCloseAndResetPressed}>
            <Text>Close and resetBoard</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(CaroScreen);
