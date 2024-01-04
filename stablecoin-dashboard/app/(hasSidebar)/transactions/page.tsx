"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Table,
  Space,
  DatePicker,
  Select,
  Pagination,
  Flex,
  Typography,
} from "antd";
import { TransactionsGetResponse } from "@/app/api/transactions/route";
import { format } from "date-fns";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Transactions = () => {
  const [transactions, setTransactions] = useState<
    TransactionsGetResponse["records"]
  >([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    userId: "",
    transactionType: "",
    startDate: "",
    endDate: "",
  });

  const fetchTransactions = async () => {
    try {
      const { userId, transactionType, startDate, endDate } = filters;
      const response = await fetch(
        `/api/transactions?page=${pagination.current}&pageSize=${pagination.pageSize}&userId=${userId}&transactionType=${transactionType}&startDate=${startDate}&endDate=${endDate}`
      );
      const { total, records }: TransactionsGetResponse = await response.json();
      console.log(records);

      setPagination((prev) => ({ ...prev, total }));
      setTransactions(records);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [pagination.current, pagination.pageSize, filters]);

  const handleFilterChange = (
    key: string,
    value: string | null | undefined
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };

  return (
    <Flex vertical gap={16} className="p-4">
      <Typography.Title level={2}>Transactions</Typography.Title>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <RangePicker
            onChange={(dates) => {
              setFilters((prevFilters) => ({
                ...prevFilters,
                startDate: dates?.[0]?.toISOString() || "",
                endDate: dates?.[1]?.toISOString() || "",
              }));
            }}
          />
          <Select
            placeholder="Select Transaction Type"
            onChange={(value) => handleFilterChange("transactionType", value)}
          >
            <Option value="Issuance">Issuance</Option>
            <Option value="Redemption">Redemption</Option>
          </Select>
          <Select
            placeholder="Select User"
            onChange={(value) => handleFilterChange("userId", value)}
          ></Select>
        </Space>
      </div>
      <Table
        size="small"
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "3rem",
            align: "center",
          },
          {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "13rem",
            render: (date) => format(date, "PPpp"),
          },
          {
            title: "Transaction Type",
            dataIndex: "transactionType",
            key: "transactionType",
          },
          {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            align: "right",
            render: (amount) =>
              Math.round((amount + Number.EPSILON) * 100) / 100, // Assuming you have a "username" field in your User model
          },
          {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: (user) => user.username, // Assuming you have a "username" field in your User model
          },
        ]}
        dataSource={transactions}
        pagination={false}
      />
      {pagination.total > 0 && (
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={handlePageChange}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSizeOptions={["5", "10", "20", "50"]}
          style={{ marginTop: 16, textAlign: "right" }}
        />
      )}
    </Flex>
  );
};

export default Transactions;
