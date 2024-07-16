import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.webp";
import { IoSettingsOutline } from "react-icons/io5";
import PreferencesDialog from "../../components/Preferences/PreferencesDialog"; 

import { useTranslation } from "react-i18next";


const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  const auth_token = localStorage.getItem("auth_token");
  const [isPreferencesOpen, setPreferencesOpen] = useState(false);
  const sportUserNavigation = [
    { name: "Change Password", href: "/change-password" },
    { name: "Log Out", href: "/logout" },
  ];

  const handlePreferences = () => {
    setPreferencesOpen(true);
  };

  const { t, i18n: { changeLanguage ,language}, } = useTranslation();
  
  const handleLanguageChange = (event: any) => {
    console.log("Language change to:", event.target.value);
    changeLanguage(event.target.value);
  };
  let currentLanguage=language
  useEffect(()=>{
    currentLanguage='en'
  })
  

  const dateTime = currentLanguage

  const dateFormatter = new Intl.DateTimeFormat(dateTime, {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat(dateTime, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });


  const formattedDate = dateFormatter.format(new Date());
  const formattedTime = timeFormatter.format(new Date());

  
  
  return (
    <>
      <Disclosure as="nav" className="p-4 border-b border-slate-200">
        {({}) => (
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between md:justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-4 md:h-8" src={logo} alt="Sports-Logo" />
                </div>
                <a href="#" className="font-serif font-bold md:text-2xl">
                {t('sportsCenter')}
                </a>
              </div>
              <div className="block">
              
                <div className="flex items-center ml-6">
                <label htmlFor="language-select" className="ml-4 border sr-only ">Select Language</label>
                <div className="ml-4 mr-4">
                  
                {formattedDate}
                </div>
                {formattedTime}
                  <select
                    id="language-select"
                    value={currentLanguage}
                    onChange={handleLanguageChange}
                    className="p-2 ml-4 text-black bg-white rounded border-slate-950"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                  </select>
                  <div>
                  
                  </div>
                  {!auth_token && (
                    <div className="flex space-x-1 font-serif text-sm md:space-x-4 md:text-lg ml-7">
                      <a
                        href="/signin"
                        className="text-gray-700 hover:text-black"
                      >
                       {t('signin')}
                      </a>
                      <a
                        href="/signup"
                        className="text-gray-700 hover:text-black"
                      >
                        {t('signup')}
                      </a>
                    </div>
                  )}
                  {auth_token && (
                    <div className="block">
                      <button onClick={handlePreferences}>
                        {" "}
                        <IoSettingsOutline className="w-5 h-6 text-gray-500 cursor-pointer md:h-8 md:w-6 hover:text-black" />
                      </button>
                    </div>
                  )}
                  {auth_token && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="p-1 text-gray-400 bg-white rounded-full hover:text-red-600">
                          <UserCircleIcon
                            className="w-5 h-5 md:h-6 md:w-6"
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
                          {sportUserNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                id="btn"
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
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
      <PreferencesDialog
        isOpen={isPreferencesOpen}
        closeModel={() => setPreferencesOpen(false)}
      />
    </>
  );
};

export default Appbar;
