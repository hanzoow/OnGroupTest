import React, {useEffect} from 'react';
import {View} from 'react-native';
import BoardItem from '../BoardItem';
const Board = ({matrix = [], onItemPress, ...props}) => {
  useEffect(() => {
    console.log('matrixmatrixmatrixmatrix');
  }, [matrix]);

  return (
    <View style={{marginTop: 40}}>
      {matrix.map((row, indexRow) => {
        return (
          <View
            key={indexRow}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
            }}>
            {row.map((column, indexColumn) => {
              return (
                <BoardItem
                  indexColumn={indexColumn}
                  indexRow={indexRow}
                  onItemPress={onItemPress}
                  key={column.value}
                  column={column}
                  isOpened={column.isOpened}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default React.memo(Board);
