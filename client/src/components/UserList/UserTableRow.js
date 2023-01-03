import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faCircleCheck,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';

export function UserTableRow(props) {

    return (
        <>
            <tr className="text-center">
                <td>{props.user.name}</td>
                <td>{props.user.surname}</td>
                <td>{props.user.email}</td>
                <td>{props.user.phoneNumber}</td>
                <td>{props.user.verified ? <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} />}</td>
                <td>{props.user.approved ? <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }} /> : <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} />}</td>
                <td>
                    {!props.user.approved ? <Button type='button' variant='success' onClick={function(){props.handleApproving(props.user.userID)}}>Approve</Button> : <Button type='button' variant='danger' onClick={function(){props.handleUnApproving(props.user.userID)}}>Unapprove</Button>}
                </td>
            </tr>
        </>
    );
}