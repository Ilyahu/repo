import { Image } from "antd";

const columns = [
  {
    key: "1",
    title: "Avatar",
    dataIndex: "avatar_url",
    render: (image) => <Image src={image} width={100} />,
  },
  {
    key: "2",
    title: "Login",
    dataIndex: "login",
    sorter: (a, b) => {
      return a.login.length - b.login.length || a.login.localeCompare(b.login);
    },
  },
  {
    key: "3",
    title: "Type",
    dataIndex: "type",
    filters: [
      { text: "User", value: "User" },
      { text: "Organization", value: "Organization" },
    ],
    onFilter: (value, record) => record.type.includes(value),
  },
];

export default columns;
