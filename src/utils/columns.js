import { Image } from "antd";

const columns = [
  {
    key: "1",
    title: "Avatar",
    dataIndex: ["fields", "avatar", "fields", "file", "url"],
    render: (image) => <Image src={image} width={100} />,
  },
  {
    key: "2",
    title: "Login",
    dataIndex: ["fields", "login"],
    sorter: (a, b) => {
      return (
        a.fields.login.length - b.fields.login.length ||
        a.fields.login.localeCompare(b.fields.login)
      );
    },
  },
  {
    key: "3",
    title: "Type",
    dataIndex: ["fields", "type"],
    filters: [
      { text: "User", value: "User" },
      { text: "Organization", value: "Organization" },
    ],
    onFilter: (value, record) => record.fields.type.includes(value),
  },
];

export default columns;
