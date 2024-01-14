import React, { useState } from "react";
import { Card, Checkbox, Descriptions, Table } from "antd";

export default function Block({ block }) {
  const transactionColumns = Object.keys(block.transactions[0]).map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    dataIndex: key,
    key: key,
    render: (text) => {
      const renderedText =
        typeof text === "object" ? JSON.stringify(text) : text;
      return (
        <span
          className="truncate w-24 inline-block text-ellipsis"
          title={renderedText}
        >
          {renderedText}
        </span>
      );
    },
  }));
  const defaultCheckedList = transactionColumns
    .map((item) => item.key)
    .filter(
      (k) =>
        ["r", "s", "v", "chainId", "wait", "accessList", "type"].includes(k) ===
        false
    );

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = transactionColumns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = transactionColumns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  return (
    <Card title={`Block ${block.number}`}>
      <Descriptions bordered column={2}>
        {Object.entries(block)
          .filter(
            ([key]) => !["transactions", "withdrawals", "uncles"].includes(key)
          )
          .map(([key, value]) => (
            <Descriptions.Item
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              key={key}
            >
              {value.toString()}
            </Descriptions.Item>
          ))}
      </Descriptions>

      <Table
        dataSource={block.transactions}
        columns={newColumns}
        title={() => (
          <header className="flex justify-between items-center gap-16">
            <h2>Transactions</h2>
            <Checkbox.Group
              value={checkedList}
              options={options}
              onChange={(value) => setCheckedList(value)}
              className="justify-end"
            />
          </header>
        )}
        pagination={false}
        sticky
        scroll={{ x: 1300, y: 600 }}
      />
    </Card>
  );
}
