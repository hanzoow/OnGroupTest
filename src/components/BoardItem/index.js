import React, {useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
const BoardItem = ({
  column,
  onItemPress,
  indexColumn,
  indexRow,
  isOpened,
  ...props
}) => {
  useEffect(() => {
    console.log('columncolumncolumncolumncolumn1111');
  }, [column]);
  return (
    <View
      style={{
        height: 50,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        disabled={isOpened}
        onPress={() =>
          onItemPress?.({
            rowPressed: indexRow,
            columnPressed: indexColumn,
            isPrimeNumber: column.isPrimeNumber,
          })
        }
        style={{
          backgroundColor: column.isPrimeNumber ? 'green' : 'red',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          marginHorizontal: 2,
        }}>
        <Text>{column.value}</Text>
        <View
          style={
            !isOpened && {
              flex: 1,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: 'gray',
            }
          }
        />
      </TouchableOpacity>
      <View
        style={[
          {
            backgroundColor: column.selectedByUser
              ? column.selectedByUser === 1
                ? 'yellow'
                : 'black'
              : null,
          },
          {width: 10, height: 10, borderRadius: 10, marginTop: 3},
        ]}
      />
    </View>
  );
};

export default React.memo(BoardItem);
