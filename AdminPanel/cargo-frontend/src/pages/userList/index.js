import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import lodash from 'lodash';
import moment from "moment";

const UserList = () => {
    const [users, setUsers] = useState([]); // user data
    const [visible, setVisible] = useState(false); // form window visibility
    const [form] = Form.useForm(); // form instance
    const [editingUser, setEditingUser] = useState(null); // track the user being edited

    async function getData() {
        try {
            const response = await axios.get('http://localhost:3000/user/');
            setUsers(lodash.get(response, 'data.data'));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    // add user
    const addUser = () => {
        form.resetFields();
        setVisible(true);
        setEditingUser(null);
    };

    // save user
    const saveUser = () => {
        form.validateFields().then(async (values) => {
            const newUser = { ...values};

            if (editingUser) {
                // edit an existing user
                try {
                    await axios.post(`http://localhost:3000/user/${editingUser._id}`, newUser);
                    const updatedUsers = users.map((user) =>
                        user._id === editingUser._id ? { ...user, ...newUser } : user
                    );
                    setUsers(updatedUsers);
                    setEditingUser(null);
                } catch (error) {
                    console.error(error);
                }
            } else {
                newUser.joinDate = moment().format("YYYY-MM-DD");
                // adding a new user
                try {
                    await axios.post('http://localhost:3000/user/', newUser);
                    setUsers([...users, newUser]);
                } catch (error) {
                    console.error(error);
                }
            }

            form.resetFields();
            setVisible(false);
        }).catch(error=>{
            console.error(error);
        });
    };

    // delete user
    const deleteUser = async (_id) => {
        try {
            await axios.delete(`http://localhost:3000/user/${_id}`);
            const updatedUsers = users.filter((user) => user._id !== _id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error(error);
        }
    };

    // edit user
    const editUser = (user) => {
        setVisible(true);
        setEditingUser(user);
        form.setFieldsValue(user);
    };

    // columns for table
    const columns = [
        {
            title: 'uid',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Real Name',
            dataIndex: 'realName',
            key: 'realName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Join Date',
            dataIndex: 'joinDate',
            key: 'joinDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => editUser(record)}>
                        Edit
                    </Button>
                    <Button type="link" onClick={() => deleteUser(record._id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <div style={{textAlign:"right",margin:8}}>
                <Button type="primary" onClick={addUser}>
                    Add User
                </Button>
            </div>
            <Table dataSource={users} columns={columns} />

            <Modal
                visible={visible}
                title={editingUser ? 'Edit User' : 'Add User'}
                onCancel={() => setVisible(false)}
                onOk={saveUser}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter a username' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="realName"
                        label="Real Name"
                        rules={[{ required: true, message: 'Please enter a real name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter an email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter a password' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserList;