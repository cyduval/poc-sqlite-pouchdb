import React from 'react';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import styles from './style';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 50,
});

export class MessageList extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
    this.state = {
      messages: {},
      time: 0,
    };
  }

  componentWillMount() {
    const contactId = this.props.location.search.replace('?contactId=', '');
    const start = Date.now();
    console.log(contactId);
    const messages = [];
    window.database.transaction((transaction) => {
      const sql = `SELECT M.id, M.uid, subject, content FROM messages AS M, messages_contacts AS MC WHERE M.id = MC.message_id
                   AND MC.contact_id = ${contactId}`;
      transaction.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          console.log('select messages succeed');
          console.log(resultSet);
          const d = Date.now() - start;
          for (let x = 0; x < resultSet.rows.length; x++) {
            messages.push(resultSet.rows.item(x));
          }
          this.setState({ messages, time: d });
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
              {this.state.messages[index].uid}
            </div>
            <div>
              {this.state.messages[index].subject}
            </div>
            <div>
              {this.state.messages[index].content}
            </div>
          </div>
        </div>
      </CellMeasurer>
    );
  }

  render() {
    console.log(this.state.messages.length);

    if (!this.state.messages.length) {
      return false;
    }

    console.log('continue');
    // console.log(this.state.messages);

    return (
      <div style={styles.layout}>
        <div style={styles.header}>
          {this.state.messages.length} items in {this.state.time}ms
        </div>
        <List
          rowCount={this.state.messages.length}
          width={500}
          height={500}
          rowHeight={250}
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

MessageList.propTypes = {
  location: React.PropTypes.object,
};

export default MessageList;
