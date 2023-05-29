import React, {useEffect, useState} from 'react';
import { Card, Statistic, Row, Col, Button, message } from 'antd';
import axios from "axios";
import lodash from "lodash";

const Overview = () => {
    const [numObj, setNumObj] = useState({});
    async function getData(){
        axios.get("http://localhost:3000/user/").then((res)=>{
            const num = lodash.get(res,"data.data.length");
            setNumObj(obj=>{
                obj.userNum = num;
                return {...obj};
            })
        });
        axios.get("http://localhost:3000/order/").then((res)=>{
            const num = lodash.get(res,"data.data.length");
            setNumObj(obj=>{
                obj.orderNum = num;
                return {...obj};
            })
        });
        axios.get("http://localhost:3000/car/").then((res)=>{
            const num = lodash.get(res,"data.data.length");
            setNumObj(obj=>{
                obj.carNum = num;
                return {...obj};
            })
        });
        axios.get("http://localhost:3000/comment/").then((res)=>{
            const num = lodash.get(res,"data.data.length");
            setNumObj(obj=>{
                obj.commentNum = num;
                return {...obj};
            })
        });
    }
    useEffect(()=>{
        getData();
    },[])
    return (
        <div>
            <Card>
                <Row gutter={16}>
                    <Col span={4}>
                        <Statistic title="orderNum" value={lodash.get(numObj,"orderNum")} />
                    </Col>
                    <Col span={4}>
                        <Statistic title="userNum" value={lodash.get(numObj,"userNum")} />
                    </Col>
                    <Col span={4}>
                        <Statistic title="carNum" value={lodash.get(numObj,"carNum")} />
                    </Col>
                    <Col span={4}>
                        <Statistic title="commentNum" value={lodash.get(numObj,"commentNum")} />
                    </Col>
                    <Col>
                        <div style={{lineHeight:"80px"}}>
                            <Button onClick={async ()=>{
                                await axios.post("http://localhost:3000/initData")
                                console.log("generate data success!")
                                message.success('generate data success!');
                                getData();
                            }}>generate</Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Overview;