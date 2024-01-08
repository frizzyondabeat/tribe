import {AuditLogArray} from "@lib/auditLogCalls";
import {DataTable} from "@components/ui/data-table";
import {AuditLogsColumns} from "@app/(dashboard)/(routes)/audit-logs/_components/AuditLogsColumns";

const visibleFields = ["userEmail", "action", "dateCreated"]

const AuditLogsList = ({auditLogs}: { auditLogs: AuditLogArray | undefined }) => {
    return (
        <div>
            <DataTable columns={AuditLogsColumns} data={auditLogs} visibleFields={visibleFields}
                       enableExport={false}/>
        </div>
    );
}

export default AuditLogsList;