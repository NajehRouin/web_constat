import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import client from "../../api/client";
export function Tables() {
  const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchUsers = async () => {
        const res = await client.get("/users/allUsers");
        setUsers(res.data);
      };
      fetchUsers();
    }, []);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nom", "Prenom", "CIN", "N° Telephone", "N° Permis","Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map(
                ({_id, name,prenom, cin, numeroTelephone, numeroPermis }, key) => {
                  const className = `py-3 px-5 ${
                    key === _id
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">

                        <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  marginRight: 10,
                  fontSize: 14,
                }}
              >
                {(name)?.charAt(0).toUpperCase()}
              </div>

                         
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {prenom}
                            </Typography>
                          </div>
                        </div>
                      </td>


                            <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {prenom} 
                        </Typography>
                       
                      </td> 
                      {/* <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {cin}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td> */}
                     
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {cin}  
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {numeroTelephone} 
                        </Typography>
                      </td>

                      
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                  {numeroPermis}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    
    </div>
  );
}

export default Tables;
