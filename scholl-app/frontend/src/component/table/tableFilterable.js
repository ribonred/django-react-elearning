import React from 'react';
import {
  Link
} from "react-router-dom";
import ModalDescription from '../modal/modalDescription';

import { Table, Button, Input, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {filterdate} from '../../helper/filter'

const filter = filterdate

export default class TableView extends React.Component {
  state = {
    bordered: false,
    data: null,
    visible: false,
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
          if(record[dataIndex]){
            return record[dataIndex].indexOf(value) === 0
          } else {
            return false
          }
          // return record[dataIndex].indexOf(value) === 0
        },
      }
    )
  }

  getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }} key={dataIndex}>
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
        this.state.searchedColumn === dataIndex && text ? (
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

  onDelete = (a,b,c) => {
    this.props.onDelete(a.id, b)
  }

  onEdit = (a,b) => {
  }

  onView = (a,b) => {
    const viewableData = {
      ...a
    }
    delete viewableData.key
    this.setState({visible:true, data:viewableData})
  }

  applyDateFilter = (action) => {
    if(action==='filter'){
      this.props.applyDateFilter(filter)
    } else {
      this.props.applyDateFilter()
    }
  }

  render() {
    const { xScroll, yScroll } = this.state;
    const { path, tableField } = this.props;
    const scroll = {};
    if (yScroll) {
      scroll.y = 240;
    }
    if (xScroll) {
      scroll.x = '100vw';
    }
    
    const tableDataWithKey = this.props.tableData ? this.props.tableData.map((data, index) => {
      return {
        ...data,
        key:index
      }
    }) : []

    const number = [{
      title: 'Nomor',
      key: 'index',
      render : (text, record, index) => tableDataWithKey.indexOf(record) + 1
    }]

    const column = number.concat(this.props.tableField.map(data => {
      const isSearchable = data.search === true
        ? this.getColumnSearchProps(data.dataIndex) : {};
      const isSortable = data.sorting === true
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
    }))


    const { useId, editModal, viewModal } = this.props;
    let isEditAllowed = true;
    let isDeleteAllowed = true;
    let isViewAllowed = true;
    if(this.props.isNotAllowTo){
      isEditAllowed = this.props.isNotAllowTo.indexOf('edit') === -1
      isDeleteAllowed = this.props.isNotAllowTo.indexOf('delete') === -1
      isViewAllowed = this.props.isNotAllowTo.indexOf('view') === -1
    }

    const isAllNotAllowed = !isEditAllowed && !isDeleteAllowed && !isViewAllowed

    let columns = column;
    if(!isAllNotAllowed){
      columns = columns.concat({
        title: 'Action',
        key: 'action',
        sorter: true,
        filters: [],
        onFilter: () => {},
        render: (text, record) => (
          <span>
            {isDeleteAllowed && (
              <a
              href="#!"
              style={{ marginRight: 16, color: 'red' }}
              onClick={(e) => { this.onDelete(record, path, e); }}
            >
              Delete <DeleteOutlined />
            </a>
          )}
          {isEditAllowed && (
            !editModal ? (
              <Link
                to={`/dashboard/${path}/${useId ? record['id'] : record[tableField[0].dataIndex]}/edit`}
                style={{ marginRight: 16 }}
              >
                Edit <EditOutlined />
              </Link>
            ) : (
              <a
                href="#!"
                style={{ marginRight: 16, color: 'red' }}
                onClick={(e) => { this.onEdit(record, path, e); }}
              >
                Edit <EditOutlined />
              </a>
            )
          )}
          {isViewAllowed && (
            !viewModal ? (
              <Link
                to={`/dashboard/${path}/${useId ? record['id'] : record[tableField[0].dataIndex]}`}
                style={{ marginRight: 16, color: 'aqua' }}
              >
                View <EyeOutlined />
              </Link>
            ) : (
              <a
                href="#!"
                style={{ marginRight: 16, color: 'aqua' }}
                onClick={(e) => { this.onView(record, path, e); }}
              >
                View <EyeOutlined />
              </a>
            )
          )}
          </span>
        ),
      })
    }

    const tableColumns = columns.map(item => ({ ...item }));
    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }
    
    return (
      <div style={{padding:'15px'}}>
        {this.props.applyDateFilter && (
          <div className="table-operations">
            <DatePicker onChange={(i, e) => filter.startDate = e}/>
            <DatePicker onChange={(i, e) => filter.endDate = e}/>
            <Button onClick={(action) => this.applyDateFilter('filter')}>Filter</Button>
            <Button onClick={(action) => this.applyDateFilter('clear')}>Clear filters</Button>
          </div>
        )}
        <ModalDescription
          visible={this.state.visible}
          data={this.state.data || []}
          hideModal={() => this.setState({visible: false})}
        />
        <Table
          {...this.state}
          loading={this.props.isLoading}
          columns={tableColumns}
          bordered
          title={() => `BASIS DATA ${path.toUpperCase()}`}
          dataSource={tableDataWithKey}
          scroll={scroll}
        />
      </div>
    );
  }
}
