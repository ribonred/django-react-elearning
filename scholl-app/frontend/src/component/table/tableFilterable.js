import React from 'react';
import {
  Link
} from "react-router-dom";
import { Table, Button, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

export default class TableView extends React.Component {
  state = {
    bordered: false,
  };

  handleToggle = prop => enable => {
    this.setState({ [prop]: enable });
  };

  handleDataChange = hasData => {
    this.setState({ hasData });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  withSorter(propertyName){
    return {
      sorter: (a, b) => a[propertyName] - b[propertyName],
    }
  }

  withDropdownFilter(options1, options2, dataIndex){
    return (
      {
        filters: [
          {
            text: options1,
            value: options1,
          },
          {
            text: options2,
            value: options2,
          },
        ],
        onFilter: (value, record) => {
          return record[dataIndex].indexOf(value) === 0
        },
      }
    )
  }

  getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  onDelete = (a,b) => {
    alert(a)
    console.log('delete',a)
  }

  onEdit = (a,b) => {
    alert(a)
    console.log('edit',a)
  }

  render() {
    const { xScroll, yScroll, ...state } = this.state;
    const { path, tableField } = this.props;
    const scroll = {};
    if (yScroll) {
      scroll.y = 240;
    }
    if (xScroll) {
      scroll.x = '100vw';
    }

    const column = this.props.tableField.map(data => {
      const isSearchable = data.search === true
        ? this.getColumnSearchProps(data.dataIndex) : {};
      const isSortable = data.sort === true
        ? this.withSorter(data.dataIndex) : {};
      const isWithDropdown = data.dropdown !== null && data.dropdown !== undefined
        ? this.withDropdownFilter(data.dropdown[0], data.dropdown[1], data.dataIndex) : {};
      return {
        title: data.title,
        dataIndex: data.dataIndex,
        ...isSearchable,
        ...isSortable,
        ...isWithDropdown,
      }
    })

    const columns = column.concat({
      title: 'Action',
      key: 'action',
      sorter: true,
      filters: [],
      onFilter: () => {},
      render: (text, record) => (
        <span>
          <a
            href="#!"
            style={{ marginRight: 16, color: 'red' }}
            onClick={(e) => { this.onDelete(record, e); }}
          >
            Delete <DeleteOutlined />
          </a>
          <Link
            to={`/dashboard/${path}/${record[tableField[0].dataIndex]}/edit`}
            style={{ marginRight: 16 }}
          >
            Edit <EditOutlined />
          </Link>
          <Link
            to={`/dashboard/${path}/${record[tableField[0].dataIndex]}`}
            style={{ marginRight: 16, color: 'aqua' }}
          >
            View <EyeOutlined />
          </Link>
        </span>
      ),
    })

    const tableColumns = columns.map(item => ({ ...item }));
    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }

    return (
      <div style={{padding:'15px'}}>
        <Table
          {...this.state}
          loading={this.props.isLoading}
          columns={tableColumns}
          bordered
          title={() => `BASIS DATA ${path.toUpperCase()}`}
          dataSource={this.props.tableData}
          scroll={scroll}
        />
      </div>
    );
  }
}