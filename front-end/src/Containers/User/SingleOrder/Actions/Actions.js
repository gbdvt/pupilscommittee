import React from 'react'
import styles from './Actions.module.css'
import Button from '../../../../Components/Forms/Button/SimpleButton/SimpleButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle, faTruck, faUndoAlt } from "@fortawesome/free-solid-svg-icons";

const Actions = (props) => {

    return (
        <div className={styles.grid}>
            {props.admin && props.orderStatus == "Ordered" && <Button width={"70%"} submit={props.pay}><span style={{ color: "green" }}>Mark as paid<FontAwesomeIcon icon={faCheckCircle} /></span></Button>}
            {(props.admin && (props.orderStatus == "Ordered" || props.orderStatus == "Paid")) && <Button disabled={props.status} width={"70%"} submit={props.ship}><span style={{ color: "blue" }}>Ship order <FontAwesomeIcon icon={faTruck} /></span></Button>}
            {(props.admin && props.orderStatus == "Delivered") && <Button disabled={props.status} width={"70%"} submit={props.return}><span style={{ color: "orange" }}>Return <FontAwesomeIcon icon={faUndoAlt} /></span></Button>}
            {props.orderStatus == "Ordered" && <Button disabled={props.status} width={"70%"} submit={props.cancel}><span style={{ color: "red" }}>Cancel Order <FontAwesomeIcon icon={faTimesCircle} /></span></Button>}
        </div>
    )
}


export default Actions
