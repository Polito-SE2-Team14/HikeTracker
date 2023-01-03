import Table from 'react-bootstrap/Table';
import UserAPI from '../../api/UserAPI';
import { UserTableRow } from './UserTableRow';

export function UserTable(props) {

    let handleApproving = async function(userID){
        await UserAPI.approveUser(userID);
        props.getAllUsers();
    }

    let handleUnApproving = async function(userID){
        await UserAPI.unApproveUser(userID);
        props.getAllUsers();
    }

    return (
        <Table striped bordered hover style={{ overflow: 'auto', display: 'block', tableLayout: 'auto' }}>
            <thead>
                <tr className="text-center">
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>PhoneNumber</th>
                    <th>Verified</th>
                    <th>Approved</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.users ? props.users.map((user) => (
                    <UserTableRow
                        key={user.userID}
                        user={user}
                        handleApproving={handleApproving}
                        handleUnApproving={handleUnApproving}
                    />))
                    :
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                }
            </tbody>
        </Table>
    );
}