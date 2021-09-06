import { useState } from "react";
import { Table, Input } from "antd";
import { Error } from "./Error";

import columns from "../utils/columns";

import "antd/dist/antd.css";
import { client } from "../utils/client";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const { Search } = Input;

  const dataSource = users.map((item) => ({ ...item, key: item.sys.id }));

  const onSearch = () => {
    setIsLoading(true);
    try {
      client
        .getEntries({
          content_type: "users",
          "fields.login[match]": `${inputValue}`,
        })
        .then((response) => {
          console.log(response);
          setIsLoading(false);
          setUsers(response.items);
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
            pagination={true}
          />
        </>
      )}
    </>
  );
};

export default Searchbar;
