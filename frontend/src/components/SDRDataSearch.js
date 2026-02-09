import React, { useState } from "react";
import { Input, Button, Table, Space, Tag, Tooltip } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSDRData } from "@/store/slices/sdrSlice";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const { Search } = Input;

const SDRDataSearch = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.sdr);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (value) => {
    if (!value.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      await dispatch(fetchSDRData(value)).unwrap();
      setSearchText(value);
    } catch (error) {
      toast.error(error.message || "Failed to fetch SDR data");
    }
  };

  const handleDownload = () => {
    if (!data || data.length === 0) {
      toast.warning("No data to download");
      return;
    }

    const doc = new jsPDF();
    doc.autoTable({
      head: [["Name", "Phone", "Email", "Status"]],
      body: data.map((item) => [
        item.name,
        item.phone,
        item.email,
        item.status,
      ]),
      theme: "grid",
    });
    doc.save("sdr_data.pdf");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(text);
              toast.success("Phone number copied to clipboard");
            }}
          >
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <Tooltip title="Click to copy">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(text);
              toast.success("Email copied to clipboard");
            }}
          >
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <Search
          placeholder="Search by name, phone, or email"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          style={{ width: 400 }}
        />
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          disabled={!data || data.length === 0}
        >
          Download PDF
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </div>
  );
};

export default SDRDataSearch;
