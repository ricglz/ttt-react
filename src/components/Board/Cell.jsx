import React from 'react';
import PropTypes from 'prop-types';

const currentValue = (boardGame, boardNum, cellNum) => boardGame[boardNum][cellNum];

function drawValue(boardGame, boardNum, cellNum) {
  switch (currentValue(boardGame, boardNum, cellNum)) {
    case 1:
      return 'X';
    case -1:
      return 'O';
    default:
      return '';
  }
}

const emptyFunction = () => {
  // do nothing
};

const Cell = ({
  boardGame, boardNum, cellNum, handleClick,
}) => {
  const value = drawValue(boardGame, boardNum, cellNum);
  const onClick = React.useCallback(() => {
    handleClick(boardNum, cellNum);
  }, [boardNum, cellNum, handleClick]);
  return (
    <div
      className="col-4 box"
      onClick={onClick}
      onKeyDown={emptyFunction}
      role="button"
      tabIndex="-1"
    >
      <p className={value.toLowerCase()}>{value}</p>
    </div>
  );
};

Cell.propTypes = {
  boardGame: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  boardNum: PropTypes.number.isRequired,
  cellNum: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Cell;
