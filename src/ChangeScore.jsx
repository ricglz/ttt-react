export default function changeScore(oWins) {
  var newCount;
  if (oWins === true) {
    newCount = this.state.oWins + 1;
    this.setState({
      oWins: newCount
    });
  } else {
    newCount = this.state.xWins + 1;
    this.setState({
      xWins: newCount
    });
  }
}