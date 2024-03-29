import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { globalState } from "../utils/proxy";
import axios from "axios";
import { judge_langs } from "../utils/extras";

export default function LangDropdown() {
  const changeState = globalState;

  const [load, setLoad] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLanguages(judge_langs);
    setSelected(judge_langs.find((lang) => lang.id == 71));
    setLoad(false);
  }, []);

  useEffect(() => {
    if (selected) {
      changeState.languageId = selected.id;
    }
  }, [selected]);

  return (
    <div className="bg-dark-layer-2 m-3 text-xs cursor-pointer font-medium rounded-md w-64">
      {load ? (
        <p className=" text-sm py-2 pl-4">Loading...</p>
      ) : (
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative  w-64">
            <Listbox.Button className="relative text-white w-full cursor-pointer text-sm rounded-md py-2 pl-4 pr-10 text-left">
              <span className="block truncate font-semibold">
                {selected?.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full text-gray-400 z-10 overflow-auto rounded-md bg-dark-layer-2 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
                {languages?.map((language, languageIdx) => (
                  <Listbox.Option
                    key={languageIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-dark-gray-6 text-white" : "text-gray-200"
                      }`
                    }
                    value={language}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected
                              ? "font-semibold text-white"
                              : "font-normal"
                          }`}
                        >
                          {language.name}
                        </span>
                        {selected ? (
                          <span className="absolute font-semibold inset-y-0 right-2 flex items-center pl-3 text-white">
                            ✦
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  );
}
