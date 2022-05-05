import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Kirin',
    };
  }

  render() {
    return (
      <div>
        <p>Hi {this.state.name}</p>
        <button
          onClick={() => {
            this.setState(
              () => {
                return {
                  name: 'Kuroro',
                };
              },
              // 最新の値が欲しい場合はこれ。
              () => {
                console.log(this.state);
              }
            );
          }}
        >
          Change Name
        </button>
      </div>
    );
  }
}

export default App;
