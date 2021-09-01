import React, {useState} from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import {Table, Image, Input} from 'antd'


const Searchbar = () => {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const {Search} = Input;

    const columns = [
        {
            key:"1",
            title:"Avatar",
            dataIndex: 'avatar_url',
            render:(image)=><Image src={image} width={100}/>
        },
        {
            key:"2",
            title:"Login",
            dataIndex: 'login',
            sorter: (a, b)=> {return a.login.length - b.login.length || a.login.localeCompare(b.login)},
        },
        {
            key:"3",
            title:"Type",
            dataIndex: "type",
            filters: [
                {text: 'User', value: 'User'},
                {text: 'Organization', value: 'Organization'}        
            ],
            onFilter: (value, record) => record.type.includes(value),
        },
    ]

    const dataSource = users.map(item =>({...item, key: item.id}))

    const handleClick = () => {
        setIsLoading(true);
        try {
            axios.get("https://api.github.com/search/users?q=" + inputValue +"in:login")
            .then(response => {
                console.log(response);
                setIsLoading(false)
                setUsers(response.data.items)
                setShowTable(true);
        })
        } catch (error) {
            setIsLoading(false);
            setError(true);
            console.error(error);
        };
    }

    return (
    <>
        <Search
            placeholder="Search Github Repositories"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            loading={isLoading}
            enterButton="Submit"
            size="large"
            onSearch={handleClick}
          />

      {error && (
        <div>
          Unexpected Error Occurred fetching data. Please try again later!
        </div>
      )}
        {showTable && 
            <Table
                showTable={showTable}
                loading={isLoading}
                columns={columns}
                dataSource={dataSource}
                pagination={{        
                    pageSize:"9",
            }}/>
        }
    </>
    )
}

export default Searchbar
