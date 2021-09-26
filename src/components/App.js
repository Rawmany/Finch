import React from "react";
import '../main.css';

import Loto from "./Loto.js";
import LotoCompleted from "./LotoCompleted.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numericCells: {
        main: [
          {
            value: 1,
            isChosen: false,
            field: 'main',
          },
          {
            value: 2,
            isChosen: false,
            field: 'main',
          },
          {
            value: 3,
            isChosen: false,
            field: 'main',
          },
          {
            value: 4,
            isChosen: false,
            field: 'main',
          },
          {
            value: 5,
            isChosen: false,
            field: 'main',
          },
          {
            value: 6,
            isChosen: false,
            field: 'main',
          },
          {
            value: 7,
            isChosen: false,
            field: 'main',
          },
          {
            value: 8,
            isChosen: false,
            field: 'main',
          },
          {
            value: 9,
            isChosen: false,
            field: 'main',
          },
          {
            value: 10,
            isChosen: false,
            field: 'main',
          },
          {
            value: 11,
            isChosen: false,
            field: 'main',

          },
          {
            value: 12,
            isChosen: false,
            field: 'main',
          },
          {
            value: 13,
            isChosen: false,
            field: 'main',
          },
          {
            value: 14,
            isChosen: false,
            field: 'main',
          },
          {
            value: 15,
            isChosen: false,
            field: 'main',
          },
          {
            value: 16,
            isChosen: false,
            field: 'main',
          },
          {
            value: 17,
            isChosen: false,
            field: 'main',
          },
          {
            value: 18,
            isChosen: false,
            field: 'main',
          },
          {
            value: 19,
            isChosen: false,
            field: 'main',
          },
        ],
        additional: [
          {
            value: 1,
            isChosen: false,
            field: 'additional',
          },
          {
            value: 2,
            isChosen: false,
            field: 'additional',
          },
        ],
      },
      counter: {
        main: 0,
        additional: 0
      },
      generateDigits: {
        mainDigits: {},
        additionalDigits: {},
      },
      isAdditionalDigit: false,
      isCompleted: false,
      isTicketWon: false,
      toggleCell: (data) => {

        let { value, isChosen, field } = data;
        let counter = this.state.counter;
        let numericCells = this.state.numericCells;

        if (((counter.main + counter.additional === 8) || (counter.additional === 1 && field === 'additional')) && isChosen === false) return;

        let numericCellItem = numericCells[field].find(obj => obj.value === value);

        if (!isChosen) {
          this.setState({
            counter:  {
              ...this.state.counter,
              [field] : ++counter[field]
            },
          });
          numericCellItem.isChosen = true;
        } else {
          this.setState({
            counter:  {
              ...this.state.counter,
              [field] : --counter[field]
            },
          });
          numericCellItem.isChosen = false;
        }
      },
      fillCells: () => {
        let mainDigits = this.state.numericCells.main;
        let additionalDigits = this.state.numericCells.additional;

        //reset isChosen values
        this.state.resetChosenCells(mainDigits);
        this.state.resetChosenCells(additionalDigits);

        //determine the availability of additional digits
        if (this.state.defineIsAdditionalOption()) {
          let randomAdditionalDigit = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
          additionalDigits.find(obj => obj.value === randomAdditionalDigit).isChosen = true;

          for (let i = 1; i <= 7;) {
            let randomMainDigit = Math.floor(Math.random() * (19 - 1 + 1)) + 1;
            let mainDigit = mainDigits.find(obj => obj.value === randomMainDigit);
            if (!mainDigit.isChosen) {
              mainDigit.isChosen = true;
              i++;
            }
          }

          this.setState({isAdditionalDigit: true});
          this.setState({
            counter: {
              ...this.state.counter,
              'additional': 1,
              'main': 7,
            },
          });
        } else {
          for (let i = 1; i <= 8;) {
            let randomMainDigit = Math.floor(Math.random() * (19 - 1 + 1)) + 1;
            let mainDigit = mainDigits.find(obj => obj.value === randomMainDigit);
            if (!mainDigit.isChosen) {
              mainDigit.isChosen = true;
              i++;
            }
          }

          this.setState({isAdditionalDigit: false});
          this.setState({
            counter: {
              ...this.state.counter,
              'additional': 0,
              'main': 8,
            },
          });
        }
      },
      checkResult: () => {
        let winCombinationMain = [];
        let winAdditionalDigit = 0;

        //init winner combination digits

        //determine the availability of additional digits
        if (this.state.defineIsAdditionalOption()) {
          winAdditionalDigit = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
          winCombinationMain = this.state.createWinCombination(7, 1, 19);
        } else {
          winCombinationMain = this.state.createWinCombination(8, 1, 19);
        }

        let mainDigits = this.state.numericCells.main;
        let additionalDigits = this.state.numericCells.additional;
        let winDigits = [];

        if (winCombinationMain && mainDigits)
          for (let i = 0; i < winCombinationMain.length; i++) {
            let result = mainDigits.find((obj => (obj.value === winCombinationMain[i] && obj.isChosen === true)));
            if(result) winDigits.push(winCombinationMain[i]);
          }

        if (this.state.isAdditionalDigit) {
          let result = additionalDigits.find((obj) => (obj.value === winAdditionalDigit && obj.isChosen === true));
          if(result) winDigits.push(result.value);
        }

        this.setState({isCompleted: true});
        if (winDigits.length > 3) this.setState({ isTicketWon: true });
      },

      //tools functions
      defineIsAdditionalOption: () => {
        let min = 0;
        let max = 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      resetChosenCells: (array) => {
        let arrayLength = array.length;

        for (let i = 0; i <= arrayLength; i++) {
          let result = array.find(obj => obj.isChosen === true);
          if(result) result.isChosen = false;
        }
      },
      createWinCombination: (count, min, max) => {
        if (count > (max - min)) return;
        let arr = [], t;

        while (count) {
          t = Math.floor(Math.random() * (max - min) + min);
          if (arr.indexOf(t) === -1) {
            arr.push(t);
            count--;
          }
        }

        return arr;
      },
    }
  }

  render() {
    return (
       <div className={"wrapper"}>
         <h2>Ticket 1</h2>
         { this.state.isCompleted
             ? <LotoCompleted isTicketWon={this.state.isTicketWon} />
             :  <Loto numericCells={this.state.numericCells} toggleCell={this.state.toggleCell}
                      fillCells={this.state.fillCells} checkResult={this.state.checkResult} /> }
       </div>
    )
  }

}


export default App;
