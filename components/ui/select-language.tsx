import * as React from "react"

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

import {US, GB} from "country-flag-icons/react/3x2"

export function SelectLanguagePrompt() {
    return (
        <Select>
            <SelectTrigger className="w-1/2 flex items-center">
                <SelectValue placeholder="Select language"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="english-US" className="flex items-center justify-evenly">
                        <div className="w-full flex items-center">
                            <US title={"United States"} className="w-5 h-5 mr-2"/>
                            Eng (US)
                        </div>
                    </SelectItem>
                    <SelectItem value="english-UK" className="flex items-center justify-evenly">
                        <div className="w-full flex items-center">
                            <GB title={"United Kingdom"} className="w-5 h-5 mr-2"/>
                            Eng (UK)
                        </div>
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
