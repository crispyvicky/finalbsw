import { useState, Fragment } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this exists, if not I'll just use strings

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

    // Ensure we handle case where options might be undefined or empty naturally
    const safeOptions = filtered || [];

    return (
        <div className={className}>
            <Combobox value={value} onChange={(val) => onChange(val || '')} onClose={() => setQuery('')}>
                <div className="relative">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus-within:ring-2 focus-within:ring-slate-900/10 border border-slate-200">
                        <ComboboxInput
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-slate-900 focus:ring-0 outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
                            displayValue={(item: any) => item}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={placeholder}
                        />
                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronsUpDown
                                className="h-5 w-5 text-slate-400"
                                aria-hidden="true"
                            />
                        </ComboboxButton>
                    </div>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <ComboboxOptions
                        anchor="bottom start"
                        className="w-[var(--input-width)] rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-[9999] max-h-60 overflow-auto empty:invisible"
                    >
                        {safeOptions.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-slate-700">
                                Nothing found.
                            </div>
                        ) : (
                            safeOptions.map((item, idx) => (
                                <ComboboxOption
                                    key={idx}
                                    className={({ focus }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${focus ? 'bg-slate-100 text-slate-900' : 'text-slate-900'
                                        }`
                                    }
                                    value={item.label}
                                >
                                    {({ selected, focus }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? 'text-slate-600' : 'text-slate-600'
                                                        }`}
                                                >
                                                    <Check className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </ComboboxOption>
                            ))
                        )}
                        {/* Custom value option if needed? The user logic previously used filtered.length logic to show "Create". Removed for now to simplify, as "Nothing found" is clearer unless creation is explicit. */}
                    </ComboboxOptions>
                </Transition>
            </Combobox>
        </div>
    );
}
