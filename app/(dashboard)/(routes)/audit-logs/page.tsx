"use client"

import React from 'react';
import AuditLogsList from "@app/(dashboard)/(routes)/audit-logs/_components/AuditLogsList";
import {useFetch} from "@lib/hooks/useSWR";

const AuditLogsPage = () => {

    const {GetAllAuditLogs} = useFetch()

    const {data: auditLogs} = GetAllAuditLogs()

    return (
        <div className="flex flex-col w-full py-2 px-5 min-h-screen">
            <AuditLogsList auditLogs={auditLogs} />
        </div>
    );
};

export default AuditLogsPage;