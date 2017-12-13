import * as React from "react";
import Input from "antd/lib/input";
import Search from "antd/lib/input/Search";

export interface IColumn {
  title: string
}

export interface ISearchBarProps {
  columns: Array<IColumn>,
  search: (string) => void,
  keyword: string
}

export interface ISearchBarState {
  placeholder: string,
  hover: Boolean
}

export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = {
      placeholder: getPrettyPlaceholder(props.columns.map(c => c.title)),
      hover: false
    };
    this.hover = this.hover.bind(this);
    this.clear = this.clear.bind(this);
  }

  private textInput: Search;

  hover(bool: Boolean) {
    this.setState({ hover: bool });
  }

  clear() {
    const input = this.textInput.input.refs.input;
    input.value = '';
    this.props.search('');
  }

  render() {
    const { placeholder } = this.state;
    return (
      <div className="ant-table-searchbar" onMouseEnter={() => this.hover(true)} onMouseLeave={() => this.hover(false)}>
        <Search
          placeholder={placeholder}
          defaultValue={this.props.keyword}
          style={{ width: 240 }}
          onSearch={this.props.search}
          ref={(input) => { this.textInput = input; }} />
        {this.state.hover && <ClearIcon onClick={this.clear} />}
      </div>
    );
  }
}

function getPrettyPlaceholder(columns: Array<string>): string {
  const cols = columns.slice(0);
  const lastCol = cols.pop();
  if (cols.length === 0) {
    return `按 ${lastCol} 搜索`;
  } else {
    const s = cols.join(', ');
    return `按 ${s} 或 ${lastCol} 搜索`;
  }
}

function ClearIcon(props: { onClick: React.MouseEventHandler<HTMLElement> }) {
  let style: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    right: 28,
    zIndex: 1,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.15)',
  };
  return <i className="anticon anticon-close-circle" style={style} onClick={props.onClick} />;
}
