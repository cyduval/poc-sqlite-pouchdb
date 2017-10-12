import React from 'react';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
    this.onClick = this.onClick.bind(this);

    this.state = {
      contacts: {},
      time: 0,
    };
  }

  componentWillMount() {
    // const contacts = [];
    const start = Date.now();
    window.db.allDocs({
      include_docs: true,
      attachments: true,
      startkey: 'contact',
      endkey: 'contact\ufff0',
    }).then((result) => {
      const d = Date.now() - start;
      console.log(`select contacts in ${d} ms`);
      console.log(result);
      this.setState({ contacts: result.rows, time: d });
    }).catch((err) => {
      console.log(err);
    });
  }

  onClick(id) {
    console.log(id);
    this.props.goTo(`/messages?contactId=${id}`);
  }

  renderListItem(o) {
    const { columnIndex, key, index, style, parent } = o;
    return (
      <CellMeasurer cache={cache} columnIndex={columnIndex} key={key} parent={parent} rowIndex={index}>
        <div key={`virtualized-${index}`} style={style}>
          <div style={styles.item} onTouchTap={() => this.onClick(this.state.contacts[index].id)}>
            {this.state.contacts[index].id} | {this.state.contacts[index].doc.name}
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
          {this.state.contacts.length} items in {this.state.time}ms
        </div>
        <List
          rowCount={this.state.contacts.length}
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

ContactsList.propTypes = {
  goTo: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    goTo: (url) => dispatch(push(url)),
  };
}

export default connect(false, mapDispatchToProps)(ContactsList);
