import React from 'react';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import styles from './style';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 50,
});

export class ContactsList extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
    this.state = {
      contacts: {},
    };
  }

  componentWillMount() {
    const contacts = [];
    window.database.transaction((transaction) => {
      const sql = 'SELECT id, uid, name FROM contacts';
      transaction.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          console.log('select contacts succeed');
          console.log(resultSet);
          for (let x = 0; x < resultSet.rows.length; x++) {
            contacts.push(resultSet.rows.item(x));
          }
          this.setState({ contacts });
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
              {this.state.contacts[index].uid}
            </div>
            <div>
              {this.state.contacts[index].name}
            </div>
          </div>
        </div>
      </CellMeasurer>
    );
  }

  render() {
    console.log(this.state.contacts.length);

    if (!this.state.contacts.length) {
      return false;
    }

    console.log('continue');
    console.log(this.state.contacts);

    return (
      <div style={styles.layout}>
        <div style={styles.header}>
          {this.state.contacts.length} items
        </div>
        <List
          rowCount={this.state.contacts.length}
          width={500}
          height={400}
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

export default ContactsList;
