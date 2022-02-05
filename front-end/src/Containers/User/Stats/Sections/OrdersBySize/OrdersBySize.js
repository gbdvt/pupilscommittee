import styles from './OrdersBySize.module.css'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Expandable from '../../../../../Components/Expandable/Expandable'

const objectMap = (obj, fn) =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, fn(v, k, i)]
        )
    )

const Overview = (props) => {
    useEffect(() => {
        // const table = objectMap(props.data, items => {
        //     objectMap(items.ordersBySize, (orders, size) => console.log(orders))
        // })
        console.log(props.data)
    }, [])



    return (
        <div>
            <Expandable label={"Orders by size:"} default={false}>
                {Object.values(objectMap(props.data, item => (
                    <div className={styles.outerContainer}>
                        <div className={styles.initInfo}>
                            <h2>{item.title}</h2>
                            <img src={item.thumb} />
                        </div>
                        {Object.values(objectMap(item.ordersBySize, (ordersByColor, color) => (
                            <div>
                                <h2>{color}</h2>
                                <table className={styles.mainTable}>
                                    <tr>
                                        <th>Size</th>
                                        <th>Ordered</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th>Cancelled</th>
                                        <th>Returned</th>
                                        <th>Total</th>
                                    </tr>
                                    {Object.values(objectMap(ordersByColor, (orders, size) => (
                                        <tr className={styles.row}>
                                            <td>{size}</td>
                                            <td>{orders.Ordered}</td>
                                            <td>{orders.Paid}</td>
                                            <td>{orders.Delivered}</td>
                                            <td>{orders.Cancelled}</td>
                                            <td>{orders.Returned}</td>
                                            <td>{orders.Ordered + orders.Paid + orders.Delivered + orders.Cancelled + orders.Returned}</td>
                                        </tr>
                                    )))}
                                </table>
                            </div>
                        )))}
                    </div>
                )))}
                { }
            </Expandable>
        </div>
    )
}

export default Overview