import React from 'react'
import FormContainer from "../Components/FormContainer";
import { Table, Button } from "react-bootstrap";

const UserDashBoard = () => {
  return (
    <div>
    <h1 className="text-center">User Details</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>123-456-7890</td>
            <td>
              <Button variant="primary">Edit</Button>{" "}
              <Button variant="danger">Delete</Button>
            </td>
            <td>
              <img
                src="path_to_image"
                alt="User"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane.smith@example.com</td>
            <td>987-654-3210</td>
            <td>
              <Button variant="primary">Edit</Button>{" "}
              <Button variant="danger">Delete</Button>
            </td>
            <td>
              <img
                src="path_to_image"
                alt="User"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </Table>
    </div>
  );
}

export default UserDashBoard
