import { useState } from "react";
import axios from "axios";

import { Table, Input, Pagination } from "antd";
import { Error } from "./Error";

import columns from "../utils/columns";

import "antd/dist/antd.css";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(1);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const { Search } = Input;

  const dataSource = users.map((item) => ({ ...item, key: item.id }));

  const onSearch = (page) => {
    setPage(page);
    setIsLoading(true);
    try {
      axios
        .get(
          `https://api.github.com/search/users?page=${page}&per_page=9&q=${inputValue}in:login`
        )
        .then((response) => {
          setIsLoading(false);
          setUsers(response.data.items);
          console.log(response);
          setCountPage(Math.ceil(response.data.total_count / 9));
        });
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const onSearchSubmit = () => onSearch(1);
  const onInputValueChange = (e) => setInputValue(e.target.value);

  return (
    <>
      <Search
        placeholder="Search Github Repositories"
        value={inputValue}
        onChange={onInputValueChange}
        loading={isLoading}
        enterButton="Submit"
        size="large"
        onSearch={onSearchSubmit}
      />

      {error && <Error error={error} />}

      {!!users.length && (
        <>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
          <Pagination
            current={page}
            defaultCurrent={1}
            total={countPage}
            onChange={onSearch}
          />
        </>
      )}
    </>
  );
};

export default Searchbar;
