import {  Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import images from "../../assets/images/zrzy2s1rx6gmcj1qvsjp.webp";
import { IoSettingsOutline } from "react-icons/io5";

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  const sportUserNavigation = [
    { name: "Change Password", href: "/change-password" },
    { name: "Sign Out", href: "/logout" },
  ];

  const normalUserNavigation = [
    { name: "Sign In", href: "/signin" },
    { name: "Sign Up", href: "/signup" },
  ];

  const additionalUserNavigation = localStorage.getItem("auth_token")
    ? sportUserNavigation
    : normalUserNavigation;

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200 p-4">
        {({}) => (
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8" src={images} alt="Sports-Logo" />
                </div>
                <a href="#" className=" font-serif font-bold text-2xl">
                  Sports Center
                </a>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center ml-4 md:ml-6">
                  {localStorage.getItem("auth_token") && (
                    <div className="md:block">
                    <IoSettingsOutline  className="h-8 w-6 text-gray-500 hover:text-black"/>
                    </div>
                  )}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="p-1 text-gray-400 bg-white rounded-full hover:text-red-600">
                        <UserCircleIcon
                          className="w-6 h-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {additionalUserNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-red-700 text-white" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
