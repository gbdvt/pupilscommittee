import styles from './SingleOrder.module.css'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

const SingleOrder = (props) => {

    let statusColor = "black"

    switch(props.order.status) {
        case "Ordered":
            statusColor = "orange"
            break;
        case "Cancelled":
            statusColor = "red"
            break;
        case "Delivered":
            statusColor = "green"
            break;
        case "Paid":
            statusColor = "blue"
            break;
        case "Returned":
            statusColor = "red"
            break;
        default:
            statusColor = "black"
            break;
    }


    return (
        <div>
            <div className={props.extended ? styles.ExtendedGrid : styles.grid}>
                <h3 className={styles.textContainer}>{`${parseFloat(props.order.amount / 100)} €`}</h3>
                {!props.extended && <h3 className={styles.textContainer}>{props.order.order.reduce((acc, order) => acc + order.quantity, 0)}</h3>}
                <h3 className={styles.textContainer}>{moment(props.order.createdAt).format('MMMM Do YYYY')}</h3>
                <h3 style={{color: statusColor}} className={styles.textContainer}>{props.order.status}</h3>
                {props.extended && <h3 className={styles.textContainer}>{props.order.authorData.name}</h3>}
                <h3 className={styles.textContainer}><Link to={`/user/order/${props.order._id}`}>Details</Link></h3>
            </div>
        </div>
    )
}

export default SingleOrder