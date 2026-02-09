"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  ArrowBigRight,
  Bell,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  Sun,
  User2,
} from "lucide-react";
import { userLogout } from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getLoginUserData } from "@/utils/selector";
import usePermissions from "@/hooks/usePermissions";

export default function NavbarHeader() {
  const [theme, setTheme] = useState("light");
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector(getLoginUserData);

  const { hasPermission } = usePermissions();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);
  return (
    <div className="navbar-header border-b border-neutral-200 dark:border-neutral-600">
      <div className="flex items-center justify-between">
        <div className="col-auto">
          <div className="flex flex-wrap items-center gap-[16px]">
            <button type="button" className="sidebar-toggle">
              {/* <iconify-icon
                icon="heroicons:bars-3-solid"
                className="icon non-active"
              ></iconify-icon> */}
              <Menu className="icon non-active" />
              {/* <iconify-icon
                icon="iconoir:arrow-right"
                className="icon active"
              ></iconify-icon> */}
              <ArrowBigRight className="icon active" />
            </button>
            <button
              type="button"
              className="sidebar-mobile-toggle d-flex !leading-[0]"
            >
              <Menu className="icon !text-[30px]" />
            </button>
            <form className="navbar-search">
              <input type="text" name="search" placeholder="Search" />
              <Search className="icon" />
            </form>
          </div>
        </div>
        <div className="col-auto">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="theme-toggle"
              className="w-10 h-10 bg-neutral-200 dark:bg-neutral-700 dark:text-white rounded-full flex justify-center items-center"
            >
              <Sun className="icon" />
            </button>

            <div className="hidden sm:inline-block">
              <button
                data-dropdown-toggle="dropdownInformation"
                className="has-indicator w-10 h-10 bg-neutral-200 dark:bg-neutral-700 dark:text-white rounded-full flex justify-center items-center"
                type="button"
              >
                <img
                  src="https://picsum.photos/50/50"
                  alt="image"
                  className="w-6 h-6 object-cover rounded-full"
                />
              </button>
              <div
                id="dropdownInformation"
                className="z-10 hidden bg-white dark:bg-neutral-700 rounded-lg shadow-lg dropdown-menu-sm p-3"
              >
                <div className="py-3 px-4 rounded-lg bg-primary-50 dark:bg-primary-600/25 mb-4 flex items-center justify-between gap-2">
                  <div>
                    <h6 className="text-lg text-neutral-900 font-semibold mb-0">
                      Choose Your Language
                    </h6>
                  </div>
                </div>

                <div className="max-h-[400px] overflow-y-auto scroll-sm pe-2">
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="form-check style-check flex items-center justify-between">
                      <label
                        className="form-check-label line-height-1 font-medium text-secondary-light"
                        htmlFor="english"
                      >
                        <span className="text-black hover-bXg-transparent hover-text-primary flex items-center gap-3">
                          <img
                            src="https://picsum.photos/50/50"
                            alt=""
                            className="w-9 h-9 bg-success-subtle text-success-600 rounded-full shrink-0"
                          />
                          <span className="text-base font-semibold mb-0">
                            English
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-check-input rounded-full"
                        name="language"
                        type="radio"
                        id="english"
                      />
                    </div>

                    <div className="form-check style-check flex items-center justify-between">
                      <label
                        className="form-check-label line-height-1 font-medium text-secondary-light"
                        htmlFor="Japan"
                      >
                        <span className="text-black hover-bXg-transparent hover-text-primary flex items-center gap-3">
                          <img
                            src="https://picsum.photos/50/50"
                            alt=""
                            className="w-9 h-9 bg-success-subtle text-success-600 rounded-full shrink-0"
                          />
                          <span className="text-base font-semibold mb-0">
                            Japan
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-check-input rounded-full"
                        name="language"
                        type="radio"
                        id="Japan"
                      />
                    </div>

                    <div className="form-check style-check flex items-center justify-between">
                      <label
                        className="form-check-label line-height-1 font-medium text-secondary-light"
                        htmlFor="Franch"
                      >
                        <span className="text-black hover-bXg-transparent hover-text-primary flex items-center gap-3">
                          <img
                            src="https://picsum.photos/50/50"
                            alt=""
                            className="w-9 h-9 bg-success-subtle text-success-600 rounded-full shrink-0"
                          />
                          <span className="text-base font-semibold mb-0">
                            Franch
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-check-input rounded-full"
                        name="language"
                        type="radio"
                        id="Franch"
                      />
                    </div>

                    <div className="form-check style-check flex items-center justify-between">
                      <label
                        className="form-check-label line-height-1 font-medium text-secondary-light"
                        htmlFor="Germany"
                      >
                        <span className="text-black hover-bXg-transparent hover-text-primary flex items-center gap-3">
                          <img
                            src="https://picsum.photos/50/50"
                            alt=""
                            className="w-9 h-9 bg-success-subtle text-success-600 rounded-full shrink-0"
                          />
                          <span className="text-base font-semibold mb-0">
                            Germany
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-check-input rounded-full"
                        name="language"
                        type="radio"
                        id="Germany"
                      />
                    </div>

                    <div className="form-check style-check flex items-center justify-between">
                      <label
                        className="form-check-label line-height-1 font-medium text-secondary-light"
                        htmlFor="SouthKoria"
                      >
                        <span className="text-black hover-bXg-transparent hover-text-primary flex items-center gap-3">
                          <img
                            src="https://picsum.photos/50/50"
                            alt=""
                            className="w-9 h-9 bg-success-subtle text-success-600 rounded-full shrink-0"
                          />
                          <span className="text-base font-semibold mb-0">
                            South Koria
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-check-input rounded-full"
                        name="language"
                        type="radio"
                        id="SouthKoria"
                      />
                    </div>

                    <div className="form-check style-check flex items-center justify-between">
                      <label
                        className="form-check-label line-height-1 font-medium text-secondary-light"
                        htmlFor="Bangladesh"
                      >
                        <span className="text-black hover-bXg-transparent hover-text-primary flex items-center gap-3">
                          <img
                            src="https://picsum.photos/50/50"
                            alt=""
                            className="w-9 h-9 bg-success-subtle text-success-600 rounded-full shrink-0"
                          />
                          <span className="text-base font-semibold mb-0">
                            Bangladesh
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-check-input rounded-full"
                        name="language"
                        type="radio"
                        id="Bangladesh"
                      />
                    </div>

                    <div className="form-check style-check flex items-center justify-between">
                      <label
                        className="form-check-label line-height-1 font-medium text-secondary-light"
                        htmlFor="India"
                      >
                        <span className="text-black hover-bXg-transparent hover-text-primary flex items-center gap-3">
                          <img
                            src="https://picsum.photos/50/50"
                            alt=""
                            className="w-9 h-9 bg-success-subtle text-success-600 rounded-full shrink-0"
                          />
                          <span className="text-base font-semibold mb-0">
                            India
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-check-input rounded-full"
                        name="language"
                        type="radio"
                        id="India"
                      />
                    </div>

                    <div className="form-check style-check flex items-center justify-between">
                      <label
                        className="form-check-label line-height-1 font-medium text-secondary-light"
                        htmlFor="Koria"
                      >
                        <span className="text-black hover-bXg-transparent hover-text-primary flex items-center gap-3">
                          <img
                            src="https://picsum.photos/50/50"
                            alt=""
                            className="w-9 h-9 bg-success-subtle text-success-600 rounded-full shrink-0"
                          />
                          <span className="text-base font-semibold mb-0">
                            Koria
                          </span>
                        </span>
                      </label>
                      <input
                        className="form-check-input rounded-full"
                        name="language"
                        type="radio"
                        id="Koria"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              data-dropdown-toggle="dropdownMessage"
              className="has-indicator w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full flex justify-center items-center"
              type="button"
            >
              <Mail className="text-neutral-900 dark:text-white text-xl" />
            </button>
            <div
              id="dropdownMessage"
              className="z-10 hidden bg-white dark:bg-neutral-700 rounded-2xl overflow-hidden shadow-lg max-w-[394px] w-full"
            >
              <div className="py-3 px-4 rounded-lg bg-primary-50 dark:bg-primary-600/25 m-4 flex items-center justify-between gap-2">
                <h6 className="text-lg text-neutral-900 font-semibold mb-0">
                  Messaage
                </h6>
                <span className="w-10 h-10 bg-white dark:bg-neutral-600 text-primary-600 dark:text-white font-bold flex justify-center items-center rounded-full">
                  05
                </span>
              </div>
              <div className="scroll-sm !border-t-0">
                <div className="max-h-[400px] overflow-y-auto">
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="rounded-full w-11 h-11"
                          src="https://picsum.photos/50/50"
                          alt="Joseph image"
                        />
                        <span className="absolute end-[2px] bottom-[2px] w-2.5 h-2.5 bg-success-500 border border-white rounded-full dark:border-gray-600"></span>
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Kathryn Murphy
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          hey! there i'm...
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-sm text-neutral-500">12:30 PM</span>
                      <span className="w-4 h-4 text-xs bg-warning-600 text-white rounded-full flex justify-center items-center">
                        8
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="rounded-full w-11 h-11"
                          src="https://picsum.photos/50/50"
                          alt="Joseph image"
                        />
                        <span className="absolute end-[2px] bottom-[2px] w-2.5 h-2.5 bg-success-500 border border-white rounded-full dark:border-gray-600"></span>
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Kathryn Murphy
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          hey! there i'm...
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-sm text-neutral-500">12:30 PM</span>
                      <span className="w-4 h-4 text-xs bg-warning-600 text-white rounded-full flex justify-center items-center">
                        8
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="rounded-full w-11 h-11"
                          src="https://picsum.photos/50/50"
                          alt="Joseph image"
                        />
                        <span className="absolute end-[2px] bottom-[2px] w-2.5 h-2.5 bg-success-500 border border-white rounded-full dark:border-gray-600"></span>
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Kathryn Murphy
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          hey! there i'm...
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-sm text-neutral-500">12:30 PM</span>
                      <span className="w-4 h-4 text-xs bg-warning-600 text-white rounded-full flex justify-center items-center">
                        8
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="rounded-full w-11 h-11"
                          src="https://picsum.photos/50/50"
                          alt="Joseph image"
                        />
                        <span className="absolute end-[2px] bottom-[2px] w-2.5 h-2.5 bg-success-500 border border-white rounded-full dark:border-gray-600"></span>
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Kathryn Murphy
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          hey! there i'm...
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-sm text-neutral-500">12:30 PM</span>
                      <span className="w-4 h-4 text-xs bg-warning-600 text-white rounded-full flex justify-center items-center">
                        8
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="rounded-full w-11 h-11"
                          src="https://picsum.photos/50/50"
                          alt="Joseph image"
                        />
                        <span className="absolute end-[2px] bottom-[2px] w-2.5 h-2.5 bg-success-500 border border-white rounded-full dark:border-gray-600"></span>
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Kathryn Murphy
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          hey! there i'm...
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-sm text-neutral-500">12:30 PM</span>
                      <span className="w-4 h-4 text-xs bg-warning-600 text-white rounded-full flex justify-center items-center">
                        8
                      </span>
                    </div>
                  </a>
                </div>

                <div className="text-center py-3 px-4">
                  <a
                    href="javascript:void(0)"
                    className="text-primary-600 dark:text-primary-600 font-semibold hover:underline text-center"
                  >
                    See All Message{" "}
                  </a>
                </div>
              </div>
            </div>

            <button
              data-dropdown-toggle="dropdownNotification"
              className="has-indicator w-10 h-10 bg-neutral-200 dark:bg-neutral-700 rounded-full flex justify-center items-center"
              type="button"
            >
              <Bell className="text-neutral-900 dark:text-white text-xl" />
            </button>
            <div
              id="dropdownNotification"
              className="z-10 hidden bg-white dark:bg-neutral-700 rounded-2xl overflow-hidden shadow-lg max-w-[394px] w-full"
            >
              <div className="py-3 px-4 rounded-lg bg-primary-50 dark:bg-primary-600/25 m-4 flex items-center justify-between gap-2">
                <h6 className="text-lg text-neutral-900 font-semibold mb-0">
                  Notification
                </h6>
                <span className="w-10 h-10 bg-white dark:bg-neutral-600 text-primary-600 dark:text-white font-bold flex justify-center items-center rounded-full">
                  05
                </span>
              </div>
              <div className="scroll-sm !border-t-0">
                <div className="max-h-[400px] overflow-y-auto">
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative w-11 h-11 bg-success-200 dark:bg-success-600/25 text-success-600 flex justify-center items-center rounded-full">
                        <iconify-icon
                          icon="bitcoin-icons:verify-outline"
                          className="text-2xl"
                        ></iconify-icon>
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Congratulations
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          Your profile has been Verified. Your profile has been
                          Verified
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-sm text-neutral-500">
                        23 Mins ago
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="rounded-full w-11 h-11"
                          src="https://picsum.photos/50/50"
                          alt="Joseph image"
                        />
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Ronald Richards
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          You can stitch between artboards
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-sm text-neutral-500">
                        23 Mins ago
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative w-11 h-11 bg-primary-100 dark:bg-primary-600/25 text-primary-600 flex justify-center items-center rounded-full">
                        AM
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Arlene McCoy
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          Invite you to prototyping
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-sm text-neutral-500">
                        23 Mins ago
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="rounded-full w-11 h-11"
                          src="https://picsum.photos/50/50"
                          alt="Joseph image"
                        />
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Annette Black
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          Invite you to prototyping
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-sm text-neutral-500">
                        23 Mins ago
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 relative w-11 h-11 bg-primary-100 dark:bg-primary-600/25 text-primary-600 flex justify-center items-center rounded-full">
                        DR
                      </div>
                      <div>
                        <h6 className="text-sm fw-semibold mb-1">
                          Darlene Robertson
                        </h6>
                        <p className="mb-0 text-sm line-clamp-1">
                          Invite you to prototyping
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-sm text-neutral-500">
                        23 Mins ago
                      </span>
                    </div>
                  </a>
                </div>

                <div className="text-center py-3 px-4">
                  <a
                    href="javascript:void(0)"
                    className="text-primary-600 dark:text-primary-600 font-semibold hover:underline text-center"
                  >
                    See All Notification{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className="relative" ref={profileRef}>
              <button
                className="flex justify-center items-center rounded-full hover:ring-2 hover:ring-blue-500 transition-all"
                type="button"
                onClick={() => setOpenProfile(!openProfile)}
              >
                <img
                  src="https://picsum.photos/50/50"
                  alt="image"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </button>
              {openProfile && (
                <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-neutral-700 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 w-64 p-3 animate-fadeIn">
                  <div className="py-3 px-4 rounded-lg bg-primary-50 dark:bg-primary-600/25 mb-4 flex items-center justify-between gap-2">
                    <div>
                      <h6 className="text-lg text-neutral-900 dark:text-white font-semibold mb-0">
                        {userData?.user?.username || "User"}
                      </h6>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {userData?.user?.role?.name || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto scroll-sm">
                    <ul className="flex flex-col space-y-1">
                      <li>
                        <button
                          className="w-full text-left text-gray-700 dark:text-gray-300 px-3 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-3 transition-all"
                          onClick={() => {
                            setOpenProfile(false);
                            router.push("/my-admin/profile");
                          }}
                        >
                          <User2 className="w-5 h-5" /> My Profile
                        </button>
                      </li>
                      {hasPermission("view_settings") && (
                        <li>
                          <button
                            className="w-full text-left text-gray-700 dark:text-gray-300 px-3 py-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-3 transition-all"
                            onClick={() => {
                              setOpenProfile(false);
                              router.push("/my-admin/settings");
                            }}
                          >
                            <Settings className="w-5 h-5" /> Settings
                          </button>
                        </li>
                      )}
                      <li className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-600">
                        <button
                          className="w-full text-left text-red-600 dark:text-red-400 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-all font-medium"
                          onClick={() => {
                            localStorage.removeItem("token");
                            dispatch(userLogout());
                            setOpenProfile(false);
                            router.push("/my-admin/login");
                          }}
                        >
                          <LogOut className="w-5 h-5" /> Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
