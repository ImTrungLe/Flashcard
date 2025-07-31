import { Tab } from "@headlessui/react";

const Tabs = ({ tabs, setSelected, selected }) => {
    return (
        <div className="w-full px-1 sm:px-0">
            <Tab.Group>
                <Tab.List className={"flex space-x-6 rouned-xl p-1"}>
                    {tabs.map((tab, index) => {
                        <Tab
                            key={index}
                            onClick={() => setSelected(index)}
                            className={`w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white ${
                                selected
                                    ? "text-blue-700 border-b-2 border-blue-600"
                                    : "text-gray-800 hover:text-blue-800"
                            } `}
                        >
                            {tab.title}
                        </Tab>;
                    })}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>Content 1</Tab.Panel>
                    <Tab.Panel>Content 2</Tab.Panel>
                    <Tab.Panel>Content 3</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default Tabs;
