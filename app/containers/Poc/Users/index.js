import React from 'react';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import styles from './style';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 50,
});

export class UsersList extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
    this.state = {
      users: {},
      time: 0,
    };
  }

  componentWillMount() {
    const users = [];
    const start = Date.now();
    window.database.transaction((transaction) => {
      const sql = 'SELECT id, uid, name FROM users';
      transaction.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          const d = Date.now() - start;
          console.log('select users succeed');
          console.log(resultSet);
          for (let x = 0; x < resultSet.rows.length; x++) {
            users.push(resultSet.rows.item(x));
          }
          this.setState({ users, time: d });
        },
        (tx, error) => {
          console.log(`SELECT error: ${error.message}`);
        }
      );
    });
  }

  renderListItem(o) {
    const { columnIndex, key, index, style, parent } = o;
    return (
      <CellMeasurer cache={cache} columnIndex={columnIndex} key={key} parent={parent} rowIndex={index}>
        <div key={`virtualized-${index}`} style={style}>
          <div style={styles.item}>
            <div>
              {this.state.users[index].uid}
            </div>
            <div>
              {this.state.users[index].name}
            </div>
          </div>
        </div>
      </CellMeasurer>
    );
  }

  render() {
    console.log(this.state.users.length);

    if (!this.state.users.length) {
      return false;
    }

    console.log('continue');
    console.log(this.state.users);

    return (
      <div style={styles.layout}>
        <div style={styles.header}>
          {this.state.users.length} items in {this.state.time}ms
        </div>
        <List
          rowCount={this.state.users.length}
          width={500}
          height={500}
          rowHeight={80}
          rowRenderer={this.renderListItem}
          overscanRowCount={1}
          ref={(r) => {
            this.virtualized = r;
          }}
        />
      </div>
    );
  }
}

export default UsersList;
