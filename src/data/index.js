export const data = [
  {
    table_group: {
      id: "table_group_1",
      name: "imp",
      tables: [
        {
          id: "table_1",
          name: "employee_salary",
          columns: [
            {
              column_id: "column_1_1",
              name: "age",
              column_data_type: "integer",
            },
            {
              column_id: "column_1_2",
              name: "emp_id",
              column_data_type: "integer",
            },
            {
              column_id: "column_1_3",
              name: "experience",
              column_data_type: "integer",
            },
          ],
        },
        {
          id: "table_2",
          name: "department_info",
          columns: [
            {
              column_id: "column_2_1",
              name: "department_id",
              column_data_type: "integer",
            },
            {
              column_id: "column_2_2",
              name: "email",
              column_data_type: "string",
            },
            {
              column_id: "column_2_3",
              name: "employee_id",
              column_data_type: "integer",
            },
          ],
        },
      ],
    },
  },
  {
    table_group: {
      id: "table_group_2",
      name: "employee",
      tables: [
        {
          id: "table_3",
          name: "personal_info",
          columns: [
            {
              column_id: "column_3_1",
              name: "age",
              column_data_type: "string",
            },
            {
              column_id: "column_3_2",
              name: "emp_id",
              column_data_type: "integer",
            },
            {
              column_id: "column_3_3",
              name: "experience",
              column_data_type: "string",
            },
          ],
        },
      ],
    },
  },
];
