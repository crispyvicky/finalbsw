import { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: { label: string }[];
    placeholder?: string;
    className?: string;
}

export default function SearchableSelect({ value, onChange, options, placeholder, className }: Props) {
    const [query, setQuery] = useState('');

    const filtered =
        query === ''
            ? options
            : options.filter((item) =>
                item.label
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    return (
        <div className={`relative ${className}`}>
            <Combobox value={value} onChange={onChange as any}>
                <div className="relative w-full overflow-hidden rounded-lg bg-white text-left focus-within:ring-2 focus-within:ring-slate-900/10">
                    <Combobox.Input
                        className="w-full border border-slate-200 bg-slate-50 py-2 pl-3 pr-10 text-sm leading-5 text-slate-900 focus:bg-white focus:outline-none focus:border-slate-300 transition-all font-medium"
                        displayValue={(item: any) => item}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={placeholder}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronsUpDown
                            className="h-5 w-5 text-slate-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                        {filtered.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-slate-700">
                                Create "{query}"
                            </div>
                        ) : (
                            filtered.map((item, idx) => (
                                <Combobox.Option
                                    key={idx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-100 text-slate-900' : 'text-slate-900'
                                        }`
                                    }
                                    value={item.label}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-slate-600' : 'text-slate-600'
                                                        }`}
                                                >
                                                    <Check className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                        {/* Allow Custom Value even if not in list */}
                        {query.length > 0 && !filtered.some(f => f.label === query) && (
                            <Combobox.Option value={query} className="hidden" />
                        )}
                    </Combobox.Options>
                </Transition>
            </Combobox>
        </div>
    );
}
