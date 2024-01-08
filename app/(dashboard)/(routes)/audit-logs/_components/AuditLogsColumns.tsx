import {ColumnDef} from "@tanstack/react-table";
import {AuditLogProps} from "@models/AuditLog";
import React from "react";

export const AuditLogsColumns: ColumnDef<AuditLogProps>[] = [
    {
        accessorKey: "userEmail",
        header: () =>
            <div
                className="font-semibold text-[13px] flex justify-start whitespace-nowrap w-full"
            >
                User Email
            </div>,
        cell: ({row}) => {
            return (
                <div className="text-[13px] whitespace-nowrap flex justify-start">
                    {row.original.userEmail}
                </div>
            )
        }
    },
    {
        accessorKey: "action",
        header: () =>
            <div
                className="font-semibold text-[13px] flex justify-center whitespace-nowrap w-full"
            >
                Action
            </div>,
        cell: ({row}) => {
            return (
                <div className="text-[13px] flex justify-start">
                    {row.original.action}
                </div>
            )
        }
    },
    {
        accessorKey: "dateCreated",
        header: () =>
            <div
                className="font-semibold text-[13px] flex justify-start whitespace-nowrap w-full"
            >
                Date Performed
            </div>,
        cell: ({row}) => {
                const {dateCreated} = row.original
            if (!dateCreated) return null
            const date = new Date(dateCreated)
            const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            return (
                <p className="text-[13px] whitespace-nowrap flex justify-start">{formattedDate}</p>
            )
        }
    },
    {
        accessorKey: "id",
        header: () =>
            <div
                className="font-semibold text-[13px] flex justify-center whitespace-nowrap w-full"
            >
                ID
            </div>,
        cell: ({row}) => {
            return (
                <div className="text-[13px] whitespace-nowrap flex justify-center">
                    {row.original.id}
                </div>
            )
        }
    },
    {
        accessorKey: "userId",
        header: () =>
            <div
                className="font-semibold text-[13px] flex justify-center whitespace-nowrap w-full"
            >
                User ID
            </div>,
        cell: ({row}) => {
            return (
                <div className="text-[13px] whitespace-nowrap flex justify-center">
                    {row.original.userId}
                </div>
            )
        }
    }
]