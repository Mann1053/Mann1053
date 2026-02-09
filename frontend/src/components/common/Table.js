import React from "react";
import { Edit, Eye, Trash } from "lucide-react";

export default function Table() {
  return (
    <div className="card border-0 overflow-hidden">
      <div className="card-header">
        <h6 className="card-title mb-0 text-lg">Default Datatables</h6>
      </div>
      <div className="card-body">
        <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
          <div className="datatable-top">
            <div className="datatable-dropdown">
              <label>
                <select className="datatable-selector" name="per-page">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>{" "}
                entries per page
              </label>
            </div>
            <div className="datatable-search">
              <input
                className="datatable-input"
                placeholder="Search..."
                type="search"
                name="search"
                title="Search within table"
                aria-controls="selection-table"
              />
            </div>
          </div>
          <div className="datatable-container">
            <table
              id="selection-table"
              className="border border-neutral-200 dark:border-neutral-600 rounded-lg border-separate	 datatable-table"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-neutral-800 dark:text-white"
                    style={{ width: "8.525033829499323%" }}
                  >
                    <div className="form-check style-check flex items-center">
                      <input
                        className="form-check-input"
                        id="serial"
                        type="checkbox"
                      />
                      <label className="ms-2 form-check-label" htmlFor="serial">
                        S.L
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="text-neutral-800 dark:text-white"
                    data-sortable="true"
                    style={{ width: "11.840324763193506%" }}
                  >
                    <button className="datatable-sorter">
                      <div className="flex items-center gap-2">
                        Invoice
                        <svg
                          className="w-4 h-4 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m8 15 4 4 4-4m0-6-4-4-4 4"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="text-neutral-800 dark:text-white"
                    data-sortable="true"
                    style={{ width: "24.15426251691475%" }}
                  >
                    <button className="datatable-sorter">
                      <div className="flex items-center gap-2">
                        Name
                        <svg
                          className="w-4 h-4 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m8 15 4 4 4-4m0-6-4-4-4 4"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="text-neutral-800 dark:text-white"
                    data-sortable="true"
                    style={{ width: "14.546684709066307%" }}
                  >
                    <button className="datatable-sorter">
                      <div className="flex items-center gap-2">
                        Issued Date
                        <svg
                          className="w-4 h-4 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m8 15 4 4 4-4m0-6-4-4-4 4"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="text-neutral-800 dark:text-white"
                    data-sortable="true"
                    style={{ width: "12.381596752368065%" }}
                  >
                    <button className="datatable-sorter">
                      <div className="flex items-center gap-2">
                        Amount
                        <svg
                          className="w-4 h-4 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m8 15 4 4 4-4m0-6-4-4-4 4"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="text-neutral-800 dark:text-white"
                    data-sortable="true"
                    style={{ width: "14.208389715832206%" }}
                  >
                    <button className="datatable-sorter">
                      <div className="flex items-center gap-2">
                        Status
                        <svg
                          className="w-4 h-4 ms-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m8 15 4 4 4-4m0-6-4-4-4 4"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="text-neutral-800 dark:text-white"
                    style={{ width: "14.343707713125845%" }}
                  >
                    <div className="flex items-center gap-2">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr data-index="0" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">01</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #526534
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Kathryn Murphy
                      </h6>
                    </div>
                  </td>
                  <td>25 Jan 2024</td>
                  <td>$200.00</td>
                  <td>
                    {" "}
                    <span className="bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Paid
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="1" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">02</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #696589
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Annette Black
                      </h6>
                    </div>
                  </td>
                  <td>25 Jan 2024</td>
                  <td>$200.00</td>
                  <td>
                    {" "}
                    <span className="bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Paid
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="2" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">03</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #256584
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Ronald Richards
                      </h6>
                    </div>
                  </td>
                  <td>10 Feb 2024</td>
                  <td>$200.00</td>
                  <td>
                    {" "}
                    <span className="bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Paid
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="3" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">04</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #526587
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Eleanor Pena
                      </h6>
                    </div>
                  </td>
                  <td>10 Feb 2024</td>
                  <td>$150.00</td>
                  <td>
                    {" "}
                    <span className="bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Paid
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="4" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">05</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #105986
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Leslie Alexander
                      </h6>
                    </div>
                  </td>
                  <td>15 March 2024</td>
                  <td>$150.00</td>
                  <td>
                    {" "}
                    <span className="bg-warning-100 dark:bg-warning-600/25 text-warning-600 dark:text-warning-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Pending
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="5" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">06</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #526589
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Albert Flores
                      </h6>
                    </div>
                  </td>
                  <td>15 March 2024</td>
                  <td>$150.00</td>
                  <td>
                    {" "}
                    <span className="bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Paid
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="6" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">07</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #526520
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Jacob Jones
                      </h6>
                    </div>
                  </td>
                  <td>27 April 2024</td>
                  <td>$250.00</td>
                  <td>
                    {" "}
                    <span className="bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Paid
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="7" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">08</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #256584
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Jerome Bell
                      </h6>
                    </div>
                  </td>
                  <td>27 April 2024</td>
                  <td>$250.00</td>
                  <td>
                    {" "}
                    <span className="bg-warning-100 dark:bg-warning-600/25 text-warning-600 dark:text-warning-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Pending
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="8" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">09</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #200257
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Marvin McKinney
                      </h6>
                    </div>
                  </td>
                  <td>30 April 2024</td>
                  <td>$250.00</td>
                  <td>
                    {" "}
                    <span className="bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Paid
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr data-index="9" className="">
                  <td>
                    <div className="form-check style-check flex items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="ms-2 form-check-label">10</label>
                    </div>
                  </td>
                  <td>
                    <a href="javascript:void(0)" className="text-primary-600">
                      #526525
                    </a>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <img
                        src="https://picsum.photos/30/30"
                        alt=""
                        className="shrink-0 me-3 rounded-lg"
                      />
                      <h6 className="text-base mb-0 font-medium grow">
                        Cameron Williamson
                      </h6>
                    </div>
                  </td>
                  <td>30 April 2024</td>
                  <td>$250.00</td>
                  <td>
                    {" "}
                    <span className="bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 px-6 py-1.5 rounded-full font-medium text-sm">
                      Paid
                    </span>{" "}
                  </td>
                  <td>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-success-100 dark:bg-success-600/25 text-success-600 dark:text-success-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="w-8 h-8 mx-1 bg-danger-100 dark:bg-danger-600/25 text-danger-600 dark:text-danger-400 rounded-full inline-flex items-center justify-center"
                    >
                      <Trash className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="datatable-bottom">
            <div className="datatable-info">Showing 1 to 10 of 20 entries</div>
            <nav className="datatable-pagination">
              <ul className="datatable-pagination-list">
                <li className="datatable-pagination-list-item datatable-hidden datatable-disabled">
                  <button
                    data-page="1"
                    className="datatable-pagination-list-item-link"
                    aria-label="Page 1"
                  >
                    ‹
                  </button>
                </li>
                <li className="datatable-pagination-list-item datatable-active">
                  <button
                    data-page="1"
                    className="datatable-pagination-list-item-link"
                    aria-label="Page 1"
                  >
                    1
                  </button>
                </li>
                <li className="datatable-pagination-list-item">
                  <button
                    data-page="2"
                    className="datatable-pagination-list-item-link"
                    aria-label="Page 2"
                  >
                    2
                  </button>
                </li>
                <li className="datatable-pagination-list-item">
                  <button
                    data-page="2"
                    className="datatable-pagination-list-item-link"
                    aria-label="Page 2"
                  >
                    ›
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
